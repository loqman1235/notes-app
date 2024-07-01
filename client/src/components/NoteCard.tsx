import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "./shared/PinnButton";

const NoteCard = ({ title, content, bgColor, isPinned }: NoteCardProps) => {
  return (
    <div
      className="mb-5 rounded-md border p-4 hover:shadow-lg"
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
