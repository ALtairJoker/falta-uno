import React from 'react'
import { useState, useEffect } from "react";
import datos from './chile.json';

function Locaciones({register}) {

    const [locaciones, setLocaciones] = useState([]);
    const [regionSeleccionada, setRegionSeleccionada] = useState("");
    const [comunas, setComunas] = useState([]);

    
    useEffect(() => {
      setLocaciones(datos.regions); // Usar el contenido del archivo JSON importado
    }, []);

  const handleChangeRegion = (e) => {
    const region = e.target.value;
    setRegionSeleccionada(region);

    // Filtrar las comunas correspondientes a la región seleccionada
    const regionSeleccionadaData = locaciones.find(
      (locacion) => locacion.name === region
    );
    const comunasDeRegionSeleccionada = regionSeleccionadaData
      ? regionSeleccionadaData.communes
      : [];
    setComunas(comunasDeRegionSeleccionada);
  };
  

  return (
    <div className="contenedor-selects">
    <label>
      {" "}
      Region
      <select
        {...register('region', {
          required: true
        })}
        value={regionSeleccionada}
        onChange={handleChangeRegion}
        className="selects p-2"
        
      >
        <option hidden selected>
          Seleccione una region
        </option>
        {locaciones.map((locacion) => (
          <option value={locacion.name} key={locacion.name}>
            {locacion.name}
          </option>
        ))}
      </select>
    </label>
    <label>
      {" "}
      Comuna
      <select className="selects p-2" {...register('comuna', {
          required: true
        })}>
        <option hidden selected>
          Seleccione su comuna
        </option>
        {comunas.map((comuna) => (
          <option value={comuna.name} key={comuna.name}>
            {comuna.name}
          </option>
        ))}
      </select>
    </label>
  </div>
  )
}

export default Locaciones