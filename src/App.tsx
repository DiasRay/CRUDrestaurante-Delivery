import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import FormRestaurante from './components/restaurantes/formrestaurante/FormRestaurante'
import DeletarRestaurante from './components/restaurantes/deletarrestaurante/DeletarRestaurante'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ListaRestaurantes from './components/restaurantes/listaRestaurante/ListarRestaurante'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
      <ToastContainer />
        <BrowserRouter>
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/home' element={<ListaRestaurantes />}/>

              {/* link restaurantes */}
              <Route path="/restaurantes" element={<ListaRestaurantes />} /> 
              <Route path="/cadastrarrestaurante" element={<FormRestaurante />} />
              <Route path="/deletarrestaurante/:id" element={<DeletarRestaurante />} />
              <Route path="/editarrestaurante/:id" element={<FormRestaurante />} />
              {/* link restaurantes */}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
