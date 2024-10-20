import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru'); 

    useEffect(() => {
        const hash = window.location.hash.substr(1);
        if (hash && ['en', 'ru'].includes(hash)) {
            setLanguage(hash);
        }
    }, []);

    const changeLanguage = (newLang) => {
        setLanguage(newLang);
        window.location.hash = newLang;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children} 
        </LanguageContext.Provider>
    );
};
