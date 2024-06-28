interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default ErrorMessage;
