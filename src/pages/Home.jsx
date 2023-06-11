import React from 'react'
import Context from '../../Context';
import { useState, useContext } from "react";
import "./css/home.css";

function Home() {
  const { usuario } = useContext(Context);

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
        <div className='jugadorUsuario contenedor-form'>
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
        <div className='jugadores'>
          <h1>Jugadores</h1>
        </div>
      </div>
      
      
   </div>
  )
}

export default Home