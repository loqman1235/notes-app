import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import NotesPage from "@/pages/NotesPage";
import RemindersPage from "@/pages/RemindersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<NotesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
