"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type Props = {
  keyName: string,
  state?: SerializedEditorState<SerializedLexicalNode>;
  setState?: (editorSerializedState: SerializedEditorState) => void;
  setData: (keyName: string, value: any) => void;
}

export const EditorInput = ({ state, setState,  keyName, setData }: Props) => {
  return (
    <Editor
      keyName={keyName}
      setData={setData}
      editorSerializedState={state}
      onSerializedChange={(value) => (setState) && setState(value)}
    />
  );
};
