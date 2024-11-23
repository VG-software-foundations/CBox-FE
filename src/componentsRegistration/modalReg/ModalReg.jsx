import './ModalReg.css';

function ModalReg({ active, setActive, pin, setPin, handlePinSubmit }) {
    return (
        <div className={`modalReg ${active ? 'active' : ''}`}>
            <div className={`modalRegContent ${active ? 'active' : ''}`}>
                <h3>Введите PIN-код</h3>
                <input
                    type="text"
                    placeholder="PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
                <div className="buttonsContainer">
                    <button onClick={handlePinSubmit}>Войти</button>
                    <button onClick={() => setActive(false)}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default ModalReg;
