import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [fileContent, setFileContent] = useState('');
    return (
        <FileContext.Provider value={{ fileContent, setFileContent }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => useContext(FileContext);
