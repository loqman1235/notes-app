import {
  createNote as createNoteService,
  getNotes as getNotesService,
  togglePinNote as togglePinNoteService,
  moveNoteToTrash as moveNoteToTrashService,
  deleteNoteForever as deleteNoteForeverService,
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
  togglePinNote: (noteId: string, isPinned: boolean) => Promise<void>;
  moveNoteToTrash: (noteId: string) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
};

const NoteContext = createContext<NoteContextType>({
  notes: [],
  createNote: async () => {},
  togglePinNote: async () => {},
  moveNoteToTrash: async () => {},
  deleteNote: async () => {},
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

  // Pin note
  const togglePinNote = async (noteId: string, isPinned: boolean) => {
    try {
      const response = await togglePinNoteService(noteId, isPinned);

      if (response.status === 200) {
        const newNotes = notes.map((note) => {
          if (note.id === noteId) {
            return response.data.data.note;
          }

          return note;
        });
        setNotes(newNotes);
      }
    } catch (error) {
      clg(error);
    }
  };

  // Move to trash
  const moveNoteToTrash = async (noteId: string) => {
    try {
      const response = await moveNoteToTrashService(noteId);

      if (response.status === 200) {
        const newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
      }
    } catch (error) {
      clg(error);
    }
  };

  // Delee forever
  const deleteNote = async (noteId: string) => {
    try {
      const response = await deleteNoteForeverService(noteId);

      if (response.status === 200) {
        const newNotes = notes.filter((note) => note.id !== noteId);
        setNotes(newNotes);
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
  }, [notes]);

  return (
    <NoteContext.Provider
      value={{ notes, createNote, togglePinNote, moveNoteToTrash, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteContextProvider };
