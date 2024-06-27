import { createContext, useState } from "react";
import { register as registerService } from "@/services/authService";
import { LoginSchemaType, RegisterSchemaType } from "@/validators/auth";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuth: boolean;
  registerUser: (data: RegisterSchemaType, reset: () => void) => Promise<void>;
  loginUser: (data: LoginSchemaType) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  registerUser: async () => {},
  loginUser: async () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  // Register user
  const registerUser = async (data: RegisterSchemaType, reset: () => void) => {
    try {
      const response = await registerService(data);

      if (response.status === 201) {
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Login user
  const loginUser = async (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <AuthContext.Provider value={{ isAuth, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
