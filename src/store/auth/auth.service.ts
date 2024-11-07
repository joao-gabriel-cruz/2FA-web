import { useAtom } from "jotai";
import { authAtom } from "./auth.module";
import { api } from "../../api";
import { toast } from "react-toastify";

export const AuthService = () => {
  const [auth, setAuth] = useAtom(authAtom);


  const signIn = async (email: string, password: string) => {
    try {
      setAuth({
        ...auth,
        status: "loading",
      });

     await api.post("/auth/login", {
        email,
        password,
     })
     return true
    } catch (e) {
      toast.error("Erro ao fazer login");
    }
  }

  const validadeCode = async (code: string) => {
    try {
      setAuth({
        ...auth,
        status: "loading",
      });

    const {data} =  await api.post("/auth/validate", {
        code,
      })
      
      return data.token
    } catch (e) {
      toast.error("Erro ao validar código");
      setAuth({
        ...auth,
        status: "error",
      });
    } 
  }

  return {
    auth,
    signIn,
    validadeCode,
    setAuth
  }
}