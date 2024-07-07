import { ViewModeContext } from "@/context/ViewModeContext";
import { useContext } from "react";

const useViewMode = () => {
  if (!useContext(ViewModeContext)) {
    throw new Error("useTheme must be used within a ViewModeContextProvider");
  }

  return useContext(ViewModeContext);
};

export default useViewMode;
