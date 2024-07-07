import { createContext, useState } from "react";

type ViewModeType = "grid" | "list";

type ViewModeContextType = {
  defaultViewMode: ViewModeType;
  toggleViewMode: () => void;
};

const ViewModeContext = createContext<ViewModeContextType>({
  defaultViewMode: "grid",
  toggleViewMode: () => {},
});

const ViewModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [defaultViewMode, setDefaultViewMode] = useState<ViewModeType>("grid");

  const toggleViewMode = () => {
    setDefaultViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <ViewModeContext.Provider value={{ defaultViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export { ViewModeContext, ViewModeContextProvider };
