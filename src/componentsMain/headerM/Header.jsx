import React, { useContext } from 'react';
import { LanguageContext } from './../../lang'; 
import { useAuth0 } from "@auth0/auth0-react";

import './Header.css';
import massage from './../img/DinDin.png';
import exitImg from './../img/Ex.png';
import icon from './../img/Victor.png';

function Header() {
    const { language, changeLanguage } = useContext(LanguageContext); 
    const { logout } = useAuth0(); // Получаем функцию logout из Auth0

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
                <button className="exitIcon" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    <img src={exitImg} alt="Exit" />
                </button>
            </div>
        </header>
    );
}

export default Header;
