import CreateNoteModal from "@/components/CreateNoteModal";
import { NoteCard } from "@/components/NoteCard";
import { CreateNoteModalContextProvider } from "@/context/CreateNoteModalContext";
import useNote from "@/hooks/useNote";
import useViewMode from "@/hooks/useViewMode";

const NotesPage = () => {
  const { notes } = useNote();
  const { defaultViewMode } = useViewMode();

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="flex w-full flex-col items-center">
      <CreateNoteModalContextProvider>
        <CreateNoteModal />
        {pinnedNotes.length > 0 && (
          <div
            className={`w-full ${defaultViewMode === "grid" ? "max-w-5xl" : "max-w-2xl"}`}
          >
            <h3 className="mb-2 text-xs font-semibold uppercase text-text-light">
              Pinned
            </h3>
            <div
              className={`masonry w-full pb-20 ${defaultViewMode === "grid" ? "sm:masonry md:masonry-md lg:masonry-lg" : "sm:masonry-sm md:masonry lg:masonry"}`}
            >
              {pinnedNotes.map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>
          </div>
        )}

        {otherNotes.length > 0 && (
          <div
            className={`w-full ${defaultViewMode === "grid" ? "max-w-5xl" : "max-w-2xl"}`}
          >
            <h3 className="mb-2 text-xs font-semibold uppercase text-text-light">
              Other
            </h3>
            <div
              className={`masonry w-full pb-20 ${defaultViewMode === "grid" ? "sm:masonry md:masonry-md lg:masonry-lg" : "sm:masonry-sm md:masonry lg:masonry"}`}
            >
              {otherNotes.map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>
          </div>
        )}
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
