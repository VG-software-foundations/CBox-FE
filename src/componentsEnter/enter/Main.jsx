import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg';
import face from './../img/images/Vector.png';
import axios from 'axios';
import logoMain from './../img/images/Logo.png';
import { LanguageContext } from './../../lang'; 
import './Main.css';
import { useAuth0 } from "@auth0/auth0-react";

import UserControllerApi from "../../api/UserControllerApi"
import ApiClient from '../../ApiClient';

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
    const { loginWithRedirect, isAuthenticated } = useAuth0(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLanguageChange = (event) => {
        event.preventDefault(); 
        const selectedLang = event.target.value;
        changeLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang); 
    };
    
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage);
        }
    }, []);

    const apiclient = new ApiClient();
    const userControllerApi = new UserControllerApi(apiclient);

    const handleFormLogin = async (e) => {
        e.preventDefault();

        const body = {
            password: password,
            username: email,
        };

        try {
            userControllerApi.signIn(body, (error, data, response) => {
                if (error) {
                    console.error("Ошибка аутентификации:", error);
                    setError('Ошибка аутентификации. Проверьте email и пароль.');
                } else {
                    console.log("Успешный вход:", data);
                    localStorage.setItem('jwtToken', data.token);
                    apiclient.setJWTToken(data.token);
                    navigate('/profil');
                }
            });
        } catch (err) {
            console.error("Ошибка:", err);
            setError("Не удалось войти. Попробуйте снова.");
        }
    };


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
                    <form  onSubmit={handleFormLogin}>
                        <div className="input-groupM">
                            <label htmlFor="email" className='lgn-email'>{langArr["lgn-email"][language]}</label>
                            <input type="email" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-groupM">
                            <label htmlFor="password" className='pass'>{langArr["pass"][language]}</label>
                            <input type="password" id="password" name="password"  value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="inPutM">
                            <button type="submit" className="login-btnM">
                                {langArr["login-btnM"][language]}
                            </button>
                        </div>
                    </form>
                    {/* <div className="social-loginM">
                        <p>{langArr["social-loginM"][language]}</p>
                        <div className="social-iconsM">
                            <button type="button" className="google">
                                <img src={google} alt="Google Login" />
                            </button>
                            <div className="facebook">
                                <img src={face} alt="Facebook Login" />
                            </div>
                        </div>
                    </div> */}
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