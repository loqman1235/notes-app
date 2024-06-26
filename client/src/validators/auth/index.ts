import { z } from "zod";

const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export { RegisterSchema };
