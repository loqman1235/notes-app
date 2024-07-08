import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "../shared/PinnButton";
import shortenText from "@/utils/shortenText";
import NoteCardFooter from "./NoteCardFooter";

const NoteCard = ({ title, content, bgColor, isPinned }: NoteCardProps) => {
  return (
    <div
      className={`group/card mb-5 inline-block h-fit w-full break-inside-avoid rounded-md border transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
      style={{
        backgroundColor: bgColor,
        borderColor:
          bgColor === "var(--background-color)"
            ? "var(--border-color)"
            : bgColor,
      }}
    >
      {/* TITLE */}
      {title && (
        <div className="flex items-center justify-between p-4 !pb-0">
          <h2 className="font-semibold">{shortenText(title, 80)}</h2>
          <div className="opacity-0 transition duration-300 group-hover/card:opacity-100">
            <PinnButton isPinned={isPinned || false} />
          </div>
        </div>
      )}

      {/* CONTENT */}
      {!title ? (
        <div className="flex items-center justify-between p-4">
          <p className="text-sm">{shortenText(content)}</p>
          <div className="opacity-0 transition duration-300 group-hover/card:opacity-100">
            <PinnButton isPinned={isPinned || false} />
          </div>
        </div>
      ) : (
        <p className="p-4 text-sm">{shortenText(content)}</p>
      )}

      <NoteCardFooter />
    </div>
  );
};

export default NoteCard;
