import { NoteType as NoteCardProps } from "@/types";
import PinnButton from "../shared/PinnButton";
import shortenText from "@/utils/shortenText";
import NoteCardFooter from "./NoteCardFooter";
import useNote from "@/hooks/useNote";

const NoteCard = ({
  id,
  title,
  content,
  bgColor,
  isPinned,
  isDeleted,
}: NoteCardProps) => {
  const { togglePinNote } = useNote();
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
        <div className="flex w-full items-center justify-between p-4 !pb-0">
          <h2 className="w-full break-words font-semibold">
            {shortenText(title, 80)}
          </h2>
          <div className="opacity-0 transition duration-300 group-hover/card:opacity-100">
            {!isDeleted && (
              <PinnButton
                isPinned={isPinned || false}
                onClick={() => togglePinNote(id, !isPinned)}
              />
            )}
          </div>
        </div>
      )}

      {/* CONTENT */}
      {!title ? (
        <div className="flex items-center justify-between p-4">
          <p className="text-sm">{shortenText(content)}</p>
          <div className="opacity-0 transition duration-300 group-hover/card:opacity-100">
            {!isDeleted && (
              <PinnButton
                isPinned={isPinned || false}
                onClick={() => togglePinNote(id, !isPinned)}
              />
            )}
          </div>
        </div>
      ) : (
        <p className="p-4 text-sm">{shortenText(content)}</p>
      )}

      <NoteCardFooter noteId={id} isTrashed={isDeleted || false} />
    </div>
  );
};

export default NoteCard;
