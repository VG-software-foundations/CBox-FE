import React, { useState, useRef, useContext } from 'react';
import './chatModal.css';
import chat from './../img/Robot.png';
import clip from './../img/clip.png';
import findChat from './../img/findChat.png';
import oflineA from './../img/ofline.png';
import sendChat from './../img/tg.png';
import css from './../img/file-css.png';
import doc from './../img/file-doc.png';
import pdf from './../img/file-pdf.png';
import txt from './../img/file-txt.png';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedMessages, setHighlightedMessages] = useState([]);
    const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
    const messageRefs = useRef([]);

    const truncateFileName = (name) => {
        return name.length > 15 ? name.substring(0, 15) + '...' : name;
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setHighlightedMessages([]);
            setCurrentHighlightIndex(0);
            return;
        }

        const results = publicChats
            .map((chat, index) => {
                const messageMatch = chat.message.includes(searchQuery);
                const fileMatch = chat.attachments?.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

                return messageMatch || fileMatch ? index : null;
            })
            .filter((index) => index !== null);

        setHighlightedMessages(results);
        setCurrentHighlightIndex(0); 
    };

    const handleSend = () => {
        if (message.trim() || attachments.length > 0) {
            const chatMessage = {
                senderName: 'CBox',
                message: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'MESSAGE',
                attachments: attachments.map((file) => ({
                    url: URL.createObjectURL(file),
                    name: file.name
                }))
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
        const files = Array.from(e.target.files);
        setAttachments((prev) => [...prev, ...files]);
        e.target.value = null;
    };

    const renderAttachmentPreviews = () => {
        return attachments.map((file, index) => {
            let icon;
            if (file.name.endsWith('.txt')) icon = txt;
            else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) icon = doc;
            else if (file.name.endsWith('.pdf')) icon = pdf;
            else if (file.name.endsWith('.css')) icon = css;
            else icon = file; 

            return (
                <div key={index} className="attachmentPreview">
                    <img src={typeof icon === 'string' ? icon : URL.createObjectURL(icon)} alt="file-preview" className="filePreview" />
                    <span>{truncateFileName(file.name)}</span>
                </div>
            );
        });
    };

    const scrollToMessage = (index) => {
        const messageElement = messageRefs.current[index];
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleNextMatch = () => {
        if (highlightedMessages.length === 0) return;
        const nextIndex = (currentHighlightIndex + 1) % highlightedMessages.length;
        setCurrentHighlightIndex(nextIndex);
        scrollToMessage(highlightedMessages[nextIndex]);
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
                    {highlightedMessages.length > 0 && (
                    <div className="navigationButtons">
                        <button className="nextMatchButton" onClick={handleNextMatch}>
                            Next Match
                        </button>
                    </div>
                )}
                        <div className="searchContainer">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search messages..."
                                className="searchInput"
                            />
                        </div>
                        <button className="findChatButton" onClick={handleSearch}>
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
                        <div
                            key={index}
                            ref={(el) => (messageRefs.current[index] = el)} 
                            className={`message ${chat.senderName === 'CBox' ? 'self' : 'other'} ${
                                highlightedMessages.includes(index) ? 'highlighted' : ''
                            }`}
                        >
                            <div className="sender">{chat.senderName}</div>
                            <div className="messageContent">
                                <div className="text">{chat.message}</div>
                                <div className="timestamp">{chat.timestamp}</div>
                                {chat.attachments && chat.attachments.length > 0 && (
                                    <div className="attachments">
                                        {chat.attachments.map((file, i) => {
                                            let icon;
                                            if (file.name.endsWith('.txt')) icon = txt;
                                            else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) icon = doc;
                                            else if (file.name.endsWith('.pdf')) icon = pdf;
                                            else if (file.name.endsWith('.css')) icon = css;
                                            else icon = file.url;

                                            return (
                                                <div
                                                    key={i}
                                                    className="attachment"
                                                    onDoubleClick={() => window.open(file.url, '_blank')}
                                                >
                                                    <img src={icon} alt="attachment" className="attachmentImage" />
                                                    <span>{truncateFileName(file.name)}</span>
                                                </div>
                                            );
                                        })}
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
