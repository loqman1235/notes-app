import { createContext, useState } from "react";

interface CreateNoteModalContextType {
  selectedBgColor: string;
  setSelectedBgColor: React.Dispatch<React.SetStateAction<string>>;
}

const CreateNoteModalContext = createContext<CreateNoteModalContextType>({
  selectedBgColor: "",
  setSelectedBgColor: () => {},
});

const CreateNoteModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBgColor, setSelectedBgColor] = useState(
    "var(--background-color)",
  );

  return (
    <CreateNoteModalContext.Provider
      value={{ selectedBgColor, setSelectedBgColor }}
    >
      {children}
    </CreateNoteModalContext.Provider>
  );
};

export { CreateNoteModalContext, CreateNoteModalContextProvider };
