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

export { createNote };
