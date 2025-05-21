import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json(new ApiError(401, "Unauthorized user"));
    }
    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401).json(new ApiError(401, "Unauthorized user"));
    }

    const user = await db.user.findUnique({
      where: {
        id: decode.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
    if (!user) {
      res.status(401).json(new ApiError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(new ApiError(401, "Unauthorized User"));
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN"){
      res.status(403).json(new ApiError(403,"Access Denied - Admins only"))
    }

    next()
  } catch (error) {
    res.status(500).json(new ApiError(500,"Internal Server Error"))
  }
};
