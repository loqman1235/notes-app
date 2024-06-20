import { CreateNoteModalContext } from "@/context/CreateNoteModalContext";
import { useContext } from "react";

const useCreateNoteModalCtx = () => {
  if (!useContext(CreateNoteModalContext)) {
    throw new Error(
      "useCreateNoteModalCtx must be used within a CreateNoteModalContextProvider",
    );
  }

  return useContext(CreateNoteModalContext);
};

export default useCreateNoteModalCtx;
