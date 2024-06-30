import prisma from "../../utils/prisma";

interface CreateNoteParams {
  title: string;
  content: string;
  bgColor?: string;
  isPinned?: boolean;
}

const createNote = async ({
  title,
  content,
  bgColor,
  isPinned,
}: CreateNoteParams) => {
  const note = await prisma.note.create({
    data: {
      title,
      content,
      bgColor,
      isPinned,
    },
  });

  return note;
};

export { createNote };
