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

const getNotes = async () => {
  const response = await api.get("/notes");

  return response;
};

const togglePinNote = async (noteId: string, isPinned: boolean) => {
  const response = await api.put(`/notes/${noteId}/togglePin`, {
    isPinned,
  });

  return response;
};

const deleteNote = async (noteId: string) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response;
};

export { createNote, getNotes, togglePinNote, deleteNote };
