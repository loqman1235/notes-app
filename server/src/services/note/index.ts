import prisma from "../../utils/prisma";

interface CreateNoteParams {
  title: string;
  content: string;
  bgColor?: string;
  isPinned?: boolean;
}

const createNote = async (
  userId: string,
  { title, content, bgColor, isPinned }: CreateNoteParams
) => {
  const note = await prisma.note.create({
    data: {
      title,
      content,
      bgColor,
      isPinned,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return note;
};

const getNotes = async (userId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return notes;
};

const togglePinNote = async (
  userId: string,
  noteId: string,
  isPinned: boolean
) => {
  const note = await prisma.note.update({
    where: {
      id: noteId,
      userId,
    },
    data: {
      isPinned,
    },
  });

  return note;
};

const moveNoteToTrash = async (noteId: string, userId: string) => {
  const note = await prisma.note.update({
    where: { id: noteId, userId },
    data: { isDeleted: true },
  });

  return note;
};

const deleteNote = async (userId: string, noteId: string) => {
  const note = await prisma.note.delete({
    where: {
      id: noteId,
      userId,
    },
  });

  return note;
};

export { createNote, getNotes, deleteNote, togglePinNote, moveNoteToTrash };
