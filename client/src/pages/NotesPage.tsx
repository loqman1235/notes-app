import CreateNoteModal from "@/components/CreateNoteModal";
import NoteCard from "@/components/NoteCard";
import { CreateNoteModalContextProvider } from "@/context/CreateNoteModalContext";
import useNote from "@/hooks/useNote";

const NotesPage = () => {
  const { notes } = useNote();

  return (
    <div className="flex w-full flex-col items-center">
      <CreateNoteModalContextProvider>
        <CreateNoteModal />
        <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg w-full max-w-5xl pb-20">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
