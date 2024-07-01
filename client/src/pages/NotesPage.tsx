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
        <div className="grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
