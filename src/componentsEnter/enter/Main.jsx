import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg';
import face from './../img/images/Vector.png';
import logoMain from './../img/images/Logo.png';
import { LanguageContext } from './../../lang'; 
import './Main.css';
import { useAuth0 } from "@auth0/auth0-react";

const langArr = {
    "login-title-enterM activeM": {
        "ru": "Вход",
        "en": "Sign in",
    },
    "login-title-registrationM passiveM": {
        "ru": "Регистрация",
        "en": "Registration",
    },
    "lgn-email": {
        "ru": "Электронная почта:",
        "en": "Email:",
    },
    "pass": {
        "ru": "Пароль:",
        "en": "Password:",
    },
    "login-btnM": {
        "ru": "Войти",
        "en": "Sign in",
    },
    "social-loginM": {
        "ru": "Авторизация через социальные сети",
        "en": "Authorization via social networks",
    },
};

function Main() {
    const navigate = useNavigate();
    const { language, changeLanguage } = useContext(LanguageContext);
    const { loginWithRedirect, isAuthenticated } = useAuth0(); // Добавляем isAuthenticated из Auth0

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang); 
    };

    // Обработчик для вызова loginWithRedirect
    const handleLogin = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        loginWithRedirect();
    };

    // Проверяем аутентификацию и перенаправляем, если пользователь зарегистрирован
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profil');
        }
    }, [isAuthenticated, navigate]); // Запускаем эффект при изменении isAuthenticated или navigate

    return (
        <div className='backM'>
            <div className="containerMainM">
                <div className="login-boxM">
                    <div className="choiceM">
                        <h2 className="login-title-enterM activeM">{langArr["login-title-enterM activeM"][language]}</h2>
                        <h2 className="login-title-registrationM passiveM" onClick={() => navigate('/registration')}>
                            {langArr["login-title-registrationM passiveM"][language]}
                        </h2>
                    </div>
                    <form>
                        <div className="input-groupM">
                            <label htmlFor="email" className='lgn-email'>{langArr["lgn-email"][language]}</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="input-groupM">
                            <label htmlFor="password" className='pass'>{langArr["pass"][language]}</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div className="inPutM">
                            <button type="submit" className="login-btnM" onClick={handleLogin}>
                                {langArr["login-btnM"][language]}
                            </button>
                        </div>
                    </form>
                    <div className="social-loginM">
                        <p>{langArr["social-loginM"][language]}</p>
                        <div className="social-iconsM">
                            <button type="button" className="google" onClick={handleLogin}>
                                <img src={google} alt="Google Login" />
                            </button>
                            <div className="facebook">
                                <img src={face} alt="Facebook Login" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div className="container">
                    <div className="logo">
                        <img src={logoMain} alt="Logo" />
                    </div>
                    <div className="language">
                        <select className='select' value={language} onChange={handleLanguageChange}>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
