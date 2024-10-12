import { ContentState } from "draft-js";
import React from "react";
import { useEditorApi } from "../context";

const Link = ({ contentState, entityKey, children }) => {
  const { setEntityData } = useEditorApi();
  const { url, className } = contentState.getEntity(entityKey).getData();

  const handlerClick = () => {
    const newUrl = prompt("URL:", url);
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl });
    }
  };

  return (
    <a href={url} onClick={handlerClick} className={className}>
      {children}
    </a>
  );
};

export default Link;