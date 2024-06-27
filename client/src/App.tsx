import { Navigate, Route, Routes } from "react-router-dom";
// import AppLayout from "@/layouts/AppLayout";
import NotesPage from "@/pages/NotesPage";
import RemindersPage from "@/pages/RemindersPage";
import useAuth from "./hooks/useAuth";
import { LoginPage, RegisterPage } from "@/pages/Auth";
import { lazy, Suspense } from "react";

const AppLayout = lazy(() => import("@/layouts/AppLayout"));

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default App;
