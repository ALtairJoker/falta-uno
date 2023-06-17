import './App.css'
import Inicio from './pages/Inicio';
import Context from '../Context';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Registro2 from './pages/Registro2';
import LandingPage from './pages/LandingPage';
import Contacto from './pages/Contacto';
import About from './pages/About';
import Perfil from './pages/Perfil';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navegation from './components/Navegation';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  

  /* const URL_SERVER = 'https://server-falta-uno.vercel.app'; */
  
  const URL_SERVER = 'http://localhost:5000';


  return (
    <div>
      <Context.Provider value={{ usuario, setUsuario, token, setToken, jugadores, setJugadores, URL_SERVER }} >
        <Router>
            <Navegation />
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro2" element={<Registro2 />} />
            <Route path="/about" element={<About />} />
            <Route path="/jugador/:id" element={<Contacto />} />
            <Route path="/perfil/" element={<Perfil />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
