import IconButton from "../shared/IconButton";
import {
  MdDelete,
  MdOutlineArchive,
  MdOutlineNotificationAdd,
  MdOutlinePalette,
} from "react-icons/md";

const NoteCardFooter = () => {
  return (
    <div className="flex items-center gap-2 px-1 pb-1 text-sm opacity-0 transition duration-300 group-hover/card:opacity-100">
      <IconButton icon={<MdOutlineNotificationAdd />} text="Remind me" />
      <IconButton
        icon={<MdOutlinePalette />}
        text="Change background"
        id="changeBgModal"
      />
      <IconButton icon={<MdOutlineArchive />} text="Archive" />
      <IconButton icon={<MdDelete />} text="Delete" />
    </div>
  );
};
export default NoteCardFooter;
