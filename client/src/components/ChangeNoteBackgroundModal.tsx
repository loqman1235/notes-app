import { MdOutlineFormatColorReset } from "react-icons/md";
import ToolTip from "./shared/ToolTip";
import useCreateNoteModalCtx from "@/hooks/useCreateNoteModalCtx";
import { useEffect, useRef } from "react";

const bgColors = [
  {
    hex: "var(--coral-color)",
    name: "Coral",
  },
  {
    hex: "var(--peach-color)",
    name: "Peach",
  },
  {
    hex: "var(--sand-color)",
    name: "Sand",
  },
  {
    hex: "var(--mint-color)",
    name: "Mint",
  },
  {
    hex: "var(--sage-color)",
    name: "Sage",
  },
  {
    hex: "var(--fog-color)",
    name: "Fog",
  },
  {
    hex: "var(--storm-color)",
    name: "Storm",
  },
  {
    hex: "var(--dusk-color)",
    name: "Dusk",
  },
  {
    hex: "var(--blossom-color)",
    name: "Blossom",
  },
  {
    hex: "var(--clay-color)",
    name: "Clay",
  },
  {
    hex: "var(--chalk-color)",
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
