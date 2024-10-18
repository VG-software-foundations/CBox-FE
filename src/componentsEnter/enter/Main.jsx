import './Main.css';
import { useNavigate } from 'react-router-dom';
import google from './../img/images/flat-color-icons_google@2x.jpg';
import face from './../img/images/Vector.png';
import logoMain from './../img/images/Logo.png';
import languMain from './../img/images/lang.png';

function Main() {
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

  return (
    <div className='backM'>
      <div className="containerMainM">
        <div className="login-boxM">
          <div className="choiceM">
            <h2 className="login-title-enterM activeM">Вход</h2>
            <h2 className="login-title-registrationM passiveM" onClick={() => navigate('/registration')}>Регистрация</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-groupM">
              <label htmlFor="email">Электронная почта:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="input-groupM">
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="inPutM">
              <button type="submit" className="login-btnM">Войти</button>
            </div>
          </form>
          <div className="social-loginM">
            <p>Авторизация через социальные сети</p>
            <div className="social-iconsM">
              <div className="google">
                <img src={google} alt="Google Login" />
              </div>
              <div className="facebook">
                <img src={face} alt="Facebook Login" />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="footer">
        <div className="container">
            <div className="logo">
            <img src={logoMain}></img>
            </div><div className="language">
            <img src={languMain}></img>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Main;
