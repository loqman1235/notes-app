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

export { createNote, getNotes };
