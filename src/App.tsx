import { Route, Routes } from "react-router";
import { HomePage } from "./pages/Home/HomePage";
import { EditTaskPage } from "./pages/EditTask/EditTaskPage";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { AddEntryPage } from "./pages/AddEntry/AddEntryPage";
import { Navigation } from "./components/Navigation";
import { DeleteEntryPage } from "./pages/DeleteEntry/DeleteEntryPage";
import { DeleteTaskPage } from "./pages/DeleteTask/DeleteTaskPage";
import { Redirect } from "./pages/Redirect";
import { ConfirmEntryPage } from "./pages/AddEntry/ConfirmEntryPage";

export const App = () => {
  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route path="/" element={<Redirect />} />
        <Route path="log" element={<Redirect />} />
        <Route path="log/:date">
          <Route index element={<HomePage />} />
          <Route path=":taskId" element={<ConfirmEntryPage />} />
          <Route path="add">
            <Route index element={<AddEntryPage />} />
            <Route path=":taskId" element={<ConfirmEntryPage />} />
          </Route>
          <Route path="delete/:entryId" element={<DeleteEntryPage />} />
        </Route>

        <Route path="tasks">
          <Route index element={<TasksPage />} />
          <Route path="edit/:taskId?" element={<EditTaskPage />} />
          <Route path="delete/:taskId" element={<DeleteTaskPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
