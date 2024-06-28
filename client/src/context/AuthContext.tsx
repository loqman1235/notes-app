import { createContext, useState } from "react";
import {
  login as loginService,
  register as registerService,
} from "@/services/authService";
import { LoginSchemaType, RegisterSchemaType } from "@/validators/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { setLocalStorage } from "@/utils/localStorage";
// import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  registerUser: (data: RegisterSchemaType, reset: () => void) => Promise<void>;
  loginUser: (data: LoginSchemaType) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  registerUser: async () => {},
  loginUser: async () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  // Register user
  const registerUser = async (data: RegisterSchemaType, reset: () => void) => {
    try {
      const response = await registerService(data);

      if (response.status === 201) {
        reset();
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Login user
  const loginUser = async (data: LoginSchemaType) => {
    try {
      const response = await loginService(data);

      console.log("STATUS: ", response.status);

      if (response.status === 200) {
        const user = response.data?.data?.user;
        const accessToken = response.data?.data?.accessToken;

        setIsAuth(true);
        setLocalStorage("user", user);
        setLocalStorage("accessToken", accessToken);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }

      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
