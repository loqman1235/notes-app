import { RegisterSchemaType } from "@/validators/auth";
import api from "./api";

const register = async (data: RegisterSchemaType) => {
  const response = await api.post("/auth/register", data);
  return response;
};

export { register };
