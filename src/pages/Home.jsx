import React from 'react';
import Context from '../../Context';
import { useState, useContext, useEffect } from 'react';
import './css/home.css';
import Loaders from '../components/Loaders'
import Locaciones from '../components/Locaciones';
import Cards from '../components/Cards';
import {useForm} from 'react-hook-form'

function Home() {
  const { usuario } = useContext(Context);

  const {register, formState: {errors} ,handleSubmit, setValue, watch  } = useForm();

  const [jugadores, setJugadores] = useState([]);
  const [total, setTotal] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerJugadores();
  }, []);

  const obtenerJugadores = async () => {
    try {
      setCargando(true);
      const response = await fetch('http://localhost:3000/jugadores');
      const data = await response.json();
      console.log(data);
      setTotal(data.totalJugadores)
      setJugadores(data.result);

    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };
  console.log(jugadores);

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
  const esCumpleaños =
    fechaActual.getMonth() === fechaNacimiento.getMonth() &&
    fechaActual.getDate() === fechaNacimiento.getDate();

  return (
    <div className='contenedor-principal'>
      <div className='orden mt-5'>
        <div >
          <div className='jugadorUsuario '>
          <h3>Bienvenido</h3>
          <h2 className='nombreUsuario'>{`${usuario.usuario.charAt(0).toUpperCase()}${usuario.usuario.slice(1)}`} {usuario.dorsal}</h2>
          <img src={`data:image/jpeg;base64,${usuario.foto_perfil}`} alt='' className='imagenUsuario' />
          <h3 className='mt-1'>
            {usuario.posiciones.map((posicion, index) => (
              <span key={posicion.codigo}>
                {posicion.codigo}
                {index < usuario.posiciones.length - 1 && ' -'}
              </span>
            ))}
          </h3>
          <h4>Edad: {edad}</h4>
          {esCumpleaños && <h4 className='nombreUsuario'>¡Feliz cumpleaños!</h4>}
          </div>
          <div className='mt-5 jugadorUsuario'>
            <p>PT = Portero</p>
            <p>DC = Defensa</p>
            <p>LT = Lateral</p>
            <p>MC = Mediocampista</p>
            <p>DL = Delantero</p>
        </div>
        </div>
       
        <div className='contenedorJugadores'>
          <p>Jugadores totales en el pais: {total}</p>
              <h2>Buscar jugadores por comuna</h2>             
          <Locaciones register={register}/>
          <button>Buscar</button>
          {cargando ? (
            <Loaders />
          ) : (
            <div className='jugadores mt-3'>
              {jugadores.map((jugador) => (
                <Cards 
                image={`data:image/jpeg;base64,${jugador.foto_perfil}`}
                usuario={jugador.usuario}
                dorsal={jugador.dorsal}
                nacimiento={jugador.nacimiento}
                posiciones={jugador.posiciones}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
