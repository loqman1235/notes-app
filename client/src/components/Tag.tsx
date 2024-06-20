import { MdClose } from "react-icons/md";

interface TagProps {
  tag: string;
  handleRemoveTag: (tag: string) => void;
}
const Tag = ({ tag, handleRemoveTag }: TagProps) => {
  return (
    <span className="flex max-w-[200px] flex-grow items-center justify-between gap-2 rounded-xl bg-foreground-light px-2 py-1">
      <span>{tag}</span>
      <button
        onClick={() => handleRemoveTag(tag)}
        className="text-text-muted transition duration-300 hover:text-text-background"
      >
        <MdClose />
      </button>
    </span>
  );
};

export default Tag;
