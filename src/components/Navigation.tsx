import { NavLink, Outlet } from "react-router";

export const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to={"/"}>Log</NavLink>
        <NavLink to={"/tasks"}>Tasks</NavLink>
      </nav>
      <Outlet />
    </>
  );
};
