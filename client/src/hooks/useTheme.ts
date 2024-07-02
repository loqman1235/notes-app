import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  if (!useContext(ThemeContext)) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return useContext(ThemeContext);
};

export default useTheme;
