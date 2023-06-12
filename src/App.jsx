import './App.css'
import Inicio from './pages/Inicio';
import Context from '../Context';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Registro2 from './pages/Registro2';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navegation from './components/Navegation';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [usuario, setUsuario] = useState(null);

  
  const logout = () => setUsuario(null)

  return (
    <div>
      <Context.Provider value={{ usuario, setUsuario }} >
        <Router>
            <Navegation />
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro2" element={<Registro2 />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
