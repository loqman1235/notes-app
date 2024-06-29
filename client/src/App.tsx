import { Navigate, Route, Routes } from "react-router-dom";
// import AppLayout from "@/layouts/AppLayout";
import NotesPage from "@/pages/NotesPage";
import RemindersPage from "@/pages/RemindersPage";
import useAuth from "./hooks/useAuth";
import { LoginPage, RegisterPage } from "@/pages/Auth";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/components/shared/LoadingScreen";

const AppLayout = lazy(() => import("@/layouts/AppLayout"));

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route
          path="/"
          element={!isAuth ? <Navigate to="/login" /> : <AppLayout />}
        >
          <Route index element={<NotesPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
        </Route>

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
