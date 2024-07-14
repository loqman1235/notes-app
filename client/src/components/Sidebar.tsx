import useSidebar from "@/hooks/useSidebar";
import { useEffect, useRef } from "react";
import {
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineLightbulb,
  MdOutlineNotifications,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  {
    icon: <MdOutlineLightbulb />,
    name: "Notes",
    path: "/",
  },
  {
    icon: <MdOutlineNotifications />,
    name: "Reminders",
    path: "/reminders",
  },
  {
    icon: <MdOutlineEdit />,
    name: "Edit labels",
    path: "/labels",
  },
  {
    icon: <MdOutlineArchive />,
    name: "Archive",
    path: "/archive",
  },
  {
    icon: <MdOutlineDelete />,
    name: "Trash",
    path: "/trash",
  },
] as const;

const sidebarItemStyles =
  "flex w-full items-center gap-5 px-5 py-3 transition duration-300 hover:bg-foreground text-text-light";

const Sidebar = () => {
  const { isSidebarShown, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarShown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSidebar, isSidebarShown]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-[var(--navbar-height)] flex h-[calc(100vh-var(--navbar-height))] w-[var(--sidebar-width)] flex-col bg-foreground pt-2 shadow-lg transition duration-500 ease-in-out ${!isSidebarShown && "-translate-x-full"} z-40`}
    >
      <ul className="">
        {sidebarItems.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? sidebarItemStyles + " !bg-accent-dark !text-text-background"
                  : sidebarItemStyles
              }
            >
              <span className="ml-2 text-2xl">{item.icon}</span>
              <span className="text-sm font-semibold tracking-tight text-text-background">
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto w-full p-5">
        <p className="text-sm text-text-light">© 2024. Loqman Djefafla</p>
      </div>
    </aside>
  );
};

export default Sidebar;
