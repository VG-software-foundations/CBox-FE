import {
  KeyBindingUtil,
  getDefaultKeyBinding,
  DraftHandleValue,
  CompositeDecorator,
  DraftEntityMutability,
  EditorState,
  RichUtils,
} from "draft-js";
import React, { useCallback, useMemo, useState } from "react";
import Immutable from "immutable";
import { BlockType, EntityType, InlineStyle, KeyCommand } from "./config";
import { HTMLtoState, stateToHTML } from "./convert";
import LinkDecorator from "./Link";

const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (html) => {
  const [state, setState] = useState(() =>
    html
      ? EditorState.createWithContent(HTMLtoState(html), decorator)
      : EditorState.createEmpty(decorator)
  );

  const toggleBlockType = useCallback((blockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType)
    );
  }, []);

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType();
  }, [state]);

  const toggleInlineStyle = useCallback((inlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle)
    );
  }, []);

  const hasInlineStyle = useCallback(
    (inlineStyle) => {
      const currentStyle = state.getCurrentInlineStyle();
      return currentStyle.has(inlineStyle);
    },
    [state]
  );

  const setEntityData = useCallback((entityKey, data) => {
    setState((currentState) => {
      const content = currentState.getCurrentContent();
      const contentStateUpdated = content.mergeEntityData(entityKey, data);
      return EditorState.push(
        currentState,
        contentStateUpdated,
        "apply-entity"
      );
    });
  }, []);

  const setTextColor = (color) => {
    const selection = state.getSelection();
    const contentState = state.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "TEXT_COLOR",
      "MUTABLE",
      { color }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(state, { currentContent: contentStateWithEntity });
    setState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };
  


  const addEntity = useCallback(
    (entityType, data, mutability) => {
      setState((currentState) => {
        const contentState = currentState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          entityType,
          mutability,
          data
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newState = EditorState.set(currentState, {
          currentContent: contentStateWithEntity,
        });
        return RichUtils.toggleLink(
          newState,
          newState.getSelection(),
          entityKey
        );
      });
    },
    []
  );

  const addLink = useCallback(
    (url) => {
      addEntity(EntityType.link, { url }, "MUTABLE");
    },
    [addEntity]
  );

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      if (command === "accent") {
        toggleInlineStyle(InlineStyle.ACCENT);
        return "handled";
      }

      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setState(newState);
        return "handled";
      }

      return "not-handled";
    },
    [toggleInlineStyle]
  );

  const handlerKeyBinding = useCallback((e) => {
    if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
      return "accent";
    }
    return getDefaultKeyBinding(e);
  }, []);

  
  const toHtml = useCallback(
    () => stateToHTML(state.getCurrentContent()),
    [state]
  );



  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      toHtml,
      addLink,
      setEntityData,
      setTextColor,
      handleKeyCommand,
      handlerKeyBinding,
    }),
    [
      state,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      toHtml,
      addLink,
      setEntityData,
      setTextColor,
      handleKeyCommand,
      handlerKeyBinding,
    ]
  );
};
