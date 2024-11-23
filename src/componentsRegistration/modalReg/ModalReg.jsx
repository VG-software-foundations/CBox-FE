import React, { useState } from 'react';
import './ModalReg.css';

const ModalReg = ({ active, setActive, pin, setPin, handlePinSubmit }) => {
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Разрешаем только цифры и ограничиваем длину до 4
        if (/^\d{0,4}$/.test(value)) {
            setPin(value);
        }
    };

    return (
        <div className={`modalReg ${active ? 'active' : ''}`}>
            <div className={`modalRegContent ${active ? 'active' : ''}`}>
                <h3>Введите PIN-код</h3>
                <input 
                    type="text" 
                    value={pin}
                    onChange={handleInputChange} 
                    placeholder="XXXX"
                    maxLength="4" 
                />
                <div className="buttonsContainer">
                    <button onClick={handlePinSubmit}>Enter</button>
                    <button onClick={() => setActive(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ModalReg;
