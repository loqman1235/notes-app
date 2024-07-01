import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

const useNote = () => {
  if (!useContext(NoteContext)) {
    throw new Error("useNote must be used within a NoteProvider");
  }

  return useContext(NoteContext);
};

export default useNote;
