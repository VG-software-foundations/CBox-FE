import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg';
import face from './../img/images/Vector.png';
import logoReg from './../img/images/Logo.png';
import { LanguageContext } from './../../lang';
import './MainReg.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

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
};

function MainReg() {
    const navigate = useNavigate();
    const { language, changeLanguage } = useContext(LanguageContext);
    const { loginWithRedirect, getIdTokenSilently } = useAuth0();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        changeLanguage(selectedLang); 
    };

    const handleFormRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const response = await axios.post('YOUR_SERVER_URL/auth/register', {
                email,
                password,
            });

            localStorage.setItem('jwt_token', response.data.token);
            navigate('/profil'); 
        } catch (err) {
            console.error(err);
            setError(err.message || "Ошибка регистрации. Попробуйте снова.");
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await loginWithRedirect({ screen_hint: 'signup' });
        } catch (err) {
            console.error('Ошибка при авторизации через Google', err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const token = await getIdTokenSilently();
            const response = await axios.post('YOUR_SERVER_URL/auth/google-login', {
                token,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            localStorage.setItem('jwt_token', response.data.token);
            navigate('/profil'); 
        } catch (error) {
            console.error('Ошибка при авторизации через Google', error);
        }
    };
    
    useEffect(() => {
        const { search } = window.location;
        if (search.includes('code=')) {
            handleGoogleLogin(); 
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
                            <button type="submit" className="login-btn">
                                {langArr["login-btn"][language]}
                            </button>
                        </div>
                    </form>
                    <div className="social-login">
                        <p>{langArr["social-login"][language]}</p>
                        <div className="social-icons">
                            <button type='button' className="google" onClick={handleGoogleSignup}>
                                <img src={google} alt="Google Login" />
                            </button>
                            <div className="facebook">
                                <img src={face} alt="Facebook Login" />
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}

export default MainReg;
