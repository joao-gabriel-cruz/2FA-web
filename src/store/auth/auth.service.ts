import { useAtom } from "jotai"
import { toast } from "react-toastify"
import { api } from "../../api"
import { authAtom } from "./auth.module"

export const AuthService = () => {
	const [auth, setAuth] = useAtom(authAtom)

	console.log({ auth })

	const signIn = async (email: string, password: string) => {
		try {
			setAuth({
				...auth,
				status: "loading",
			})

			await api.post("/auth/login", {
				email,
				password,
			})
			return true
		} catch (e) {
			toast.error("Erro ao fazer login")
		}
	}

	const faceId = async (email: string, img: File) => {
		const formData = new FormData()
		formData.append("file", img)
		try {
			setAuth({
				...auth,
				status: "loading",
			})

			const user = await api.get(`/user/email/${email}`)
			const recog = await api.post(`/faceid/recog/${user.data.id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			if (recog.data.statusCode === 404) {
				toast.error("Usuário não encontrado")
			}
			console.log({ recog }, img, formData.getAll("file"), user.data)

			if (recog.data.statusCode === 500) {
				toast.error("Erro ao fazer reconhecimento facial")
				return false
			}

			if (recog.data.statusCode === 200) {
				setAuth({
					...auth,
					status: "success",
					data: {
						authenticated: true,
						token: recog.data.token,
					},
				})
				return true
			}
			return false
		} catch (e) {
			toast.error("Erro ao fazer login")
		}
	}

	const validadeCode = async (code: string) => {
		try {
			setAuth({
				...auth,
				status: "loading",
			})

			const { data } = await api.post("/auth/validate", {
				code,
			})

			return data.token
		} catch (e) {
			toast.error("Erro ao validar código")
			setAuth({
				...auth,
				status: "error",
			})
		}
	}

	return {
		auth,
		signIn,
		validadeCode,
		setAuth,
		faceId,
	}
}
