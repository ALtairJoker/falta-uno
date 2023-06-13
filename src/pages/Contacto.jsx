import React from "react";
import Context from "../../Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import "./css/contacto.css";
import { useNavigate } from "react-router-dom";

function Contacto() {
  const { jugadores } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const jugador = jugadores.filter((jugador) => jugador.id == id);


  return (
    <div className="contenedor-principal">
      <div className="contenedor-jugador m-4">
        <div className="contenedor-flex">
          <div>
            <h2 className="nombreUsuario">
              {jugador[0].usuario} {jugador[0].dorsal}
            </h2>
            <img
              src={`data:image/jpeg;base64,${jugador[0].foto_perfil}`}
              alt=""
              className="w-50 rounded "
            />
          </div>

          <div className="mt-5 p-3">
            <h4>Nombre: {`${jugador[0].nombre.charAt(0).toUpperCase()}${jugador[0].nombre.slice(1)}`}</h4>
            <h4>Nombre: {`${jugador[0].apellido.charAt(0).toUpperCase()}${jugador[0].apellido.slice(1)}`}</h4>
            <h4 className="border border-warning">Celular: {jugador[0].celular}</h4>
            <h4>Correo: {jugador[0].correo}</h4>
            <h4>Region: {jugador[0].region}</h4>
            <h4>Comuna: {jugador[0].comuna}</h4>
          </div>
          <div className="mt-5 border border-warning p-3">
            <h4>Posiciones:</h4>
            <h4 className="mt-1">
              {jugador[0].posiciones
                .filter(
                  (posicion, index, self) =>
                    self.findIndex((p) => p.nombre === posicion.nombre) ===
                    index
                )
                .map((posicion, index, arr) => (
                  <React.Fragment key={posicion.nombre}>
                    {posicion.nombre}
                    {index < arr.length - 1 && " - "}
                  </React.Fragment>
                ))}
            </h4>
            <h4 className="mt-5"> Días disponibles:</h4>
            <h4>
              {jugador[0].dias.map((dia, index) => (
                <span key={index}>
                  {dia}
                  {index < jugador[0].dias.length - 1 && " - "}
                </span>
              ))}
            </h4>
          </div>
        </div>
        <button className="btn1" onClick={() => navigate(`/home`)}>Volver</button>
      </div>
    </div>
  );
}

export default Contacto;
