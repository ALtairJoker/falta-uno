import React from 'react'
import "./css/landing.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

  return (
    <div className="contenedor-principal">
        <div className="contenedor-header pt-1">
        <h2 className="h1-animation-iz p-2">¿Te falta un jugador en tu equipo?</h2>
        <br />
        <h3 className="h2-animation-de p-2 pb-3">
          En <span className="faltaUno">FALTA-UNO</span> encontraras lo que
          estas buscando
        </h3>
        <button className='botonLanding' onClick={() => {navigate("/inicio")}}>ME FALTA UNO</button>
        
      </div>
      <button class="btn2 mt-5" onClick={() => {navigate("/about")}}>Mas información</button>
    </div>
  )
}

export default LandingPage