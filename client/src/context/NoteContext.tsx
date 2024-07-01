import {
  createNote as createNoteService,
  getNotes as getNotesService,
} from "@/services/noteService";
import { NoteType, createNoteType } from "@/types";
import { clg } from "@/utils/clg";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await getNotesService();

        if (response.status === 200) {
          setNotes(response.data.data.notes);
        }
      } catch (error) {
        clg(error);
      }
    };

    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, createNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteContextProvider };
