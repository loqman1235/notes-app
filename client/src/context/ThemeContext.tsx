import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme =
    (getLocalStorage("theme") as Theme | null) ??
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<Theme>(storedTheme);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    setLocalStorage("theme", nextTheme);
  };

  console.log(theme, "CURRENT THEME");

  useEffect(() => {
    document.body.classList.remove(
      theme === "light" ? "dark-mode" : "light-mode",
    );

    document.body.classList.add(theme === "light" ? "light-mode" : "dark-mode");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
