import HeaderM from "../headerM/Header";
import "./MainM.css"
import Profil from "../profil/Profil";


function MainM() {
  return (
    <div className="mainM">
      <HeaderM/>
      <div className="profil">
        <Profil/>
      </div>
    </div>
  );
  
}

export default MainM;