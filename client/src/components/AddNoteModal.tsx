import { MdAdd, MdClose } from "react-icons/md";
import Button from "./shared/Button";
import { useState } from "react";
import Tag from "./Tag";

interface AddNoteModalProps {
  isModalShown: boolean;
  toggleModal: () => void;
}

const inputStyles =
  "bg-background placeholder:text-text-muted rounded-xl px-4 py-3 outline-none border border-border";

const AddNoteModal = ({ isModalShown, toggleModal }: AddNoteModalProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Handle adding a tag
  const handleAddTag = (e: React.KeyboardEvent) => {
    const inputElement = e.target as HTMLInputElement;

    if (e.code === "Enter" && inputElement.value !== "") {
      const value = inputElement.value;
      setTags((prevTags) => [...prevTags, value]);
      inputElement.value = "";
      e.preventDefault();
    }

    if (e.code === "Backspace" && inputElement.value === "") {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed inset-0 h-screen w-full items-center justify-center bg-white/30 p-5 backdrop-blur-sm ${isModalShown ? "flex" : "hidden"}`}
    >
      <div
        className={`w-full rounded-xl bg-foreground p-5 shadow-xl md:w-[480px] ${isModalShown && "modalAnimation"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex w-full items-center justify-between border-b border-b-border pb-5">
          <div>
            <h4 className="text-lg font-bold">Add a note</h4>
          </div>
          <button
            onClick={toggleModal}
            className="rounded-full bg-foreground-light p-1 text-xl text-text-muted transition duration-300 hover:text-text-background"
          >
            <MdClose />
          </button>
        </div>
        {/* BODY */}
        <div className="pt-5">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-sm">
                Title{" "}
                <span className="text-xs text-text-light">(Required)</span>
              </label>
              <input
                className={inputStyles}
                type="text"
                name="title"
                id="title"
                placeholder="Title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="note" className="text-sm">
                Note <span className="text-xs text-text-light">(Required)</span>
              </label>
              <textarea
                className={inputStyles}
                name="note"
                id="note"
                rows={5}
                placeholder="Note"
              ></textarea>
            </div>

            <div className="flex flex-col flex-wrap gap-1">
              <label htmlFor="tags" className="text-sm">
                Tags{" "}
                <span className="text-xs text-text-light">
                  (Press enter to add)
                </span>
              </label>
              <div className={`${inputStyles} flex flex-wrap items-center`}>
                {tags && tags.length > 0 && (
                  <div className="mr-2 flex flex-wrap items-center gap-1">
                    {tags.map((tag, i) => (
                      <Tag
                        key={tag + i}
                        tag={tag}
                        handleRemoveTag={handleRemoveTag}
                      />
                    ))}
                  </div>
                )}

                <input
                  className="flex-1 bg-transparent outline-none placeholder:text-text-muted"
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Add a tag"
                  autoComplete="off"
                  onKeyDown={handleAddTag}
                />
              </div>
            </div>

            <Button size="md" type="submit" className="!w-full">
              <MdAdd size={20} />
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
