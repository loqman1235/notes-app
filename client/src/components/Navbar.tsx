import {
  MdGridView,
  MdLightMode,
  MdLogout,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import ToolTip from "./shared/ToolTip";
import Brand from "./shared/Brand";
import useSidebar from "@/hooks/useSidebar";
import { useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";

const navbarBtnStyles =
  "flex items-center justify-center rounded-full p-2 text-2xl text-text-light transition duration-300 hover:bg-foreground-light hover:text-text-background";

const Navbar = () => {
  const { logoutUser } = useAuth();
  const { toggleSidebar } = useSidebar();
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNavbarScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 100) {
          navbarRef.current.classList.add("shadow-md");
        } else {
          navbarRef.current.classList.remove("shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleNavbarScroll);

    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, []);

  return (
    <>
      <div
        ref={navbarRef}
        className="fixed top-0 z-50 flex h-[var(--navbar-height)] w-full items-center justify-between gap-10 bg-foreground px-2 md:px-5"
      >
        <div className="flex items-center gap-2">
          <div className="group relative">
            <button className={navbarBtnStyles} onClick={toggleSidebar}>
              <MdMenu />
            </button>
            <ToolTip text="Main Menu" position="left" />
          </div>
          {/* BRAND */}
          <Brand />
        </div>

        {/* SERACH */}
        <div className="relative flex h-full max-w-[var(--search-input-width)] flex-1 items-center py-2">
          <button className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-text-light transition duration-300 hover:text-text-background">
            <MdSearch />
          </button>
          <input
            className="h-full w-full rounded-md bg-foreground-light px-10 pl-14 font-medium outline-none placeholder:text-text-light"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>

        {/* CTAS*/}
        <div className="flex items-center gap-2">
          <div className="group relative">
            <button className={navbarBtnStyles}>
              <MdLightMode />
              <ToolTip text="Light Mode" position="center" />
            </button>
          </div>
          <div className="group relative">
            <button className={navbarBtnStyles}>
              <MdGridView />
            </button>
            <ToolTip text="Grid View" position="center" />
          </div>
          <div className="group relative">
            <button
              className={navbarBtnStyles}
              onClick={async () => await logoutUser()}
            >
              <MdLogout />
            </button>
            <ToolTip text="Logout" position="right" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
