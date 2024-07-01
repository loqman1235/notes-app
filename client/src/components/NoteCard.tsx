import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "./shared/PinnButton";

const NoteCard = ({ title, content, bgColor, isPinned }: NoteCardProps) => {
  return (
    <div
      className="rounded-md border p-5 hover:shadow-lg"
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
          <h2 className="text-xl font-bold">{title}</h2>
          <PinnButton isPinned={isPinned || false} />
        </div>
      )}

      {/* CONTENT */}
      <p className="text-lg">{content}</p>
    </div>
  );
};

export default NoteCard;
