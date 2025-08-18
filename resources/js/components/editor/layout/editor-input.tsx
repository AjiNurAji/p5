"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import React from "react";

type Props = {
  keyName: string,
  state: SerializedEditorState<SerializedLexicalNode>;
  setState: React.Dispatch<React.SetStateAction<SerializedEditorState<SerializedLexicalNode>>>;
  setData: (keyName: string, value: any) => void;
}

export const EditorInput = ({ state, setState,  keyName, setData }: Props) => {
  return (
    <Editor
      keyName={keyName}
      setData={setData}
      editorSerializedState={state}
      onSerializedChange={(value) => setState(value)}
    />
  );
};
