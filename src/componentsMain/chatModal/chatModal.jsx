import React, { useState, useRef } from 'react';
import "./chatModal.css";
import chat from './../img/Robot.png';
import clip from './../img/clip.png';
import findChat from './../img/findChat.png';
import oflineA from './../img/ofline.png';
import sendChat from './../img/tg.png'; 

const ChatModal = ({ active, setActive }) => {
    const [message, setMessage] = useState('');
    const [containerHeight, setContainerHeight] = useState(40); // Начальная высота 40px
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            console.log("Сообщение отправлено:", message);
            setMessage('');
            resetHeight();
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        adjustHeight();
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Сбрасываем высоту
            const newHeight = Math.min(textarea.scrollHeight, 75); // Максимальная высота текстовой области
            textarea.style.height = `${newHeight}px`; // Устанавливаем высоту текстовой области
            setContainerHeight(newHeight + 5); // Обновляем высоту родительского контейнера
        }
    };

    const resetHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Сбрасываем высоту
            setContainerHeight(40); // Сбрасываем высоту контейнера на 40px
        }
    };

    return (
        <div className={active ? "chatModal active" : "chatModal"} onClick={() => setActive(false)}>
            <div className={active ? "chatModalContent active" : "chatModalContent"} onClick={e => e.stopPropagation()}>
                <div className="topContainer">
                    <div className="leftContainer">
                        <img src={oflineA} alt="Offline" />
                        <span>CHelp</span>
                    </div>
                    <div className="rightContainer">
                        <button className="findChatButton">
                            <img src={findChat} alt="Find Chat" />
                        </button>
                    </div>
                </div>
                
                <div className="ChatContainerM">
                    <button className="chatButton" onClick={() => setActive(false)}>
                        <img src={chat} alt="Чат" />
                    </button>
                </div>

                <div className="inputContainer" style={{ height: `${containerHeight}px` }}>
                    <textarea 
                        ref={textareaRef}
                        value={message} 
                        onChange={handleChange} 
                        placeholder="Cообщение..." 
                        className="messageInput"
                        rows="1"
                    />
                    <button className="clipButton">
                        <img src={clip} alt="Прикрепить" />
                    </button>
                    <button className="sendButton" onClick={handleSend}>
                        <img src={sendChat} alt="Отправить" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatModal;