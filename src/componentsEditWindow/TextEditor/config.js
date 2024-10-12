import Immutable from "immutable";
import { DraftEditorCommand, DefaultDraftBlockRenderMap } from "draft-js";


export const EntityType = {
  link: "link",
};

export const BlockType = {
  list: "unordered-list-item",
  orderList: "ordered-list-item",
  default: "unstyled",
};

export const InlineStyle = {
  BOLD: "BOLD",
  ITALIC: "ITALIC",
  UNDERLINE: "UNDERLINE",
  STRIKETHROUGH: "STRIKETHROUGH",
  TEXT_COLOR: 'TEXT_COLOR',
};

export const AlignmentType ={
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  CENTER: "CENTER",
  JUSTIFY: "JUSTIFY",
}

export const BLOCK_LABELS = {
  [BlockType.list]: "Маркированный список",
  [BlockType.orderList]: "Нумерованный список",
  [BlockType.default]: "Обычный текст",
};



const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: "cite",
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
};