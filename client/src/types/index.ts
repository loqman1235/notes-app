export type createNoteType = {
  title: string;
  content: string;
  bgColor: string;
  isPinned: boolean;
};

export type NoteType = {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  isPinned?: boolean;
  isArchived?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};
