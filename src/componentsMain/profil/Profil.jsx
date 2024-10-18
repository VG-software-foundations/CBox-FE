import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css';
import icon from './../img/Victor2.png';
import download from './../img/download.png';
import add from './../img/add.png';
import backet from './../img/musor.png';
import dock from './../img/dock.png';
import logoM from './../img/logo.png';
import findM from './../img/search.png';
import Information from "../information/Information";

function Profil() {
  const [modalActive, setModalActive] = useState(false);
  const [documents, setDocuments] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null); // Для хранения выбранного файла
  const [fileCounter, setFileCounter] = useState(1); // Счётчик для имен новых файлов
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prevDocs) => [...prevDocs, ...files]);
  };

  const handleCreateFile = () => {
    const newFile = {
      name: `Новый документ ${fileCounter}`, // Генерация названия
      type: 'text/plain',
    };
    setDocuments((prevDocs) => [...prevDocs, newFile]);
    setFileCounter((prevCounter) => prevCounter + 1);
    navigate('/editor');
  };

  const handleFileRightClick = (e, file) => {
    e.preventDefault(); 
    setSelectedFile(file); // Сохраняем выбранный файл
    setModalActive(true);  // Открываем модальное окно
  };

  const handleOpenFile = (file) => {
    // Логика для открытия файла, например, редирект в редактор
    navigate(`/editor?fileName=${file.name}`);
  };

  // New function to copy the selected file
  const handleCopyFile = (file) => {
    const copyFile = {
      name: `${file.name} - Copy`, // Генерация нового имени для копии
      type: file.type,
    };
    setDocuments((prevDocs) => [...prevDocs, copyFile]);
    setModalActive(false); // Закрываем модальное окно после копирования
  };

  const filteredDocuments = documents.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="profil">
      <div className="containerProfil">
        <button className="profButton">
          <img src={icon} alt="Профиль" /> Профиль
        </button>
        <button className="downButton" onClick={() => document.getElementById('fileInput').click()}>
          <img src={download} alt="Загрузить" /> Загрузить
        </button>
        <button className="addButton" onClick={handleCreateFile}>
          <img src={add} alt="Создать" /> Создать
        </button>
        <button className="backetButton">
          <img src={backet} alt="Корзина" /> Корзина
        </button>
      </div>
      
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Найти документы..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="findButton">
          <img src={findM} alt="Найти" />
        </button>
      </div>
      
      <div className="findAndScroll">
        <input
          id="fileInput"
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <div className="flexContainer">
          {filteredDocuments.map((file, index) => (
            <div 
              key={index} 
              className="card" 
              onContextMenu={(e) => handleFileRightClick(e, file)}
            >
              <img src={dock} alt="Иконка" style={{ width: '204px', height: '204px' }} />
              <h3>{file.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="logoM">
        <img src={logoM} alt="Логотип" />
      </div>

      {/* Передаем выбранный файл и функцию копирования в модальное окно */}
      <Information 
        active={modalActive} 
        setActive={setModalActive} 
        file={selectedFile} 
        onOpenFile={handleOpenFile} // Передаем функцию открытия файла
        onCopyFile={handleCopyFile} // Передаем функцию копирования файла
      />
    </div>
  );
}

export default Profil;
