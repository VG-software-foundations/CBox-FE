import RegFooter from "../registartionfooter/RegFooter";
import MainReg from "../registration/MainReg";
import './RegistrationWind.css';

function RegistrationWind(){ 
return(

    <div className="containerReg">
    <div className="AppEnter">
      <MainReg/>
      <RegFooter/> 
    </div>
    </div>

)
}
export default RegistrationWind;