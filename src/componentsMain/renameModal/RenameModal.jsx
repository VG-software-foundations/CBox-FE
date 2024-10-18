import React, { useState } from 'react';
import "./RenameModal.css"; // Добавьте стили для модального окна

const RenameModal = ({ active, setActive, file, onRenameFile }) => {
  const [newName, setNewName] = useState(file ? file.name : '');

  const handleRenameSubmit = () => {
    if (newName && file) {
      onRenameFile(file, newName); // Сохраняем новое имя файла
      setActive(false); // Закрываем модальное окно
    }
  };

  return (
    <div className={active ? "renameModal active" : "renameModal"} onClick={() => setActive(false)}>
      <div className="renameModalContent" onClick={(e) => e.stopPropagation()}>
        <h3>Переименовать файл</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleRenameSubmit(); // Подтверждение нового имени по Enter
            }
          }}
        />
        <div className="buttonsContainer">
          <button onClick={handleRenameSubmit}>Сохранить</button>
          <button onClick={() => setActive(false)}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
