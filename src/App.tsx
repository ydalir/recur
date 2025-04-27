import { Route, Routes } from "react-router";
import { HomePage } from "./pages/Home/HomePage";
import { EditTaskPage } from "./pages/EditTask/EditTaskPage";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { AddEntryPage } from "./pages/AddEntry/AddEntryPage";

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"entry/:date/add"} element={<AddEntryPage />} />

      <Route path={"tasks"} element={<TasksPage />}>
        <Route path={":taskId?/edit"} element={<EditTaskPage />} />
      </Route>
    </Routes>
  );
};
