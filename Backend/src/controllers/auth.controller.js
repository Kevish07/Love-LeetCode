import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password, image } = req.body;
  
  if (!name || !email || !password) {
    return res.status(401).json(new ApiError(401, "All fields are required"));
  }
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json(new ApiError(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userImage = image;
    if (!userImage) {
      userImage = null;
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.USER,
        image: userImage || null, // Optional image field
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.cookie("jwt", token, cookieOptions);

    res.status(201).json(
      new ApiResponse(
        201,
        "User successfully registered",
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        }
      )
    );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Unable to register user"));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, "User does not exists"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json(
      new ApiResponse(
        200,
        `Login successful, Welcome ${user.name}`,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        }
      )
    );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Unable to login user"));
  }
};

const logout = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.clearCookie("jwt",cookieOptions);

    res.status(200).json(new ApiResponse(200,"User successfully logout"))
  } catch (error) {
    res.status(500).json(new ApiError(500,"Unable to logout"))
  }
};

const getMe = async (req, res) => {
    try {
        res.status(200).json(new ApiResponse(200,"Profile fetched Successfully",req.user))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Error while Getting user"))
    }
};

export { register, login, logout, getMe };
