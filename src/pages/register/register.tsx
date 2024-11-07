import './style.css'

export const Register = () => {
  return (
    <main className="flex items-center justify-between h-screen bg-gray-100">
      <section className="image-section">
        <img src="/telainicio.jpeg" className="background-image" alt="Register Background" />
        <div className="overlay">
          <div className="overlay-text">
            <p className="title">Cadastre-se no Unifeso Authenticator</p>
            <p className="subtitle">Sua plataforma de gerenciamento de Senhas e Tokens</p>
          </div>
        </div>
      </section>
      <section className="form-section">
        <form id="registerForm">
          <p className="description">Por favor, insira suas informações para criar uma conta.</p>
          <p id="error" className="error-message"></p>

          <label >Nome</label>
          <input type="text" id="name" placeholder="Nome Completo" />

          <label >Email</label>
          <input type="email" id="email" placeholder="Email" />

          <label >Senha</label>
          <input type="password" id="password" placeholder="Senha" />

          <label >Confirmar Senha</label>
          <input type="password" id="confirmPassword" placeholder="Confirme sua Senha" />

          <button type="submit" className="submit-button">Cadastrar</button>
          <div className="footer-link">
            <a href="/login">Já possui uma conta? Entre aqui</a>
          </div>
        </form>
      </section>
    </main>

  )
}