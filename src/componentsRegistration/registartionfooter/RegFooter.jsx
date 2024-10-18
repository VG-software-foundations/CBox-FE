import './RegFooter.css'
import logo from './../img/images/Logo.png'
import langu from './../img/images/lang.png'

function RegFooter(){
return(
    <footer className="footer">
        <div className="container">
            <div className="logo">
            <img src={logo}></img>
            </div>
            <div className="language">
            <img src={langu}></img>
            </div>
        </div>
    </footer>
)
}
export default RegFooter;