import useNote from "@/hooks/useNote";
import IconButton from "../shared/IconButton";
import {
  MdDelete,
  MdDeleteForever,
  MdOutlineArchive,
  MdOutlineNotificationAdd,
  MdOutlinePalette,
  MdRestoreFromTrash,
} from "react-icons/md";

const NoteCardFooter = ({
  noteId,
  isTrashed,
}: {
  noteId: string;
  isTrashed: boolean;
}) => {
  const { deleteNote } = useNote();

  return (
    <div className="flex items-center gap-2 px-1 pb-1 text-sm opacity-0 transition duration-300 group-hover/card:opacity-100">
      {!isTrashed ? (
        <>
          <IconButton icon={<MdOutlineNotificationAdd />} text="Remind me" />
          <IconButton
            icon={<MdOutlinePalette />}
            text="Change background"
            id="changeBgModal"
          />
          <IconButton icon={<MdOutlineArchive />} text="Archive" />
          <IconButton
            icon={<MdDelete />}
            text="Delete"
            onClick={() => deleteNote(noteId)}
          />
        </>
      ) : (
        <>
          <IconButton icon={<MdDeleteForever />} text="Delete forever" />
          <IconButton icon={<MdRestoreFromTrash />} text="Restore" />
        </>
      )}
    </div>
  );
};
export default NoteCardFooter;
