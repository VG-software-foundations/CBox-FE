import './MainReg.css'
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg'
import face from './../img/images/Vector.png'
import logoReg from './../img/images/Logo.png'
import lanReg from './../img/images/lang.png'

function MainReg(){
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      if (email === 'test@example.com' && password === 'password') {
        navigate('/profile');
      } else {
        alert('Неверные учетные данные');
      }
    };
    
    return(
        <div className='back'>
            <div className="containerMain">
                <div className="login-box">
                    <div className="choice">
                        <h2 className="login-title-enter active" onClick={() => navigate('/')}>Вход</h2>
                        <h2 className="login-title-registration passive">Регистрация</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Электронная почта:</label>
                            <input type="email" id="email" name="email" required></input>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" name="password" required></input>
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password">Подтвердите пароль:</label>
                            <input type="password" id="confirm-password" name="confirm-password" required></input>
                        </div>
                        <div className="inPut">
                            <button type="submit" className="login-btn">Зарегистрироваться</button>
                        </div>
                    </form>
                    <div className="social-login">
                        <p>Авторизация через социальные сети</p>
                        <div className="social-icons">
                            <div className="google">
                                <img src={google} alt="Google Login"></img>
                            </div>
                            <div className="facebook">
                                <img src={face} alt="Facebook Login"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footerReg'>
               <div className='container'>
               <div className="logo">
            <img src={logoReg}></img>
            </div><div className="language">
            <img src={lanReg}></img>
            </div>
               </div>
            </div>
        </div>
    )
}

export default MainReg;
