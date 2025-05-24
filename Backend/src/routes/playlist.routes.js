import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, getAllListDetails, getPlaylistDetails, removerProblemFromPlaylist, removePlaylist } from "../controllers/playlist.controller.js";

const playlistRoutes =  express.Router()

playlistRoutes.get("/",authMiddleware,getAllListDetails)
playlistRoutes.get("/:playlistId",authMiddleware,getPlaylistDetails)

playlistRoutes.post("/create-playlist",authMiddleware,createPlaylist)
playlistRoutes.post("/:playlistId/add-problem",authMiddleware,addProblemToPlaylist)

playlistRoutes.delete("/:playlistId/remove-problem",authMiddleware,removerProblemFromPlaylist)
playlistRoutes.delete("/:playlistId",authMiddleware,removePlaylist)

export default playlistRoutes