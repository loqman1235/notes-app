import { createContext, useState } from "react";

interface SidebarContextType {
  isSidebarShown: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isSidebarShown: false,
  toggleSidebar: () => {},
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

  return (
    <SidebarContext.Provider value={{ isSidebarShown, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarContextProvider };
