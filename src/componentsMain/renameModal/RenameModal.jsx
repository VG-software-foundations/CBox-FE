import React, { useState, useContext, useEffect } from 'react';
import "./RenameModal.css";
import { LanguageContext } from './../../lang';

const langArrModalMain = {
  title: {
    ru: 'Переименовать файл',
    en: 'Rename file'
  },
  save: {
    ru: 'Сохранить',
    en: 'Save'
  },
  cancel: {
    ru: 'Отмена',
    en: 'Cancel'
  },
  placeholder: {
    ru: 'Введите новое имя файла',
    en: 'Enter new file name'
  }
};

const RenameModal = ({ active, setActive, file, onRenameFile }) => {
  const { language } = useContext(LanguageContext); 
  const [newName, setNewName] = useState(file ? file.name : '');

  useEffect(() => {
    if (file) {
      setNewName(file.name); 
    }
  }, [file]);

  const handleRenameSubmit = () => {
    if (newName && file) {
      onRenameFile(file, newName); 
      setActive(false); 
    }
  };


  return (
    <div className={active ? "renameModal active" : "renameModal"} onClick={() => setActive(false)}>
      <div className="renameModalContent" onClick={(e) => e.stopPropagation()}>
        <h3>{langArrModalMain.title[language]}</h3>  
        <input
          type="text"
          placeholder={langArrModalMain.placeholder[language]}  
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleRenameSubmit(); 
            }
          }}
        />
        <div className="buttonsContainer">
          <button onClick={handleRenameSubmit}>{langArrModalMain.save[language]}</button>
          <button onClick={() => setActive(false)}>{langArrModalMain.cancel[language]}</button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
