import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
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
          New Playlist
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-3"
        >
          <div>
            <input
              type="text"
              className="w-full rounded-md px-3 py-2 bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Playlist name"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-red-400 mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <textarea
              className="w-full rounded-md px-3 py-2 bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              placeholder="Description (optional)"
              {...register("description")}
              rows={2}
            />
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
              className="px-3 py-1 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 text-sm cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
