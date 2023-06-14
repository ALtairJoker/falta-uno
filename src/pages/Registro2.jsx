import React from "react";
import "./css/registro.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loaders from '../components/Loaders'



function Registro2() {
  const location = useLocation();
  const usuario = location.state.usuario;

  const navigate = useNavigate();

  const {register, formState: {errors} ,handleSubmit, setValue } = useForm();
  const [posicionesSeleccionadas, setPosicionesSeleccionadas] = useState([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);


  const onSubmit = async (data) => {
    Object.assign(usuario, data);
    usuario.posiciones = JSON.stringify(posicionesSeleccionadas);
    usuario.diasDisponibles = JSON.stringify(diasSeleccionados);
    const formData = new FormData();
    Object.entries(usuario).forEach(([key, value]) => {
      if (key === "fotoPerfil") {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    const urlServer = "https://server-falta-uno.vercel.app";
    const endpoint = "/jugadores";
    
  
    try {
      await axios.post(urlServer + endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setRegistroExitoso(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/inicio"); // Redirigir a la página de inicio después de 3 segundos
      }, 2000);

    } catch (error) {
      setLoading(false);
      alert("Algo salió mal ...");
      console.log(error);
    }
 }


 

  return (
    <div className="contenedor-principal">
      {loading ? (
        <Loaders />
      ) : (
        <form className="contenedor-registro" onSubmit={handleSubmit(onSubmit)}>
          {registroExitoso ? (
            <h2>El usuario se registró correctamente.</h2>
          ) : (
            <>
        <h2>Registrar</h2>
        <div className="posiciones">
          <h4 className="m-3">
            Selecciona las posiciones donde te gustaria jugar
          </h4>
          <Form>
            <div key={`inline-checkbox`} className="mb-3">
              {['Portero', 'Defensa', 'Lateral', 'Mediocampista', 'Delantero'].map((posicion) => (
                <Form.Check
                  key={posicion}
                  inline
                  label={posicion}
                  name={posicion}
                  type="checkbox"
                  id={posicion}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPosicionesSeleccionadas([...posicionesSeleccionadas, posicion]);
                    } else {
                      setPosicionesSeleccionadas(posicionesSeleccionadas.filter((p) => p !== posicion));
                    }
                  }}
                />
              ))}
            </div>
            <div className="container">
              <label className="label">
                Dorsal Preferido
                <input
                  className="input1Number"
                  name="text"
                  type="number"
                  required=""
                  min="1"
                  max="99"
                  {...register('dorsal', {
                    required: true
                  })}
                ></input>
              </label>
            </div>
          </Form>
        </div>
        <div className="dias">
          <h4 className="m-3">Selecciona los dias disponibles</h4>
          <Form>
          <div key={`inline-checkbox`} className="mb-3">
            {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map((dia) => (
              <Form.Check
                key={dia}
                inline
                label={dia}
                name={dia}
                type="checkbox"
                id={dia}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDiasSeleccionados([...diasSeleccionados, dia]);
                  } else {
                    setDiasSeleccionados(diasSeleccionados.filter((d) => d !== dia));
                  }
                }}
              />
            ))}
          </div>
          </Form>
        </div>
        <input type="submit" class="btn1 mb-5" value="Registrar" ></input>
        </>
        )}
      </form>
      )}
    </div>
  );
}

export default Registro2;
