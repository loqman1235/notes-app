import api from "@/services/api";
import { RegisterSchemaType } from "@/validators/auth";
import { createContext, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
  registerUser?: (data: RegisterSchemaType) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: true,
  registerUser: async () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuth, setIsAuth] = useState(true);

  // Register
  const registerUser = async (data: RegisterSchemaType) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
