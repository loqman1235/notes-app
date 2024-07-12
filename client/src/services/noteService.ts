import { createNoteType } from "@/types";
import api from "./api";

const createNote = async ({
  title,
  content,
  bgColor,
  isPinned,
}: createNoteType) => {
  const response = await api.post("/notes", {
    title,
    content,
    bgColor,
    isPinned,
  });

  return response;
};

const getNotes = async ({ isTrashed }: { isTrashed?: boolean } = {}) => {
  const response = await api.get(`/notes?${isTrashed ? "isTrashed=true" : ""}`);

  return response;
};
const togglePinNote = async (noteId: string, isPinned: boolean) => {
  const response = await api.patch(`/notes/${noteId}/togglePin`, {
    isPinned,
  });

  return response;
};

const moveNoteToTrash = async (noteId: string) => {
  const response = await api.patch(`/notes/${noteId}/move-to-trash`);
  return response;
};

export { createNote, getNotes, togglePinNote, moveNoteToTrash };
