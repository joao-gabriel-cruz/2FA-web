import { Authenticated } from "../navigation/authenticated";
import { NotAuthenticated } from "../navigation/not-authenticated"
import { AuthService } from "../store/auth/auth.service"

export const Auth = () => {
  const { auth } = AuthService()

  return (
    <div>
     {!auth.data.authenticated ? <NotAuthenticated /> : <Authenticated />}
    </div>
  )
} 