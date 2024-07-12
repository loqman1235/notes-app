import { NoteCard } from "@/components/NoteCard";
import useNote from "@/hooks/useNote";
import useViewMode from "@/hooks/useViewMode";

const TrashPage = () => {
  const { notes } = useNote();
  const { defaultViewMode } = useViewMode();

  const trashedNotes = notes.filter((note) => note.isDeleted);

  return (
    <div className="flex w-full flex-col items-center">
      {trashedNotes.length > 0 && (
        <div
          className={`w-full ${defaultViewMode === "grid" ? "max-w-5xl" : "max-w-2xl"}`}
        >
          <div
            className={`masonry w-full pb-20 ${defaultViewMode === "grid" ? "sm:masonry md:masonry-md lg:masonry-lg" : "sm:masonry-sm md:masonry lg:masonry"}`}
          >
            {trashedNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashPage;
