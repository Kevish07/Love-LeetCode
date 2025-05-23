import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res
      .status(201)
      .json(new ApiResponse(201, "playlist created Successfully", playlist));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Error, not able to create playlist"));
  }
};

const getPlaylistDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userid: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    if (!playlist) {
      return res
        .status(400)
        .json(new ApiError(400, "Error could not found playlist"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully got the playlist", playlist));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Sorry no playlist found"));
  }
};

const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json(new ApiResponse(200, "Playlist Fetched!", playlists));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Playlist could not Fetched!"));
  }
};

const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!Array.isArray(problemIds)  || problemIds.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid or missing problem Id"));
    }

    const problemsInPlaylist = await db.problemsInPlaylist.createMany({
      data: problemIds.map((problemId) => {
        playlistId, problemId;
      }),
    });
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Problems added to the playlist",
          problemsInPlaylist,
        ),
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "failed to add Problems to the playlist"));
  }
};

const removePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletePlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res.status(200).json(new ApiResponse(200, "Current playlist deleted"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "Failed to delete this playlist"));
  }
};

const removerProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid or missing problem Id"));
    }

    const deleteProblem = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
    res.status(200).json(new ApiResponse(200,"Problem deleted"))
  } catch (error) {
    res.status(500).json(new ApiResponse(500,"Problem not deleted"))
  }
};

export {
  getAllListDetails,
  getPlaylistDetails,
  createPlaylist,
  addProblemToPlaylist,
  removePlaylist,
  removerProblemFromPlaylist,
};
