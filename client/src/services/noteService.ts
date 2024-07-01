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

export { createNote, getNotes };
