import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "./shared/PinnButton";
import shortenText from "@/utils/shortenText";

const NoteCard = ({ title, content, bgColor, isPinned }: NoteCardProps) => {
  return (
    <div
      className={`mb-5 inline-block h-fit w-full break-inside-avoid rounded-md border p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
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
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{shortenText(title, 80)}</h2>
          <PinnButton isPinned={isPinned || false} />
        </div>
      )}

      {/* CONTENT */}
      {!title ? (
        <div className="flex items-center justify-between">
          <p className="text-sm">{shortenText(content)}</p>
          <PinnButton isPinned={isPinned || false} />
        </div>
      ) : (
        <p className="text-sm">{shortenText(content)}</p>
      )}
    </div>
  );
};

export default NoteCard;
