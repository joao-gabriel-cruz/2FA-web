
import { useState } from "react";
import { AuthService } from "../../store/auth/auth.service";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../store/auth/auth.module";
// crie a página de validação de código
export const ValidadeCode = () => {
  const [code, setCode] = useState("");
const [auth, setAuth] = useAtom(authAtom)
  const { validadeCode } = AuthService()

  const navigate = useNavigate();

  const validateForm = async () => {
    try {
      const token = await validadeCode(code)
      setAuth({
        data: {
          token,
          authenticated: true
        },
        status: 'success'
      })
      navigate("/")
    } catch (error) {
      
    }
  }

  return (
    <main className="container">
      <section className="form-section">
        <div id="validateCodeForm">
          <h2>VALIDAR CÓDIGO</h2>
          <p>Por favor, insira o código de validação que foi enviado para o seu email.</p>

          <div className="form-group">
            <label >Código de validação</label>
            <input
              type="text" id="validateCode"
              onChange={(e) => setCode(e.target.value)}
              name="validateCode"
              placeholder="Código de validação"
              required
            />
          </div>

          <button
          type="button"
          onClick={validateForm}
            className="button">
            Validar
          </button>
        </div>
      </section>
    </main>
  )
}