import { createContext, useState } from "react";

interface SidebarContextType {
  isSidebarShown: boolean;
  toggleSidebar: () => void;
  setIsSidebarShown: React.Dispatch<React.SetStateAction<boolean>>;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isSidebarShown: false,
  toggleSidebar: () => {},
  setIsSidebarShown: () => () => {},
  closeSidebar: () => {},
});

const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarShown((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarShown(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarShown, toggleSidebar, setIsSidebarShown, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarContextProvider };
