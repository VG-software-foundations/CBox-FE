import React, { useContext } from 'react';
import { LanguageContext } from './../../lang'; 

import './Header.css';
import massage from './../img/DinDin.png';
import exitImg from './../img/Ex.png';
import icon from './../img/Victor.png';

function Header() {
    const { language, changeLanguage } = useContext(LanguageContext); 

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang); 
    };

    return (
        <header className="header">
            <div className="containerHeader">
                <select className="select" value={language} onChange={handleLanguageChange}>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>
                <button className="massButton">
                    <img src={massage} alt="Messages" />
                </button>
                <button className="iconbutton">
                    <img src={icon} alt="Icon" />
                </button>
                <button className="exitIcon">
                    <img src={exitImg} alt="Exit" />
                </button>
            </div>
        </header>
    );
}

export default Header;
