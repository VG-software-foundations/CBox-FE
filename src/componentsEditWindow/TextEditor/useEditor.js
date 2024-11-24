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
import linkDecorator from "./Link/index";
import { Modifier} from "draft-js";

const decorator = new CompositeDecorator([linkDecorator]);

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
  


const addEntity = useCallback((entityType, data, mutability) => {
  setState((currentState) => {
    const contentState = currentState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      entityType,
      mutability,
      data
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    if (!entityKey) {
      console.error("Failed to create entity. Entity key is null.");
      return currentState;
    }

    const newState = EditorState.set(currentState, {
      currentContent: contentStateWithEntity,
    });
    return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
  });
}, []);












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
  
    setState((prevState) => {
      const newState = history.undoStack[history.undoStack.length - 1];
      return newState || prevState; 
    });
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
  
    setState((prevState) => {
      const newState = history.redoStack[0];
      return newState || prevState;
    });
  }, [state, history]);
  
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
    console.log(`Key pressed: ${e.keyCode}`);  // Для отладки
    if (e.keyCode === 90 && KeyBindingUtil.hasCommandModifier(e)) {
      return "undo";
    }
    // Ctrl+Y -> redo
    if (e.ctrlKey && e.keyCode === 89) {
      return "redo";
    }
    // Cmd+Shift+Z или Ctrl+Shift+Z -> redo
    if (e.keyCode === 90 && KeyBindingUtil.hasCommandModifier(e) && e.shiftKey) {
      return "redo";
    }
  
    return getDefaultKeyBinding(e);
  }, []);

  
  const toHtml = useCallback(
    () => stateToHTML(state.getCurrentContent()),
    [state]
  );






  const addLink = (url) => {
    if (url && url.length > 0) {
      setState((currentState) => {
        const contentState = currentState.getCurrentContent();
        const selectionState = currentState.getSelection();
  
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  
        const contentStateWithLink = Modifier.insertText(
          contentStateWithEntity,
          selectionState,
          url,
          null,
          entityKey
        );
  
        const newEditorState = EditorState.push(
          currentState,
          contentStateWithLink,
          "insert-characters"
        );
  
        return EditorState.forceSelection(
          newEditorState,
          contentStateWithLink.getSelectionAfter()
        );
      });
    } else {
      alert("Please enter a valid URL.");
    }
  };
  
  

  const toggleFontStyle = (fontStyle) => {
    const styleKey = `FONT_${fontStyle.toUpperCase()}`;
    const newState = RichUtils.toggleInlineStyle(state, styleKey);
    setState(newState);
  };
  
  






  return useMemo(
    () => ({
      state,
      onChange,
      addEntity,
      toggleFontStyle,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      toHtml,
      setEntityData,
      setTextColor,
      handleKeyCommand,
      handlerKeyBinding,
      undo,
      redo,
      addLink,
    }),
    [
      state,
      addLink,toggleFontStyle,
      onChange,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      toHtml,
      addEntity,
      setEntityData,
      setTextColor,
      handleKeyCommand,
      handlerKeyBinding,
      undo,
      redo,
    ]
  );
};
