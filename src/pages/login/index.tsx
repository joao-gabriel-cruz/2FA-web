
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AuthService } from "../../store/auth/auth.service";
import { useState } from "react";


export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "joao@gabriel.com",
    password: "hfkg",
  });

  const navigate = useNavigate();

  const { signIn } = AuthService();

  const validateForm = async () => {
    if (await signIn(credentials.email, credentials.password)) {
      return navigate("/validate-code");
    }
  }

  return (
    <main className="container">
      <section className="image-section">
        <img src="/telainicio.jpeg" alt="Login Background" className="background-image" />
        <div className="overlay">
          <div className="welcome-text">
            <h1>Bem-vindo ao Unifeso Authenticator</h1>
            <p>Sua plataforma de gerenciamento de Senhas e Tokens</p>
          </div>
        </div>
      </section>
      <section className="form-section">
        <form id="loginForm">
          <h2>LOGIN</h2>
          <p>Por favor, insira suas credenciais para acessar sua conta.</p>

          <div className="form-group">
            <label >Email</label>
            <input
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              type="email" id="email" name="email" placeholder="Email" required />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              type="password" id="password" name="password" placeholder="Senha" required />
            <span className="error-message" id="passwordError"></span>
          </div>

          <button 
            type="button"
            className="button"
            onClick={validateForm}
          >
            Entrar
          </button>
          <Link
            to={"/register"}
            className="register-link"
          >
            Cadastrar
          </Link>
          <div className="additional-options">
            <a href="#">Esqueci minha senha</a>
          </div>
          <p id="loginError" className="error-message"></p>
        </form>
      </section>
    </main>
  );
}