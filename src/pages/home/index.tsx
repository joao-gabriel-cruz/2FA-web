// faça uma tela de home simples sem taiwlind

import { AuthService } from "../../store/auth/auth.service"

export const Home = () => {
  const { setAuth } = AuthService()
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    }}

    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f0f0f0',

        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#333',
          }}
        >
          Unifeso Authenticator
        </h1>
        <p
          style={{
            fontSize: '1rem',
          }}
        >
          Bem-vindo
        </p>

        <button
          onClick={() => setAuth({
            data: {
              authenticated: false,
              token: ""
            },
            status: 'success'
          })}
        >
          Sair
        </button>
      </div>

    </main>
  )
}