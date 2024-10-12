import React, { useState } from 'react';
import './Profil.css'; // Подключаем стили
import icon from './../img/Victor2.png';
import download from './../img/download.png';
import add from './../img/add.png';
import backet from './../img/musor.png';
import dock from './../img/dock.png';
import logoM from './../img/logo.png';
import findM from './../img/search.png';

function Profil() {
  const [documents, setDocuments] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prevDocs) => [...prevDocs, ...files]);
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
        <button className="addButton">
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
          <div key={index} className="card">
            <img src={dock} alt="Иконка" style={{ width: '204px', height: '204px' }} />
            <h3>{file.name}</h3>
          </div>
        ))}
      </div>
      </div>

      <div className="logoM">
        <img src={logoM} alt="Логотип" />
      </div>
    </div>
  );
}

export default Profil;
