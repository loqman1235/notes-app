import CreateNoteModal from "@/components/CreateNoteModal";
import NoteCard from "@/components/NoteCard";
import { CreateNoteModalContextProvider } from "@/context/CreateNoteModalContext";
import useNote from "@/hooks/useNote";

const NotesPage = () => {
  const { notes } = useNote();

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="flex w-full flex-col items-center">
      <CreateNoteModalContextProvider>
        <CreateNoteModal />
        <div className="max-w-5xl">
          <h3 className="mb-2 text-xs font-semibold uppercase text-text-light">
            Pinned
          </h3>
          <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg w-full pb-20">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </div>

        <div className="max-w-5xl">
          <h3 className="mb-2 text-xs font-semibold uppercase text-text-light">
            Other
          </h3>
          <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg w-full pb-20">
            {otherNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </div>
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
