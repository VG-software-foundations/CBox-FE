import "./Information.css";
import copyImg from './../img/copy.png';
import inComp from './../img/inComp.png';
import musorMini from './../img/musorMini.png';
import openImg from './../img/open.png';
import renameImg from './../img/rename.png';
import { useState, useContext } from 'react';
import { LanguageContext } from './../../lang';

const langArrModalInformationMain = {
  open: {
    ru: 'Открыть',
    en: 'Open'
  },
  save: {
    ru: 'Скачать',
    en: 'Save'
  },
  rename: {
    ru: 'Переименовать',
    en: 'Rename'
  },
  copyy: {
    ru: 'Сделать копию',
    en: 'Copy'
  },
  del:{
    ru: 'Удалить',
    en: 'Delete'
  },
};

const Information = ({ active, setActive, file, onOpenFile, onCopyFile }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className={active ? "modalInf active" : "modalInf"} onClick={() => setActive(false)}>
      <div className={active ? "modalInfContant active" : "modalInfContant"} onClick={e => e.stopPropagation()}>
        <div className="containerOp">
          <button className="openButton" onClick={() => onOpenFile(file)}>
            <img src={openImg} alt="Открыть" /> <span>{langArrModalInformationMain.open[language]}</span>
          </button>
        </div>
        <div className="containerObsh">
          <button className="inButton">
            <img src={inComp} alt="Скачать" /> <span>{langArrModalInformationMain.save[language]}</span>
          </button>
          <button className="renameButton">
            <img src={renameImg} alt="Переименовать" /><span>{langArrModalInformationMain.rename[language]}</span>
          </button>
          <button className="copyButton" onClick={() => onCopyFile(file)}>
            <img src={copyImg} alt="Сделать копию" /><span>{langArrModalInformationMain.copyy[language]}</span>
          </button>
        </div>
        <button className="delButton">
          <img src={musorMini} alt="Удалить" /><span>{langArrModalInformationMain.del[language]}</span>
        </button>
      </div>
    </div>
  );
}

export default Information;
