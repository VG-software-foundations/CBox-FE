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
    
    // Создаём сущность для цвета текста
    const contentStateWithEntity = contentState.createEntity(
        "TEXT_COLOR",
        "MUTABLE",
        { color }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    
    // Обновляем состояние редактора
    const newEditorState = EditorState.set(state, {
        currentContent: contentStateWithEntity,
    });

    // Применяем сущность к текущему выделению
    const nextState = RichUtils.toggleLink(newEditorState, selection, entityKey);
    setState(nextState);
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










  const [history, setHistory] = useState({
    undoStack: [],
    redoStack: [],
  });

  const pushToUndoStack = useCallback(() => {
    setHistory(({ undoStack, redoStack }) => ({
      undoStack: [...undoStack, state],
      redoStack: [],
    }));
  }, [state]);

  const undo = useCallback(() => {
    setHistory(({ undoStack, redoStack }) => {
      if (undoStack.length === 0) return { undoStack, redoStack };

      const previousState = undoStack[undoStack.length - 1];
      return {
        undoStack: undoStack.slice(0, undoStack.length - 1),
        redoStack: [state, ...redoStack],
      };
    });

    setState((current) => history.undoStack[history.undoStack.length - 1] || current);
  }, [state, history]);

  const redo = useCallback(() => {
    setHistory(({ undoStack, redoStack }) => {
      if (redoStack.length === 0) return { undoStack, redoStack };

      const nextState = redoStack[0];
      return {
        undoStack: [...undoStack, state],
        redoStack: redoStack.slice(1),
      };
    });

    setState((current) => history.redoStack[0] || current);
  }, [state, history]);

  // Hook для обновления стека истории при каждом изменении редактора
  const onChange = useCallback(
    (newState) => {
      pushToUndoStack();
      setState(newState);
    },
    [pushToUndoStack]
  );















  const handleKeyCommand = useCallback(
    (command, editorState) => {
      if (command === "undo") {
        undo(); // Вызовите undo
        return "handled";
      } else if (command === "redo") {
        redo(); // Вызовите redo
        return "handled";
      }
  
      const newState = RichUtils.handleKeyCommand(editorState, command);
  
      if (newState) {
        setState(newState);
        return "handled";
      }
  
      return "not-handled";
    },
    [undo, redo, setState]
  );

  const handlerKeyBinding = useCallback((e) => {
    if (e.keyCode === 90 && KeyBindingUtil.hasCommandModifier(e)) {
      return e.shiftKey ? "redo" : "undo"; // Ctrl+Shift+Z -> redo, Ctrl+Z -> undo
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
      onChange,
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
      undo,
      redo,
    }),
    [
      state,
      onChange,
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
      undo,
      redo,
    ]
  );
};
