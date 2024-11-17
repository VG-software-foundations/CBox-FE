import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './../../lang';
import './Profil.css';
import icon from './../img/Victor2.png';
import download from './../img/download.png';
import add from './../img/add.png';
import backet from './../img/musor.png';
import dock from './../img/dock.png';
import logoM from './../img/logo.png';
import findM from './../img/search.png';
import chat from './../img/Robot.png';
import Information from "../information/Information";
import RenameModal from "../renameModal/RenameModal";
import ChatModal from "../chatModal/chatModal";

const langArrMain = {
    profile: {
        ru: "Профиль",
        en: "Profile",
    },
    upload: {
        ru: "Загрузить",
        en: "Upload",
    },
    create: {
        ru: "Создать",
        en: "Create",
    },
    trash: {
        ru: "Корзина",
        en: "Trash",
    },
    searchPlaceholder: {
        ru: "Найти документы...",
        en: "Find documents...",
    },
    newDocument: {
        ru: "Новый документ",
        en: "New Document",
    },
};

function Profil() {
    const [modalActive, setModalActive] = useState(false);
    const [renameModalActive, setRenameModalActive] = useState(false);
    const [modalActive2, setModalActive2] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileCounter, setFileCounter] = useState(1);
    const { language } = useContext(LanguageContext);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const sidebarRef = useRef(null); 

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState); 
    };

    const navigate = useNavigate();
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && sidebarVisible) {
                setSidebarVisible(false); 
            }
        };
        window.addEventListener('resize', handleResize);

        const handleClickOutside = (event) => {
            if (sidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.toggleButton')) {
                setSidebarVisible(false); 
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [sidebarVisible]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setDocuments((prevDocs) => [...prevDocs, ...files]);
    };

    const handleCreateFile = () => {
        const newFile = {
            name: `${langArrMain.newDocument[language]} ${fileCounter}`,
            type: 'text/plain',
        };
        setDocuments((prevDocs) => [...prevDocs, newFile]);
        setFileCounter((prevCounter) => prevCounter + 1);
        navigate('/editor');
    };

    const handleFileRightClick = (e, file) => {
        e.preventDefault();
        setSelectedFile(file);
        setModalActive(true);
    };

    const handleOpenFile = (file) => {
        navigate(`/editor?fileName=${file.name}`);
    };

    const handleCopyFile = (file) => {
        const copyFile = {
            name: `${file.name} - Copy`,
            type: file.type,
        };
        setDocuments((prevDocs) => [...prevDocs, copyFile]);
        setModalActive(false);
    };

    const handleRenameFile = (file, newName) => {
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc === file ? { ...doc, name: newName } : doc
            )
        );
        setRenameModalActive(false);
    };

    const filteredDocuments = (documents || []).filter((file) =>
        file?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="profil">
            <button 
                className="toggleButton"
                onClick={toggleSidebar}
            >
                <span>☰</span>
            </button>

            <div ref={sidebarRef} className={`containerProfil ${sidebarVisible ? 'show' : ''}`}>
                <button className="profButton">
                    <img src={icon} alt="Профиль" /> {langArrMain.profile[language]}
                </button>
                <button className="downButton" onClick={() => document.getElementById('fileInputProfil').click()}>
                    <img src={download} alt="Загрузить" /> {langArrMain.upload[language]}
                </button>
                <button className="addButton" onClick={handleCreateFile}>
                    <img src={add} alt="Создать" /> {langArrMain.create[language]}
                </button>
                <button className="backetButton">
                    <img src={backet} alt="Корзина" /> {langArrMain.trash[language]}
                </button>
            </div>

            <div className="searchContainer">
                <input
                    type="text"
                    className="searchInput"
                    placeholder={langArrMain.searchPlaceholder[language]}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="findButton">
                    <img src={findM} alt="Найти" />
                </button>
            </div>

            <div className="findAndScroll">
                <input
                    id="fileInputProfil"
                    type="file"
                    multiple
                    accept=".doc,.docx,.txt"
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

            <div className="ChatContainer">
                <button className="chatButton" onClick={() => setModalActive2(true)}>
                    <img src={chat} alt="Чат" />
                </button>
            </div>

            <div className="logoM">
                <img src={logoM} alt="Логотип" />
            </div>

            <Information
                active={modalActive}
                setActive={setModalActive}
                file={selectedFile}
                onOpenFile={handleOpenFile}
                onCopyFile={handleCopyFile}
                onRenameFile={() => setRenameModalActive(true)}
                key={language}
            />

            <RenameModal
                active={renameModalActive}
                setActive={setRenameModalActive}
                file={selectedFile}
                onRenameFile={handleRenameFile}
            />

            <ChatModal
                active={modalActive2}
                setActive={setModalActive2}
            />
        </div>
    );
}

export default Profil;
