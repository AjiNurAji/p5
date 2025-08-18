import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import EditorProvider, { useEditorContext } from "../context/editor-context";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { nodes } from "@/components/blocks/editor-00/nodes";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

type Props = {
  children: React.ReactNode;
};

export const DialogWrapper = ({ children }: Props) => {
  return (
    <EditorProvider>
      <ComposerWrapper>
        {children}
      </ComposerWrapper>
    </EditorProvider>
  )
};

const ComposerWrapper = ({ children }: Props) => {
  const { editorState, editorSerializedState, onChange, onSerializedChange } =
    useEditorContext();
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        ...(editorState ? { editorState } : {}),
        ...(editorSerializedState
          ? { editorState: JSON.stringify(editorSerializedState) }
          : {}),
      }}
    >
      {children}
    </LexicalComposer>
  );
}