import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarContextProvider } from "@/context/SidebarContext";

const AppLayout = () => {
  return (
    <>
      <SidebarContextProvider>
        <Navbar />
        <Sidebar />
        <Main />
      </SidebarContextProvider>
    </>
  );
};

export default AppLayout;
