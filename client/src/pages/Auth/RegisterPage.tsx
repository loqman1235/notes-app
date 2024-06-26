import Button from "@/components/shared/Button";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { RegisterSchema, RegisterSchemaType } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-[400px] p-5">
        <h2 className="mb-5 text-2xl font-bold">Register</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input"
              {...register("username")}
            />

            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="input"
              {...register("email")}
            />

            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              {...register("password")}
            />

            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="text-sm">
            <p>
              Already have an account?{" "}
              <Link className="font-bold text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </div>

          <Button size="md" type="submit" className="!w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
