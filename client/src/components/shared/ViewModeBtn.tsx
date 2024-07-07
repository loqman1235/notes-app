import { MdGridView, MdViewStream } from "react-icons/md";
import ToolTip from "./ToolTip";
import useViewMode from "@/hooks/useViewMode";

const btnStyles =
  "flex items-center justify-center rounded-full p-2 text-2xl text-text-light transition duration-300 hover:bg-foreground-light hover:text-text-background";

const ViewModeBtn = () => {
  const { defaultViewMode, toggleViewMode } = useViewMode();

  return defaultViewMode === "grid" ? (
    <div className="group relative hidden sm:block md:block">
      <button className={btnStyles} onClick={toggleViewMode}>
        <MdGridView />
      </button>
      <ToolTip text="Grid View" position="center" />
    </div>
  ) : (
    <div className="group relative hidden sm:block md:block">
      <button className={btnStyles} onClick={toggleViewMode}>
        <MdViewStream />
      </button>
      <ToolTip text="List View" position="center" />
    </div>
  );
};

export default ViewModeBtn;
