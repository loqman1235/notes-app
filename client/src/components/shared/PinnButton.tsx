import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import ToolTip from "./ToolTip";
import useTheme from "@/hooks/useTheme";

interface PinnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPinned: boolean;
}

const PinnButton = ({ isPinned, ...props }: PinnButtonProps) => {
  const { theme } = useTheme();

  const hoverBgClass =
    theme === "light" ? "hover:bg-black/10" : "hover:bg-white/50";

  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center justify-center rounded-full p-2 text-xl text-text-light transition duration-300 ${hoverBgClass} hover:text-text-background ${isPinned && "!text-text-background"}`}
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
