import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import Loader from "./Loader";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
      setSelectedPlaylist("");
    }
  }, [isOpen, getAllPlaylists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;
    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-xs mx-auto bg-zinc-900 border border-zinc-700 shadow-lg rounded-lg p-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-400 hover:text-white transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          Add to Playlist
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <select
              className="w-full rounded-md px-3 py-2 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 text-sm flex items-center gap-2 cursor-pointer"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading && <Loader className="w-4 h-4" />}
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
