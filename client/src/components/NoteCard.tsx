import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "./shared/PinnButton";

const NoteCard = ({ title, content, bgColor, isPinned }: NoteCardProps) => {
  return (
    <div
      className="mb-5 inline-block w-full break-inside-avoid rounded-md border p-4 transition-transform duration-300 hover:scale-110 hover:shadow-xl"
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
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <PinnButton isPinned={isPinned || false} />
        </div>
      )}

      {/* CONTENT */}
      <p>{content}</p>
    </div>
  );
};

export default NoteCard;
