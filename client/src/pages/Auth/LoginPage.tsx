import Button from "@/components/shared/Button";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { LoginSchema, LoginSchemaType } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-[400px] p-5">
        <h2 className="mb-5 text-2xl font-bold">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
              Don't have an account yet?{" "}
              <Link className="font-bold text-primary underline" to="/register">
                Register
              </Link>
            </p>
          </div>

          <Button size="md" type="submit" className="!w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
