import Immutable from "immutable";
import { DraftEditorCommand, DefaultDraftBlockRenderMap } from "draft-js";


export const EntityType = {
  link: "link",
};

export const BlockType = {
  list: "unordered-list-item",
  orderList: "ordered-list-item",
  alignmentLeft: "alignment-left",
  alignmentCenter: "alignment-center",
  alignmentRight: "alignment-right",
  default: "unstyled",
};

export const InlineStyle = {
  BOLD: "BOLD",
  ITALIC: "ITALIC",
  UNDERLINE: "UNDERLINE",
  STRIKETHROUGH: "STRIKETHROUGH",
  TEXT_COLOR: 'TEXT_COLOR',
};


const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: "cite",
  },
  [BlockType.alignmentLeft]: {
    element: "div",
    wrapper: <div style={{ textAlign: "left" }} />,
  },
  [BlockType.alignmentCenter]: {
    element: "div",
    wrapper: <div style={{ textAlign: "center" }} />,
  },
  [BlockType.alignmentRight]: {
    element: "div",
    wrapper: <div style={{ textAlign: "right" }} />,
  },
  [BlockType.list]: {
    element: "li",
    wrapper: <ul/>,
  },
});

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(
  CUSTOM_BLOCK_RENDER_MAP
);

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.ACCENT]: {
    backgroundColor: "#F7F6F3",
    color: "#A41E68",
  },
  FONT_ARIAL: {
    fontFamily: "Arial, sans-serif",
  },
  FONT_TIMES: {
    fontFamily: '"Times New Roman", serif',
  },
  FONT_GEORGIA: {
    fontFamily: "Georgia, serif",
  },
  FONT_IMPACT: {
    fontFamily: "Impact, sans-serif",
  },
  FONT_TAHOMA: {
    fontFamily: "Tahoma, sans-serif",
  },
  FONT_VERDANA: {
    fontFamily: "Verdana, sans-serif",
  },
};
