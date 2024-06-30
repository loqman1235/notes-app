import {
  MdOutlineArchive,
  MdOutlineNotificationAdd,
  MdOutlinePalette,
  MdOutlinePushPin,
  MdPushPin,
} from "react-icons/md";
import ToolTip from "./shared/ToolTip";
import IconButton from "./shared/IconButton";
import { useEffect, useRef, useState } from "react";
import ChangeNoteBackgroundModal from "./ChangeNoteBackgroundModal";
import useCreateNoteModalCtx from "@/hooks/useCreateNoteModalCtx";

const CreateNoteModal = () => {
  const { selectedBgColor, setSelectedBgColor } = useCreateNoteModalCtx();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showChangeBgModal, setShowChangeBgModal] = useState(false);

  const toggleShowBgModal = () => {
    setShowChangeBgModal((prev) => !prev);
  };

  const toggleIsPinned = () => {
    setIsPinned((prev) => !prev);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setIsCollapsed(false);
    setIsPinned(false);
    setShowChangeBgModal(false);
    setSelectedBgColor("var(--background-color)");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

  // Create note
  useEffect(() => {
    const saveNote = () => {
      if (title || content) {
        // TODO: create note
        console.log(title, content, isPinned, selectedBgColor);
      }

      setIsCollapsed(false);
      setTitle("");
      setContent("");
      setIsPinned(false);
      setShowChangeBgModal(false);
      setSelectedBgColor("var(--background-color)");
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsCollapsed(false);
        saveNote();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPinned, content, selectedBgColor, setSelectedBgColor, title]);

  return (
    // Create Note Modal Container
    <div
      ref={containerRef}
      className={`w-full rounded-md border border-border p-4 shadow-md shadow-black/30 md:w-[500px]`}
      style={{
        backgroundColor: selectedBgColor,
        borderColor:
          selectedBgColor === "var(--background-color)"
            ? "var(--border-color)"
            : selectedBgColor,
      }}
    >
      <form className="flex flex-col gap-5">
        {/* HEADER */}
        <div
          className={`flex items-center justify-between ${!isCollapsed && "hidden"}`}
        >
          <input
            className="flex-1 bg-transparent font-semibold outline-none placeholder:font-semibold placeholder:text-text-light"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div className="group relative">
            <button
              onClick={toggleIsPinned}
              type="button"
              className={`flex items-center justify-center rounded-full p-2 text-xl text-text-light transition duration-300 hover:bg-white/10 hover:text-text-background ${isPinned && "!text-text-background"}`}
            >
              {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
            </button>
            <ToolTip
              text={`${isPinned ? "Unpin note" : "Pin note"}`}
              position="center"
            />
          </div>
        </div>

        {/* BODY */}
        <div>
          <textarea
            ref={textareaRef}
            className={`${!isCollapsed ? "!h-[18px] text-base" : "text-sm"} w-full resize-none overflow-hidden bg-transparent font-semibold outline-none placeholder:font-semibold placeholder:text-text-light`}
            name="note"
            id="note"
            placeholder="Take a note..."
            onClick={() => setIsCollapsed(true)}
            onKeyDown={() => setIsCollapsed(true)}
            onInput={adjustTextareaHeight}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>

        {/* FOOTER */}
        <div
          className={`flex items-center justify-between ${!isCollapsed && "hidden"}`}
        >
          <div className="flex items-center gap-2">
            {/* REMIND ME BUTTON */}
            <IconButton icon={<MdOutlineNotificationAdd />} text="Remind me" />
            <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
              <IconButton
                icon={<MdOutlinePalette />}
                text="Change background"
                onClick={toggleShowBgModal}
                id="changeBgModal"
              />
              <ChangeNoteBackgroundModal
                isNoteBgModalShown={showChangeBgModal}
                setShowChangeBgModal={setShowChangeBgModal}
              />
            </div>
            <IconButton icon={<MdOutlineArchive />} text="Archive" />
          </div>

          {/* Close Modal  */}
          <div>
            <button
              onClick={handleClose}
              type="button"
              className="rounded-md px-4 py-2 text-sm font-semibold transition duration-300 hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNoteModal;
