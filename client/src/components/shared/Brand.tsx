import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link
      to="/"
      className="cursor-pointer select-none text-xl font-bold tracking-tight"
    >
      <span>Notes</span>
      <span className="text-accent">App</span>
    </Link>
  );
};

export default Brand;
