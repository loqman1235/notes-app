import { createNote as createNoteService } from "@/services/noteService";
import { NoteType, createNoteType } from "@/types";
import { clg } from "@/utils/clg";
import { createContext, useState } from "react";

type NoteContextType = {
  notes: NoteType[];
  createNote: ({
    title,
    content,
    bgColor,
    isPinned,
  }: createNoteType) => Promise<void>;
};

const NoteContext = createContext<NoteContextType>({
  notes: [],
  createNote: async () => {},
});

const NoteContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notes, setNotes] = useState<NoteType[]>([]);

  //   Create Note
  const createNote = async ({
    title,
    content,
    bgColor,
    isPinned,
  }: createNoteType) => {
    try {
      const response = await createNoteService({
        title,
        content,
        bgColor,
        isPinned,
      });

      if (response.status === 201) {
        setNotes([response.data.data.note, ...notes]);
      }
    } catch (error) {
      clg(error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, createNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteContextProvider };
