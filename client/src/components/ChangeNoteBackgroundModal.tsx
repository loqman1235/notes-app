import { MdOutlineFormatColorReset } from "react-icons/md";
import ToolTip from "./shared/ToolTip";
import useCreateNoteModalCtx from "@/hooks/useCreateNoteModalCtx";
import { useEffect, useRef } from "react";

const bgColors = [
  {
    hex: "#77172E",
    name: "Coral",
  },
  {
    hex: "#692B17",
    name: "Peach",
  },
  {
    hex: "#7C4A03",
    name: "Sand",
  },
  {
    hex: "#264D3B",
    name: "Mint",
  },
  {
    hex: "#0C625D",
    name: "Sage",
  },
  {
    hex: "#256377",
    name: "Fog",
  },
  {
    hex: "#284255",
    name: "Storm",
  },
  {
    hex: "#472E5B",
    name: "Dusk",
  },
  {
    hex: "#6C394F",
    name: "Blossom",
  },
  {
    hex: "#4B443A",
    name: "Clay",
  },
  {
    hex: "#232427",
    name: "Chalk",
  },
];

interface ChangeNoteBackgroundModalProps {
  isNoteBgModalShown: boolean;
  setShowChangeBgModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChangeNoteBackgroundModal = ({
  isNoteBgModalShown,
  setShowChangeBgModal,
}: ChangeNoteBackgroundModalProps) => {
  const changeBgModalContainerRef = useRef<HTMLDivElement>(null);
  const { setSelectedBgColor, selectedBgColor } = useCreateNoteModalCtx();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (changeBgModalContainerRef.current) {
        const parentElement = changeBgModalContainerRef.current.parentElement;

        if (changeBgModalContainerRef.current === parentElement) {
          return;
        }

        if (
          changeBgModalContainerRef.current &&
          !changeBgModalContainerRef.current.contains(e.target as Node)
        ) {
          setShowChangeBgModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowChangeBgModal]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={changeBgModalContainerRef}
      className={`absolute -left-10 top-full rounded-md bg-foreground p-2 shadow-md ${isNoteBgModalShown ? "block" : "hidden"} mr-50`}
    >
      <div className="flex w-[260px] flex-wrap items-center gap-1">
        <div className="group relative">
          <button
            onClick={() => setSelectedBgColor("var(--background-color)")}
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-border text-lg hover:border-white ${selectedBgColor === "var(--background-color)" ? "border-2 border-white" : "border-2 border-border"}`}
          >
            <MdOutlineFormatColorReset />
          </button>
          <ToolTip text="Default" position="center" />
        </div>
        {bgColors.map((color) => (
          <div className="group relative" key={color.hex}>
            <button
              type="button"
              style={{ backgroundColor: color.hex }}
              className={`block h-10 w-10 rounded-full hover:border-2 hover:border-white ${color.hex === selectedBgColor && "border-2 border-white"}`}
              onClick={() => setSelectedBgColor(color.hex)}
            ></button>
            <ToolTip text={color.name} position="center" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeNoteBackgroundModal;
