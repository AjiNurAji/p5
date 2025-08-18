import { EditorState, SerializedEditorState } from "lexical";
import React from "react";
import { initialState } from "../components/data/initialStateEditor";

type EditorContextType = {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
};

const EditorContext = React.createContext<EditorContextType | null>(null);

const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [editorState, setEditorState] =
    React.useState<SerializedEditorState>(initialState);

  return (
    <EditorContext
      value={{
        editorSerializedState: editorState,
        onSerializedChange: setEditorState,
      }}
    >
      {children}
    </EditorContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditorContext = () => {
  const editorContext = React.useContext(EditorContext);

  if (!editorContext) throw new Error("useEditorContext has to be used within <EditorProvider>");

  return editorContext;
}

export default EditorProvider;
