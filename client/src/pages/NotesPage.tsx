import CreateNoteModal from "@/components/CreateNoteModal";
import NoteCard from "@/components/NoteCard";
import { CreateNoteModalContextProvider } from "@/context/CreateNoteModalContext";
import useNote from "@/hooks/useNote";

const NotesPage = () => {
  const { notes } = useNote();

  return (
    <div className="flex h-full w-full flex-col items-center">
      <CreateNoteModalContextProvider>
        <CreateNoteModal />
        <div className="w-full max-w-5xl gap-5 pb-20 md:columns-4">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
