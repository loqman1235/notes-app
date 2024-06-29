import { LoginSchemaType, RegisterSchemaType } from "@/validators/auth";
import api from "./api";

const register = async (data: RegisterSchemaType) => {
  const response = await api.post("/auth/register", data);
  return response;
};

const login = async (data: LoginSchemaType) => {
  const response = await api.post("/auth/login", data);
  return response;
};

const verifyAccessToken = async () => {
  const response = await api.get("/auth/verify-token");
  return response;
};

export { register, login, verifyAccessToken };
