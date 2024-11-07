import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "../pages/login"
import { Register } from "../pages/register/register"
import { ValidadeCode } from "../pages/validade-code"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }, 
  {
    path: "/validate-code",
    element: <ValidadeCode/>
  }
])


export const NotAuthenticated = () => {
  return <RouterProvider router={router} />
}