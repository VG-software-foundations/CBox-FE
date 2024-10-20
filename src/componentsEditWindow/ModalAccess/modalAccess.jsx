import { useState } from 'react';
import "./modalAccess.css";
import exitImg from './../images/exit.png';
import moreImg from './../images/More.png';
import more2Img from './../images/More2.png';
import no from './../images/No.png';
import photoImg from './../images/Photo.png';
import yes from './../images/yes.png';

const ModalAccess = ({ active, setActive, file, onOpenFile, onCopyFile }) => {
  const [selectedOption, setSelectedOption] = useState('Просмотр'); // Состояние для выбранной опции
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия меню

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Закрыть dropdown после выбора
  };

  return (
    <div className={active ? "modalAccess active" : "modalAccess"} onClick={() => setActive(false)}>
      <div className={active ? "modalAccessContant active" : "modalAccessContant"} onClick={e => e.stopPropagation()}>
        <div className="containerEx">
          <span>Общий доступ</span>
          <button className="exitButton" onClick={() => setActive(false)}>
            <img src={exitImg} alt="Закрыть" /> 
          </button>
        </div>
        
        <div className="containerFindAcc">
          <input 
            type="text" 
            className="textInput" 
            placeholder="Введите имя или эл. почту"
          /> {/* Поле ввода текста */}
          
          <div className="dropdown">
            <button className="dropdownButton" onClick={() => setIsOpen(!isOpen)}>
              {selectedOption} <img src={more2Img} alt="More" />
            </button>

            {isOpen && (
              <div className="dropdownMenu">
                <div className="dropdownItem" onClick={() => handleSelect('Просмотр')}>
                  Просмотр
                  {selectedOption === 'Просмотр' && <img src={yes} alt="Selected" className="selectedIcon" />}
                </div>
                <div className="dropdownItem" onClick={() => handleSelect('Редактирование')}>
                  Редактирование
                  {selectedOption === 'Редактирование' && <img src={yes} alt="Selected" className="selectedIcon" />}
                </div>
              </div>
            )}
          </div>

          <button className="inviteButton">
            Пригласить
          </button>
        </div>
        <button className="noButton">
            <img src={no} alt="Закрыть доступ всем" />  Закрыть доступ всем
          </button>
      </div>
    </div>
  );
}

export default ModalAccess;
