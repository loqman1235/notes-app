import ToolTip from "./ToolTip";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
}

const IconButton = ({ icon, text, ...props }: IconButtonProps) => {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center justify-center rounded-full p-2 text-xl text-text-light transition duration-300 hover:bg-white/10 hover:text-text-background"
        {...props}
      >
        {icon}
      </button>
      {text && <ToolTip text={text} position="center" />}
    </div>
  );
};

export default IconButton;
