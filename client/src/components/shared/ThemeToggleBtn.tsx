import { MdLightMode } from "react-icons/md";
import ToolTip from "./ToolTip";

interface ThemeToggleBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  toggleTheme: () => void;
}

const ThemeToggleBtn = ({ toggleTheme, ...props }: ThemeToggleBtnProps) => {
  return (
    <div className="group relative">
      <button onClick={toggleTheme} {...props}>
        <MdLightMode />
        <ToolTip text="Light Mode" position="center" />
      </button>
    </div>
  );
};

export default ThemeToggleBtn;
