import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import NotesPage from "@/pages/NotesPage";
import RemindersPage from "@/pages/RemindersPage";
import useAuth from "./hooks/useAuth";
import { LoginPage, RegisterPage } from "@/pages/Auth";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuth ? <Navigate to="/login" /> : <AppLayout />}
      >
        <Route index element={<NotesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
