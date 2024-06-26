import { createContext, useState } from "react";

type AuthContextType = {
  isAuth: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
