import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="grid h-screen w-full place-items-center bg-background">
      <ClipLoader color="var(--accent-color)" size={50} />
    </div>
  );
};

export default LoadingScreen;
