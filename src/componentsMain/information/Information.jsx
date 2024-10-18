import "./Information.css";
import copyImg from './../img/copy.png';
import inComp from './../img/inComp.png';
import musorMini from './../img/musorMini.png';
import openImg from './../img/open.png';
import renameImg from './../img/rename.png';

const Information = ({ active, setActive, file, onOpenFile, onCopyFile }) => {
  return (
    <div className={active ? "modalInf active" : "modalInf"} onClick={() => setActive(false)}>
      <div className={active ? "modalInfContant active" : "modalInfContant"} onClick={e => e.stopPropagation()}>
        <div className="containerOp">
          <button className="openButton" onClick={() => onOpenFile(file)}>
            <img src={openImg} alt="Открыть" /> Открыть
          </button>
        </div>
        <div className="containerObsh">
          <button className="inButton">
            <img src={inComp} alt="Скачать" /> Скачать
          </button>
          <button className="renameButton">
            <img src={renameImg} alt="Переименовать" /> Переименовать
          </button>
          <button className="copyButton" onClick={() => onCopyFile(file)}>
            <img src={copyImg} alt="Сделать копию" /> Сделать копию
          </button>
        </div>
        <button className="delButton">
          <img src={musorMini} alt="Удалить" /> Удалить
        </button>
      </div>
    </div>
  );
}

export default Information;
