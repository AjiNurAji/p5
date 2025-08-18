"use client";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor, SerializedEditorState } from "lexical";
import React from "react";

import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { cn } from "@/lib/utils";
import { nodes } from "./nodes";
import { Plugins } from "./plugins";

import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  className,
  keyName,
  setData,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  className?: string;
  keyName: string;
  setData: (keyName: string, value: any) => void;
}) {
  const handleValue = React.useCallback((editor: LexicalEditor) => {
    editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setData(keyName, markdown);
    });
  }, []);

  return (
    <div className={cn(className)}>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <FloatingLinkContext>
            <Plugins />

            <OnChangePlugin
              ignoreSelectionChange={true}
              onChange={(editorState, editor) => {
                handleValue(editor);
                onChange?.(editorState);
                onSerializedChange?.(editorState.toJSON());
              }}
            />
          </FloatingLinkContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
