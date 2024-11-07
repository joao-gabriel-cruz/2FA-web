import { ToastContainer } from 'react-toastify'
import { Auth } from './auth'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Auth />
      <ToastContainer />
    </>
  )
}

export default App
