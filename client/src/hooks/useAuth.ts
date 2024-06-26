import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return useContext(AuthContext);
};

export default useAuth;
