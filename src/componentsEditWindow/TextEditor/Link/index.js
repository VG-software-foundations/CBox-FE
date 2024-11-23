import React from "react";

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  
  const handleClick = (e) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault(); 
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
    >
      {children}
    </a>
  );
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};

export default linkDecorator;
