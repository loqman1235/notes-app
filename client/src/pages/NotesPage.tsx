import CreateNoteModal from "@/components/CreateNoteModal";
import { CreateNoteModalContextProvider } from "@/context/CreateNoteModalContext";

const NotesPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <CreateNoteModalContextProvider>
        <CreateNoteModal />
      </CreateNoteModalContextProvider>
    </div>
  );
};

export default NotesPage;
