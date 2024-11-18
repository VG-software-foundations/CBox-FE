import React, { useState, useRef, useEffect, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './chatModal.css';
import chat from './../img/Robot.png';
import clip from './../img/clip.png';
import findChat from './../img/findChat.png';
import oflineA from './../img/ofline.png';
import sendChat from './../img/tg.png';
import { LanguageContext } from './../../lang';

const langChat = {
    typing: {
        ru: 'Введите сообщение',
        en: 'Type a message'
    },
};

const ChatModal = ({ active, setActive }) => {
    const { language } = useContext(LanguageContext);
    const [message, setMessage] = useState('');
    const [publicChats, setPublicChats] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [mockMode, setMockMode] = useState(true);
    const [attachments, setAttachments] = useState([]);
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (message.trim() || attachments.length > 0) {
            const chatMessage = {
                senderName: 'CBox',
                message: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'MESSAGE',
                attachments: attachments.map((file) => URL.createObjectURL(file))
            };

            if (mockMode) {
                setPublicChats((prevChats) => [...prevChats, chatMessage]);
            }

            setMessage('');
            setAttachments([]);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e) => {
        const files1 = Array.from(e.target.files);
        setAttachments((prev) => [...prev, ...files1]);
        e.target.value = null;
    };
    
    

    const renderAttachmentPreviews = () => {
        return attachments.map((file, index) => {
            const fileUrl = URL.createObjectURL(file);
            return (
                <div key={index} className="attachmentPreview">
                    <img src={fileUrl} alt="file-preview" className="filePreview" />
                    <span>{file.name}</span>
                </div>
            );
        });
    };

    return (
        <div className={active ? "chatModal active" : "chatModal"} onClick={() => setActive(false)}>
            <div className={active ? "chatModalContent active" : "chatModalContent"} onClick={(e) => e.stopPropagation()}>
                <div className="topContainer">
                    <div className="leftContainer">
                        <img src={oflineA} alt="Offline" />
                        <div className="chelp">CHelp</div>
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

                <div className="messagesContainer">
                    {publicChats.map((chat, index) => (
                        <div key={index} className={`message ${chat.senderName === 'CBox' ? 'self' : 'other'}`}>
                            <div className="sender">{chat.senderName}</div>
                            <div className="messageContent">
                                <div className="text">{chat.message}</div>
                                <div className="timestamp">{chat.timestamp}</div>
                                {chat.attachments && chat.attachments.length > 0 && (
                                    <div className="attachments">
                                        {chat.attachments.map((file, i) => (
                                            <div key={i} className="attachment">
                                                <img src={file} alt="attachment" className="attachmentImage" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="attachmentsContainer">
                    {renderAttachmentPreviews()}
                </div>

                <div className="inputContainer">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={langChat.typing[language]}
                        rows={1}
                        className="messageInput"
                    />
                    <input
                        type="file"
                        id="fileInputChat"
                        className="fileInput"
                        multiple
                        onChange={handleFileChange}
                    />
                    <button className="clipButton" onClick={() => document.getElementById('fileInputChat').click()}>
                        <img src={clip} alt="Attach" />
                    </button>
                    <button className="sendButton" onClick={handleSend}>
                        <img src={sendChat} alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
