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

  console.log(note, "note created | services/note");

  return note;
};

export { createNote };
