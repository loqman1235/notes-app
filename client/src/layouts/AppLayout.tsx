import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { NoteContextProvider } from "@/context/NoteContext";
import { SidebarContextProvider } from "@/context/SidebarContext";

const AppLayout = () => {
  return (
    <>
      <SidebarContextProvider>
        <Navbar />
        <Sidebar />
        <NoteContextProvider>
          <Main />
        </NoteContextProvider>
      </SidebarContextProvider>
    </>
  );
};

export default AppLayout;
