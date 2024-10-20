import { useState, useContext } from 'react';
import "./modalAccess.css";
import exitImg from './../images/exit.png';
import moreImg from './../images/More.png';
import more2Img from './../images/More2.png';
import no from './../images/No.png';
import photoImg from './../images/Photo.png';
import yes from './../images/yes.png';
import { LanguageContext } from './../../lang'; 

const langArrModalAccess = {
  title: {
    ru: 'Общий доступ',
    en: 'Shared Access',
  },
  placeholder: {
    ru: 'Введите имя или эл. почту',
    en: 'Enter name or email',
  },
  view: {
    ru: 'Просмотр',
    en: 'View',
  },
  edit: {
    ru: 'Редактирование',
    en: 'Edit',
  },
  invite: {
    ru: 'Пригласить',
    en: 'Invite',
  },
  closeAccess: {
    ru: 'Закрыть доступ всем',
    en: 'Revoke folder access',
  }
};

const ModalAccess = ({ active, setActive, file, onOpenFile, onCopyFile }) => {
  const { language } = useContext(LanguageContext);
  const [selectedOption, setSelectedOption] = useState(langArrModalAccess.view[language]); 
  const [isOpen, setIsOpen] = useState(false); 

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); 
  };

  return (
    <div className={active ? "modalAccess active" : "modalAccess"} onClick={() => setActive(false)}>
      <div className={active ? "modalAccessContant active" : "modalAccessContant"} onClick={e => e.stopPropagation()}>
        <div className="containerEx">
          <span>{langArrModalAccess.title[language]}</span>
          <button className="exitButton" onClick={() => setActive(false)}>
            <img src={exitImg} alt="Закрыть" /> 
          </button>
        </div>
        
        <div className="containerFindAcc">
          <input 
            type="text" 
            className="textInput" 
            placeholder={langArrModalAccess.placeholder[language]}
          /> 
          
          <div className="dropdown">
            <button className="dropdownButton" onClick={() => setIsOpen(!isOpen)}>
              {selectedOption} <img src={more2Img} alt="More" />
            </button>

            {isOpen && (
              <div className="dropdownMenu">
                <div className="dropdownItem" onClick={() => handleSelect(langArrModalAccess.view[language])}>
                  {langArrModalAccess.view[language]}
                  {selectedOption === langArrModalAccess.view[language] && <img src={yes} alt="Selected" className="selectedIcon" />}
                </div>
                <div className="dropdownItem" onClick={() => handleSelect(langArrModalAccess.edit[language])}>
                  {langArrModalAccess.edit[language]}
                  {selectedOption === langArrModalAccess.edit[language] && <img src={yes} alt="Selected" className="selectedIcon" />}
                </div>
              </div>
            )}
          </div>

          <button className="inviteButton">
            {langArrModalAccess.invite[language]}
          </button>
        </div>
        
        <button className="noButton">
          <img src={no} alt="Закрыть доступ всем" />  {langArrModalAccess.closeAccess[language]}
        </button>
      </div>
    </div>
  );
};

export default ModalAccess;
