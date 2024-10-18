import './MainReg.css'

import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg'
import face from './../img/images/Vector.png'

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
            <form action="#" method="post">
                <div className="input-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input type="email" id="email" name="email" required></input>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <div className="inPut">
                <button type="submit" className="login-btn">Войти</button>
                </div>
            </form>
            <div className="social-login">
                <p>Авторизация через социальные сети</p>
                </div>
                <div className="social-icons">
                <div className="google">
                <img src={google}></img>
                </div>
                <div className="facebook">
                <img src={face}></img>
                </div>
                </div>
            </div>
           
            
        </div>
    </div>
    )
}
export default MainReg;