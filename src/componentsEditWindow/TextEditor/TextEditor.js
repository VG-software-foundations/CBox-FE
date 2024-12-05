import React, { useRef, useState, useEffect } from "react";
import { Modifier, Editor, EditorState } from "draft-js";
import { useLocation } from "react-router-dom";
import "./TextEditor.css";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";
import { useFileContext } from './file';
import classNames from "classnames";

const TextEditor = ({ className }) => {
  const editorApi = useEditorApi();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);

  const location = useLocation(); 
  const { fileContent1 } = useFileContext();
  const [fileContent, setFileContent] = useState('');

  const [isTextLoaded, setIsTextLoaded] = useState(false);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const content = queryParams.get('fileContent');
  //   if (content && !isTextLoaded) {
  //     const decodedContent = atob(content);
  //     const contentState = Modifier.insertText(
  //       editorState.getCurrentContent(),
  //       editorState.getSelection(),
  //       decodedContent
  //     );
  //     setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
  //     setIsTextLoaded(true);
  //   }
  // }, [location, editorState, isTextLoaded]);
  useEffect(() => {
    if (fileContent1) {
        const contentState = Modifier.insertText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            fileContent1
        );
        setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
    }
}, [fileContent1, editorState]);
  const handleFocus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePastedText = (text, html) => {
    const urlRegex = /https?:\/\/[^\s]+/;
    if (urlRegex.test(text)) {
      setEditorState((prevState) => {
        const contentState = prevState.getCurrentContent();
        const selectionState = prevState.getSelection();

        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url: text }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const contentStateWithLink = Modifier.insertText(
          contentStateWithEntity,
          selectionState,
          text,
          null,
          entityKey
        );

        const newEditorState = EditorState.push(
          prevState,
          contentStateWithLink,
          "insert-characters"
        );

        return EditorState.forceSelection(
          newEditorState,
          contentStateWithLink.getSelectionAfter()
        );
      });
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className="editor-wrapper" onClick={handleFocus}>
      <div className="text-editor">
        <Editor
          spellCheck
          handleKeyCommand={editorApi.handleKeyCommand}
          handleClick={editorApi.handleClick}
          customStyleMap={CUSTOM_STYLE_MAP}
          blockRenderMap={BLOCK_RENDER_MAP}
          editorState={editorApi.state}
          onChange={editorApi.onChange}
          keyBindingFn={editorApi.handlerKeyBinding}
          handlePastedText={handlePastedText}
        />
      </div>
    </div>
  );
};

export default TextEditor;
