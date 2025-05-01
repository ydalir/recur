import { NavLink, Outlet } from "react-router";
import style from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <>
      <div className={style.header}>
        <h1>Recur</h1>
        <nav className={style.nav}>
          <NavLink to={"/"}>Log</NavLink>
          <NavLink to={"/tasks"}>Tasks</NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
