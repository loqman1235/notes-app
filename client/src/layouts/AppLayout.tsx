import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { NoteContextProvider } from "@/context/NoteContext";
import { SidebarContextProvider } from "@/context/SidebarContext";
import { ViewModeContextProvider } from "@/context/ViewModeContext";

const AppLayout = () => {
  return (
    <>
      <SidebarContextProvider>
        <ViewModeContextProvider>
          <Navbar />
          <Sidebar />
          <NoteContextProvider>
            <Main />
          </NoteContextProvider>
        </ViewModeContextProvider>
      </SidebarContextProvider>
    </>
  );
};

export default AppLayout;
