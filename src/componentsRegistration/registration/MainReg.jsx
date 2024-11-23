import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg';
import face from './../img/images/Vector.png';
import logoReg from './../img/images/Logo.png';
import { LanguageContext } from './../../lang';
import './MainReg.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import UserControllerApi from "../../api/UserControllerApi";
import ApiClient from '../../ApiClient';
import ModalReg from "../modalReg/ModalReg";

const langArr = {
    "login-title-enter active": {
        "ru": "Вход",
        "en": "Sign in",
    },
    "login-title-registration passive": {
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
    "confirm-pass": {
        "ru": "Подтвердите пароль:",
        "en": "Confirm password:",
    },
    "login-btn": {
        "ru": "Зарегистрироваться",
        "en": "Register",
    },
    "social-login": {
        "ru": "Авторизация через социальные сети",
        "en": "Authorization via social networks",
    },
    "enter-pin": {
        "ru": "Введите PIN-код",
        "en": "Enter PIN Code",
    },
    "enter-btn": {
        "ru": "Войти",
        "en": "Enter",
    }
};

function MainReg() {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const { language, changeLanguage } = useContext(LanguageContext);
    const { loginWithRedirect } = useAuth0();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [pin, setPin] = useState('');
    const apiclient = new ApiClient();
    const userControllerApi = new UserControllerApi(apiclient);

    const handleFormRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        const body = {
            username: email,
            password: password,
            role: "USER",
        };

        try {
            userControllerApi.signUp(body, (error, data) => {
                if (error) {
                    console.error("Ошибка", error);
                    setError("Не удалось зарегистрироваться");
                } else {
                    console.log("Пользователь зарегистрирован:", data);
                   
                }
            });
        } catch (err) {
            console.error("Ошибка:", err);
            setError("Не удалось зарегистрироваться. Попробуйте снова.");
        }
    };

    const handlePinSubmit = async () => {
        try {
            const response = await axios.post('/api/verify-pin', { email, pin });
            if (response.data.success) {
                localStorage.setItem('jwtToken', response.data.token);
                apiclient.setJWTToken(response.data.token);
                navigate('/profil');
            } else {
                setError("Неверный PIN-код");
            }
        } catch (err) {
            console.error("Ошибка при проверке PIN-кода:", err);
            setError("Не удалось подтвердить PIN-код");
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await loginWithRedirect();
        } catch (err) {
            console.error('Error during Google sign-in:', err);
        }
    };

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

    return (
        <div className='back'>
            <div className="containerMain">
                <div className="login-box">
                    <div className="choice">
                        <h2 className="login-title-enter active" onClick={() => navigate('/')}>
                            {langArr["login-title-enter active"][language]}
                        </h2>
                        <h2 className="login-title-registration passive">
                            {langArr["login-title-registration passive"][language]}
                        </h2>
                    </div>
                    <form onSubmit={handleFormRegister}>
                        <div className="input-group">
                            <label htmlFor="email" className='lgn-email'>
                                {langArr["lgn-email"][language]}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password" className='pass'>
                                {langArr["pass"][language]}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password" className='confirm-pass'>
                                {langArr["confirm-pass"][language]}
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="inPut">
                            <button type="submit" className="login-btn" onClick={() => setModalActive(true)}>
                                {langArr["login-btn"][language]}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='footerReg'>
                <div className='container'>
                    <div className="logo">
                        <img src={logoReg} alt="Logo" />
                    </div>
                    <div className="language">
                        <select className='select' value={language} onChange={handleLanguageChange}>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </div>
            <ModalReg
                active={modalActive}
                setActive={setModalActive}
                pin={pin}
                setPin={setPin}
                handlePinSubmit={handlePinSubmit}
            />
        </div>
    );
}

export default MainReg;
