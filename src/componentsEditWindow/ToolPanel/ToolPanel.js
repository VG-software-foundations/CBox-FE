
import React, { useState } from "react";
import { useEditorApi } from "./../TextEditor/context";
import classNames from "classnames";
import { AlignmentType, BlockType, InlineStyle } from "../TextEditor/config";
import "./ToolPanel.css";
import logo from "./../images/logo.png"

import { FaBold, FaLink, FaListOl, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaUndo, FaRedo, FaPalette } from 'react-icons/fa';

const toolbarOptions = {
    fontFamily: {
        options: ["Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"],
    },
    list: {
        options: ["unordered", "ordered"],
    },
    textAlign: {
        options: ["left", "center", "right"],
    },
    colorPicker: {
        colors: [
            "rgb(97,189,109)", "rgb(26,188,156)", "rgb(84,172,210)", "rgb(255,99,71)", 
            "rgb(255,165,0)", "rgb(238,130,238)", "rgb(255,228,196)", "rgb(240,128,128)", 
            "rgb(135,206,250)", "rgb(44,130,201)", "rgb(147,101,184)", "rgb(71,85,119)",
            "rgb(204,204,204)", "rgb(65,168,95)", "rgb(0,168,133)", "rgb(61,142,185)", 
            "rgb(41,105,176)", "rgb(85,57,130)", "rgb(40,50,78)", "rgb(0,0,0)",
            "rgb(247,218,100)", "rgb(251,160,38)", "rgb(235,107,86)", "rgb(226,80,65)", 
            "rgb(163,143,132)", "rgb(239,239,239)",
        ],
    },
    history: {
        options: ["undo", "redo"],
    },
};

const ToolPanel = () => {
    const {
        toHtml,
        addLink,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        undo,
        redo,
        setTextColor,
    } = useEditorApi();

    const [selectedColor, setSelectedColor] = useState("black"); 

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setTextColor(color);
    };
    const handleAlignment = (alignment) => {
      toggleBlockType(alignment);
  };

    return (
        <div className="tool-panel">
            <header className="tool-panel__header">
                <div className="tool-panel__title"><img src={logo} className="title-logo">
                </img> <div className="name-title">CBox</div></div>
                <div className="tool-panel__icons">
                    <button className="tool-panel__icon-button">⚙️</button>
                </div>
            </header>
            <div className="tool-panel__first-row">
                
                <button
                    className={classNames(
                        "tool-panel__item",
                        hasInlineStyle(InlineStyle.BOLD) && "tool-panel__item_active"
                    )}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.BOLD);
                    }}
                >
                    <FaBold color="#9C6035" size={20}/>
                </button>
                <button
                    className={classNames(
                        "tool-panel__item",
                        hasInlineStyle(InlineStyle.ITALIC) && "tool-panel__item_active"
                    )}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.ITALIC);
                    }}
                >
                    <FaItalic color="#9C6035" size={20}/>
                </button>
                <button
                    className={classNames(
                        "tool-panel__item",
                        hasInlineStyle(InlineStyle.UNDERLINE) && "tool-panel__item_active"
                    )}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.UNDERLINE);
                    }}
                >
                    <FaUnderline color="#9C6035" size={20}/>
                </button>
                <button
                    className={classNames(
                        "tool-panel__item",
                        hasInlineStyle(InlineStyle.STRIKETHROUGH) && "tool-panel__item_active"
                    )}

onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.STRIKETHROUGH);
                    }}
                >
                    <FaStrikethrough color="#9C6035" size={20}/>
                </button>

                <div className="toolbar__alignment">
                    <button className="tool-panel__item" onClick={() => handleAlignment(AlignmentType.LEFT)}>
                        <FaAlignLeft color="#9C6035" size={20}/>
                    </button>
                    <button className="tool-panel__item" onClick={() => handleAlignment(AlignmentType.CENTER)}>
                        <FaAlignCenter color="#9C6035" size={20}/>
                    </button>
                    <button className="tool-panel__item" onClick={() => handleAlignment(AlignmentType.RIGHT)}>
                        <FaAlignRight color="#9C6035" size={20}/>
                    </button>
                </div>

                <div className="toolbar__history">
                    <button className="tool-panel__item" onClick={undo}>
                        <FaUndo color="#9C6035" size={20}/>
                    </button>
                    <button className="tool-panel__item" onClick={redo}>
                        <FaRedo color="#9C6035" size={20}/>
                    </button>
                </div>
            </div>

            <div className="tool-panel__second-row">
                <button
                    className="tool-panel__item"
                    onClick={() => {
                        const url = prompt("URL:");
                        if (url) {
                            addLink(url);
                        }
                    }}
                >
                    <FaLink color="#9C6035" size={20}/>
                    
                </button>
                <button
                    className="tool-panel__item"
                    onClick={() => {
                        console.log(toHtml());
                    }}
                >
                    Print
                </button>

                <div className="dropdown">
                    <button className="tool-panel__item dropbtn">Font Family</button>
                    <div className="dropdown-content">
                        {toolbarOptions.fontFamily.options.map((font, index) => (
                            <button key={index} onClick={(e) => { e.preventDefault();  }}>
                                {font}
                            </button>
                        ))}
                    </div>
                </div>

                 <div className="toolbar__list">
                    <button className="tool-panel__item" onClick={(e) => e.preventDefault()}>
                        <FaListOl color="#9C6035" size={20}/>
                    </button>
                    <button className="tool-panel__item" onClick={(e) => e.preventDefault()}>
                        <FaListUl color="#9C6035" size={20}/>
                    </button>
                </div>

                <div className="dropdown">
                    <button className="tool-panel__item dropbtn">
                        <FaPalette color="#9C6035" size={20}/>
                    </button>
                    <div className="dropdown-content">
                        {toolbarOptions.colorPicker.colors.map((color, index) => (
                            <button
                                key={index}
                                className="tool-panel__color-item"
                                style={{
                                    backgroundColor: color,
                                    border: 'none', 
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '4px', 
                                    margin: '2px',
                                    cursor: 'pointer' 
                                }}
                                onClick={() => handleColorChange(color)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolPanel;