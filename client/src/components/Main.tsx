import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="absolute right-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-full p-5">
      <Outlet />
    </div>
  );
};

export default Main;
