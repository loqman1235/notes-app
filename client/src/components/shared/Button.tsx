interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  children,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) => {
  const buttonSize = {
    sm: "py-2 px-4",
    md: "py-3 px-6",
    lg: "py-4 px-8",
  }[size];

  return (
    <button
      type={type}
      className={`flex w-fit items-center justify-center gap-2 rounded-xl bg-primary font-semibold tracking-tight text-white transition duration-300 hover:bg-primary-light ${buttonSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
