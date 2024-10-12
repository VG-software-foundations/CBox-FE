import React, { useRef, useState } from "react";
import { Editor, EditorState } from "draft-js";
import "./TextEditor.css";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";
import classNames from "classnames";


const TextEditor = ({ className }) => {
  const editorApi = useEditorApi();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);

  const handleFocus = () => {
      if (editorRef.current) {
          editorRef.current.focus();
      }
  };
  return (
    <div className="editor-wrapper" onClick={handleFocus}>
    <div className="text-editor" >
      <Editor
        spellCheck
        handleKeyCommand={editorApi.handleKeyCommand}
        customStyleMap={CUSTOM_STYLE_MAP}
        blockRenderMap={BLOCK_RENDER_MAP}
        editorState={editorApi.state}
        onChange={editorApi.onChange}
        keyBindingFn={editorApi.handlerKeyBinding}
      />
    </div>
    </div>
  );
};

export default TextEditor;