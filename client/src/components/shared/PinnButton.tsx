import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import ToolTip from "./ToolTip";

interface PinnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPinned: boolean;
}

const PinnButton = ({ isPinned, ...props }: PinnButtonProps) => {
  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center justify-center rounded-full p-2 text-xl text-text-light transition duration-300 hover:bg-black/10 hover:text-text-background ${isPinned && "!text-text-background"}`}
        {...props}
      >
        {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>
      <ToolTip
        text={`${isPinned ? "Unpin note" : "Pin note"}`}
        position="center"
      />
    </div>
  );
};

export default PinnButton;
