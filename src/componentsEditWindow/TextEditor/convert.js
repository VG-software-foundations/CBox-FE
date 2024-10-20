import { convertFromHTML, convertToHTML } from "draft-convert";
import { CUSTOM_STYLE_MAP, BlockType, EntityType, InlineStyle, AlignmentType } from "./config";

export const stateToHTML = convertToHTML({
  styleToHTML: (style) => {
    switch (style) {
      case InlineStyle.BOLD:
        return <strong />;
      case InlineStyle.ITALIC:
        return <em />;
      case InlineStyle.UNDERLINE:
        return <span className="underline" style={{ textDecoration: "underline" }} />;
      case InlineStyle.STRIKETHROUGH:
        return <span className="line-through" style={{ textDecoration: "line-through" }} />;
      case InlineStyle.TEXT_COLOR:
          return (text, { color }) => `<span style="color: ${color}">${text}</span>`;
      default:
        return null;
    }
  },

  blockToHTML: (block) => {
    switch (block.type) {
      case BlockType.orderList:
        return { element: <ol />, nest: <li /> };
      case BlockType.list:
        return { element: <ul />, nest: <li /> };
      case BlockType.alignmentLeft:
        return <div style={{ textAlign: "left" }} />;
      case BlockType.alignmentCenter:
        return <div style={{ textAlign: "center" }} />;
      case BlockType.alignmentRight:
        return <div style={{ textAlign: "right" }} />;
      case BlockType.default:
        return <p />;
      default:
        return null;
    }
  },

  entityToHTML: (entity, originalText) => {
    if (entity.type === EntityType.link) {
      return <a href={entity.data.url}>{originalText}</a>;
    }
    return originalText;
  },
});

export const HTMLtoState = convertFromHTML({
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === "strong") {
      return currentStyle.add(InlineStyle.BOLD);
    }
    if (nodeName === "em") {
      return currentStyle.add(InlineStyle.ITALIC);
    }
    if (nodeName === "span" && node.classList.contains("underline")) {
      return currentStyle.add(InlineStyle.UNDERLINE);
    }
    if (nodeName === "span" && node.style.textDecoration === "line-through") {
      return currentStyle.add(InlineStyle.STRIKETHROUGH);
    }
    if (nodeName === "span" && node.style.color) {
      return currentStyle.add('TEXT_COLOR'); 
    }
    return currentStyle;
  },

  htmlToBlock(nodeName, node, last) {
    if (node.style && node.style.textAlign === 'left') {
      return BlockType.alignmentLeft;
    }
    if (node.style && node.style.textAlign === 'center') {
      return BlockType.alignmentCenter;
    }
    if (node.style && node.style.textAlign === 'right') {
      return BlockType.alignmentRight;
    }
    switch (nodeName) {
      case "li":
        return last === "ol" ? BlockType.orderList : BlockType.list;
      case "div":
      case "p":
        return BlockType.default;
      default:
        return null;
    }
  },
  
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === "a" && node.href) {
      return createEntity(EntityType.link, "MUTABLE", { url: node.href });
    }
    return undefined;
  },
});
