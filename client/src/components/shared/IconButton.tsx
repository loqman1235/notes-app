import useTheme from "@/hooks/useTheme";
import ToolTip from "./ToolTip";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
}

const IconButton = ({ icon, text, ...props }: IconButtonProps) => {
  const { theme } = useTheme();

  const hoverBgClass =
    theme === "light" ? "hover:bg-black/10" : "hover:bg-white/10";

  return (
    <div className="group relative">
      <button
        type="button"
        className={`flex items-center justify-center rounded-full p-2 text-xl text-text-light transition duration-300 hover:text-text-background ${hoverBgClass}`}
        {...props}
      >
        {icon}
      </button>
      {text && <ToolTip text={text} position="center" />}
    </div>
  );
};

export default IconButton;
