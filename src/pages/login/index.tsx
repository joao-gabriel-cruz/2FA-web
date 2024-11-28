import { useAtom } from "jotai"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { authAtom } from "../../store/auth/auth.module"
import { AuthService } from "../../store/auth/auth.service"
import "./style.css"

export const Login = () => {
	const [screen, setScreen] = useState<"login" | "faceid">("login")
	const [faceImg, setFaceImg] = useState<File | null>(null)
	const [auth] = useAtom(authAtom)

	const [credentials, setCredentials] = useState({
		email: "joao@gabriel.com",
		password: "hfkg",
	})

	const navigate = useNavigate()

	const { signIn, faceId } = AuthService()

	const validateFaceId = async () => {
		if (!faceImg) {
			return toast.error("Por favor, insira uma imagem")
		}

		if (!credentials.email) {
			return toast.error("Por favor, insira um email")
		}

		const res = await faceId(credentials.email, faceImg)
		console.log({ res })
		if (res) {
			return navigate("/")
		}
	}

	const validateForm = async () => {
		if (await signIn(credentials.email, credentials.password)) {
			return navigate("/validate-code")
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
				<div
					style={{
						display: "flex",
						gap: "2rem",
						margin: "0 0 3rem 0",
					}}
				>
					<p
						style={{
							color: screen === "login" ? "#000" : "#ccc",
							cursor: "pointer",
						}}
						onClick={() => setScreen("login")}
					>
						Login
					</p>
					<p
						style={{
							color: screen === "faceid" ? "#000" : "#ccc",
							cursor: "pointer",
						}}
						onClick={() => setScreen("faceid")}
					>
						FaceID
					</p>
				</div>
				{screen === "login" ? (
					<form id="loginForm">
						<h2>LOGIN</h2>
						<p>Por favor, insira suas credenciais para acessar sua conta.</p>

						<div className="form-group">
							<label>Email</label>
							<input
								onChange={(e) =>
									setCredentials({ ...credentials, email: e.target.value })
								}
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								required
							/>
						</div>

						<div className="form-group">
							<label>Senha</label>
							<input
								onChange={(e) =>
									setCredentials({ ...credentials, password: e.target.value })
								}
								type="password"
								id="password"
								name="password"
								placeholder="Senha"
								required
							/>
							<span className="error-message" id="passwordError"></span>
						</div>

						<button type="button" className="button" onClick={validateForm}>
							Entrar
						</button>
						<Link to={"/register"} className="register-link">
							Cadastrar
						</Link>
						<div className="additional-options">
							<a href="#">Esqueci minha senha</a>
						</div>
						<p id="loginError" className="error-message"></p>
					</form>
				) : (
					<form id="loginForm">
						<h2>Face ID</h2>
						<p>Use uma imagem do seu rosto para dizer que é você mesmo</p>

						<div className="form-group">
							<label>Email</label>
							<input
								onChange={(e) =>
									setCredentials({ ...credentials, email: e.target.value })
								}
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								required
							/>
						</div>

						<div className="form-group">
							<label>Seu rosto</label>
							<input
								onChange={(e) =>
									setFaceImg(e.target.files ? e.target.files[0] : null)
								}
								type="file"
								id="password"
								name="password"
								placeholder="Senha"
								required
							/>
							<span className="error-message" id="passwordError"></span>
						</div>

						<button
							type="button"
							className="button"
							onClick={validateFaceId}
							style={{
								opacity: !(auth.status === "loading") ? 1 : 0.5,
								cursor: !(auth.status === "loading") ? "pointer" : "not-allowed",
							}}
						>
							Entrar
						</button>
						<Link to={"/register"} className="register-link">
							Cadastrar
						</Link>
						<div className="additional-options">
							<a href="#">Esqueci minha senha</a>
						</div>
						<p id="loginError" className="error-message"></p>
					</form>
				)}
			</section>
		</main>
	)
}
