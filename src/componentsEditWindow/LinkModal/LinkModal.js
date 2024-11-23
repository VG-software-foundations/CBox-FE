import React, { useState, useContext } from "react";
import "./LinkModal.css"
import { LanguageContext } from './../../lang';

const langArrLinkModalMain = {
  links: {
    ru: 'Введите ссылку',
    en: 'Enter URL:'
  },
  save: {
    ru: 'Добавить',
    en: 'Add'
  },
  cancel: {
    ru: 'Отмена',
    en: 'Cancel'
  },
};
const LinkModal = ({ onConfirm, onClose, active, setActive,}) => {
  const [url, setUrl] = useState("");
  const { language } = useContext(LanguageContext); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onConfirm(url);
      onClose();
    } else {
      alert("Please enter a valid URL.");
    }
  };

 
  return (
    <div className={active ? "linkModal active" : "linkModal"} onClick={() => setActive(false)}>
      <div className="linkModalContent" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>{langArrLinkModalMain.links[language]}</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <div className="buttonContainer">
          <button type="submit">{langArrLinkModalMain.save[language]}</button>
          <button type="button" onClick={onClose}>{langArrLinkModalMain.cancel[language]}</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LinkModal;
