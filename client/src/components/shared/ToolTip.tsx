interface ToolTipProps {
  text: string;
  position: "right" | "left" | "center";
}

const ToolTip = ({ text, position }: ToolTipProps) => {
  const positionStyles =
    position === "left"
      ? "left-0"
      : position === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={`absolute top-full w-max scale-0 items-center justify-center rounded-md bg-[--tooltip-bg-color] px-3 py-1 text-xs text-[--tooltip-text-color] shadow-sm group-hover:scale-100 ${positionStyles} z-50 origin-top font-semibold opacity-0 transition duration-200 ease-in-out group-hover:opacity-100`}
    >
      {text}
    </div>
  );
};

export default ToolTip;
