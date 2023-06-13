import React from 'react';
import Context from '../../Context';
import { useState, useContext, useEffect, useRef } from 'react';
import axios from "axios";
import './css/home.css';
import Loaders from '../components/Loaders'
import Locaciones from '../components/Locaciones';
import Cards from '../components/Cards';
import {useForm} from 'react-hook-form'

function Home() {
  const { usuario, token } = useContext(Context);

  const {register, formState: {errors} ,handleSubmit, setValue, watch  } = useForm();

  const [jugadores, setJugadores] = useState([]);
  const [total, setTotal] = useState('');
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);

  const [jugadoresPorPagina] = useState(9); // Cantidad de jugadores por página

  // Calcula el número total de páginas
const totalPages = Math.ceil(total / jugadoresPorPagina);

  useEffect(() => {
    obtenerJugadores();
  }, [paginaActual]);

  const obtenerJugadores = async () => {
    try {
      setCargando(true);
      const response = await axios.get('http://localhost:3000/jugadores', {
        headers: { Authorization: "Bearer " + token },
        params: { page: paginaActual }
      });
      const data = response.data; 
      setTotal(data.totalJugadores)
      setJugadores(data.result);

    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const seleccionarComuna = async (data) => {
    const userData = { ...data };
    const comunaSeleccionada = watch('comuna');
    userData.comuna = comunaSeleccionada;
  
    try {
      setCargando(true);
      const response = await axios.get(`http://localhost:3000/jugadores/${comunaSeleccionada}`, {
        headers: { Authorization: "Bearer " + token },
        params: { page: paginaActual }
      });
      const data = response.data;
      console.log(data);
      setJugadores(data);
    } catch (error) {
      console.log(error);
    }
  
    setCargando(false);
  };

  const avanzarPagina = () => {
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const retrocederPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
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
       
        <div className='contenedorJugadores mb-5'>
          <p>Jugadores totales en el pais: {total}</p>
              <h2>Buscar jugadores por comuna</h2>
              <form onSubmit={handleSubmit(seleccionarComuna)}>            
                <Locaciones register={register} />
                <input type="submit" class="btn1 mt-3 mb-5" value="Buscar"></input>
              </form> 
          
          {cargando ? (
            <Loaders />
          ) : (
            <div className='jugadores mt-3'>
              {jugadores.length === 0 ? (
                  <h2>No hay jugadores para la comuna seleccionada.</h2>
              ) : (
                jugadores.map((jugador) => (
                  <Cards 
                    image={`data:image/jpeg;base64,${jugador.foto_perfil}`}
                    usuario={jugador.usuario}
                    dorsal={jugador.dorsal}
                    nacimiento={jugador.nacimiento}
                    posiciones={jugador.posiciones}
                  />
                ))
              )}
            </div>
          )}
           <div className='paginacion m-4'>
                <i class='bx bxs-skip-previous-circle bx-lg bx-fade-left-hover' onClick={retrocederPagina} disabled={paginaActual === 1} ></i>
                <i class='bx bxs-skip-next-circle bx-lg bx-fade-right-hover' onClick={avanzarPagina} disabled={paginaActual >= totalPages}></i>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
