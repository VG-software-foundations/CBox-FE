import React, { useRef, useState, useEffect } from "react";
import { Modifier, Editor, EditorState, ContentState } from "draft-js";
import { useLocation } from "react-router-dom";
import "./TextEditor.css";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";

const TextEditor = ({ className }) => {
    const location = useLocation();
    const editorApi = useEditorApi();
    const editorRef = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const { fileContent } = location.state || {};

    useEffect(() => {
        if (fileContent) {
            const contentState = ContentState.createFromText(fileContent);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [fileContent]);

    const handleFocus = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
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
                    editorState={editorState}
                    onChange={handleEditorChange}
                    keyBindingFn={editorApi.handlerKeyBinding}
                    handlePastedText={handlePastedText}
                    ref={editorRef}
                />
            </div>
        </div>
    );
};

export default TextEditor;