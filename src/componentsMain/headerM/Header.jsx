import './Header.css'
import langu from './../img/Mars.png'
import massage from './../img/DinDin.png'
import exitImg from './../img/Ex.png'
import icon from './../img/Victor.png'


function Header(){
return(
    <headerM className="header">
        <div className="containerHeader">
        <button className="langButton">
        <img src={langu}></img>
        </button>
        <button className="massButton">
        <img src={massage}></img>
        </button>
        <button className="iconbutton">
        <img src={icon}></img>
        </button>
        <button className="exitIcon">
        <img src={exitImg}></img>
        </button>
        </div>
    </headerM>
)
}
export default Header;