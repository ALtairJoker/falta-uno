import React from 'react'
import Context from '../../Context';
import { useState, useContext, useEffect } from "react";
import "./css/home.css";

function Home() {
  const { usuario } = useContext(Context);

  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    obtenerJugadores();
  }, []);

  const obtenerJugadores = async () => {
    try {
      const response = await fetch('http://localhost:3000/jugadores');
      const data = await response.json();
      setJugadores(data.result);
      console.log(jugadores);
    } catch (error) {
      console.log(error);
    }
  };

  const fechaNacimiento = new Date(usuario.nacimiento);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Verificar si ya ha pasado el cumpleaños de este año
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

    // Verificar si es el día de cumpleaños
    const esCumpleaños = fechaActual.getMonth() === fechaNacimiento.getMonth() &&
    fechaActual.getDate() === fechaNacimiento.getDate();



  return (
    <div className='contenedor-principal'>
      <div className='orden'>
        <div className='jugadorUsuario '>
          <h3>Bienvenido</h3>
          <h2 className='nombreUsuario'>{(usuario.usuario).charAt(0).toUpperCase() + (usuario.usuario).slice(1)} {usuario.dorsal}</h2>
          <img src={`data:image/jpeg;base64,${usuario.foto_perfil}`} alt="" className='imagenUsuario' />
          <h3 className='mt-1'>
              {usuario.posiciones.map((posicion, index) => (
                <span key={posicion.codigo}>
                  {posicion.codigo}
                  {index < usuario.posiciones.length - 1 && " -"} {/* Agrega el guion si no es el último elemento */}
                </span>
              ))}
            </h3>
            <h4>Edad: {edad}</h4> {/* Agrega la edad del usuario */}
            {esCumpleaños && (
            <h4 className='nombreUsuario'>¡Feliz cumpleaños!</h4>
          )}
        </div>
        <div >
          <h2>Jugadores</h2>
          <div className='jugadores' >
          {jugadores.map((jugador) => (
            <div key={jugador.id} >
              <h2>{jugador.nombre} {jugador.apellido}</h2>
              <img src={`data:image/jpeg;base64,${jugador.foto_perfil}`} alt="" className='imagenUsuario' />
              {/* Mostrar otros datos del jugador */}
            </div>
          ))}
        </div>
        </div>
      </div>
      
      
   </div>
  )
}

export default Home