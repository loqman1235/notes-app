import { SidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";

const useSidebar = () => {
  if (!useContext(SidebarContext)) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return useContext(SidebarContext);
};

export default useSidebar;
