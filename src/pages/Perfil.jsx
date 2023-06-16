import React from "react";
import Context from "../../Context";
import { useState, useContext } from "react";
import "./css/perfil.css";
import Locaciones from "../components/Locaciones";
import Loaders from "../components/Loaders";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const { usuario, setUsuario, token, URL_SERVER } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const id = usuario.id;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const resizeAndCompressImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600, // Anchura deseada (ajústala según tus necesidades)
        600, // Altura deseada (ajústala según tus necesidades)
        "JPEG", // Formato de imagen deseado (puedes cambiarlo según tus necesidades)
        70, // Calidad de compresión (ajústala según tus necesidades)
        0, // Rotación deseada (0 = sin rotación)
        (resizedImage) => {
          // Obtener la imagen redimensionada
          const img = new Image();
          img.src = resizedImage;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const maxSize = Math.max(img.width, img.height);
            const offsetX = (maxSize - img.width) / 2;
            const offsetY = (maxSize - img.height) / 2;
            canvas.width = maxSize;
            canvas.height = maxSize;
            ctx.drawImage(img, offsetX, offsetY);
            const croppedImage = canvas.toDataURL("image/jpeg");
            resolve(croppedImage);
          };
        },
        "base64" // Salida en base64 (puedes cambiarlo según tus necesidades)
      );
    });

  const cambiarDatos = async (data) => {

    setLoading(true); // Activa el estado de carga

    try {
      const formData = new FormData(); // Crea un objeto FormData para enviar los datos

      // Agrega los campos al objeto FormData
      formData.append("nombre", data.nombre);
      formData.append("apellido", data.apellido);
      formData.append("usuario", data.usuario);
      formData.append("correo", data.correo);
      formData.append("nacimiento", data.nacimiento);
      formData.append("celular", data.celular);
      formData.append("dorsal", data.dorsal);
      formData.append("region", data.region);
      formData.append("comuna", data.comuna);

      // Verifica si se seleccionó una nueva imagen
      if (data.fotoPerfil[0]) {
        const file = data.fotoPerfil[0]; // Obtiene el archivo de imagen seleccionado
        const resizedImage = await resizeAndCompressImage(file); // Realiza la compresión de la imagen
        const base64Image = resizedImage.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );
        formData.append("fotoPerfil", base64Image); // Agrega la imagen comprimida al objeto FormData
      } else {
        // Si no se seleccionó una nueva imagen, utiliza la foto de perfil existente
        formData.append("fotoPerfil", usuario.foto_perfil);
      }

      // Realiza la solicitud PUT al backend
      const response = await axios.put(`${URL_SERVER}/jugador/${id}`,formData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      // Verifica la respuesta del backend
      if (response.status === 200) {
        // Actualiza el estado del usuario con los nuevos datos
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          nombre: data.nombre,
          apellido: data.apellido,
          usuario: data.usuario,
          correo: data.correo,
          password: data.password,
          nacimiento: data.nacimiento,
          celular: data.celular,
          dorsal: data.dorsal,
          region: data.region,
          comuna: data.comuna,
        }));

        // Muestra una notificación o realiza alguna acción adicional si es necesario

        console.log("Datos actualizados correctamente");
      }
    } catch (error) {
      // Maneja los errores de la solicitud

      console.error("Error al actualizar los datos:", error);
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  /*   


  const cambiarCaracteristicas = async (data) => {

  }; */
  const eliminarPerfil = async () => {
    try {
      // Pregunta al usuario si está seguro de eliminar el perfil
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer."
      );

      if (confirmacion) {
        // Realiza la solicitud DELETE al backend
        const response = await axios.delete(`${URL_SERVER}/jugador/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });

        // Verifica la respuesta del backend
        if (response.status === 200) {
          // Realiza alguna acción adicional si es necesario
          alert("Perfil eliminado correctamente");
          console.log("Perfil eliminado correctamente");
          setUsuario(null);
          navigate("/");
        }
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error("Error al eliminar el perfil:", error);
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="ordenPerfil">
        <div className="jugadorPerfil">
          <h2 className="nombreUsuario">
            {`${usuario.usuario.charAt(0).toUpperCase()}${usuario.usuario.slice(
              1
            )}`}{" "}
            {usuario.dorsal}
          </h2>
          <img
            src={`data:image/jpeg;base64,${usuario.foto_perfil}`}
            alt=""
            className="imagenUsuario"
          />
          <p>{usuario.region}</p>
          <p>{usuario.comuna}</p>
          <h3 className="mt-1">
            {usuario.posiciones.map((posicion, index) => (
              <span key={posicion.codigo}>
                {posicion.codigo}
                {index < usuario.posiciones.length - 1 && " -"}
              </span>
            ))}
          </h3>
          <Button variant="danger" onClick={eliminarPerfil}>
            Eliminar perfil
          </Button>
        </div>
          <div>
            <form
              className="contenedor-registro-perfil"
              onSubmit={handleSubmit(cambiarDatos)}
            >
              {loading && <Loaders />}
              <h2>Editar Datos</h2>
              <div className="inputs">
                <div className="container1">
                  <input
                    className="input1"
                    type="text"
                    defaultValue={usuario.nombre}
                    {...register("nombre", {
                      required: true,
                    })}
                  ></input>
                  {errors.nombre?.type === "required" && (
                    <p className="error">El nombre es requerido</p>
                  )}
                  <label className="label1">Nombre</label>
                </div>
                <div className="container1">
                  <input
                    className="input1"
                    type="text"
                    defaultValue={usuario.apellido}
                    {...register("apellido", {
                      required: true,
                    })}
                  ></input>
                  {errors.apellido?.type === "required" && (
                    <p className="error">El apellido es requerido</p>
                  )}
                  <label className="label1">Apellido</label>
                </div>
                <div className="container1">
                  <input
                    className="input1"
                    type="text"
                    defaultValue={usuario.usuario}
                    {...register("usuario", {
                      required: true,
                    })}
                  ></input>
                  {errors.usuario?.type === "required" && (
                    <p className="error">El usuario es requerido</p>
                  )}
                  <label className="label1">Nombre de usuario</label>
                </div>
                <div className="container1">
                  <input
                    className="input1"
                    type="text"
                    defaultValue={usuario.correo}
                    {...register("correo", {
                      pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    })}
                  ></input>
                  {errors.email?.type === "pattern" && (
                    <p className="error">Escriba un correo valido</p>
                  )}
                  <label className="label1">Correo</label>
                </div>
                <form className="container1">
                  <input
                    type="date"
                    {...register("nacimiento", {
                      required: true,
                    })}
                    className="input1"
                  />
                  {errors.nacimiento?.type === "required" && (
                    <p className="error">La fecha es requerida</p>
                  )}
                  <label className="label1">Fecha de Nacimiento</label>
                </form>
                <div className="container1">
                  <input
                    className="input1"
                    type="tel"
                    placeholder="Ej: 912345678"
                    defaultValue={usuario.celular}
                    {...register("celular", {
                      required: true,
                      pattern: /^[0-9]{9}$/,
                    })}
                  ></input>
                  {errors.celular?.type === "required" && (
                    <p className="error">El celular es requerido</p>
                  )}
                  {errors.celular?.type === "pattern" && (
                    <p className="error">
                      El número celular debe tener 9 dígitos
                    </p>
                  )}
                  <label className="label1">Numero celular</label>
                </div>
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
                    {...register("dorsal", {
                      required: true,
                    })}
                  ></input>
                </label>
              </div>
              <label className="label1 mt-3">
                Foto de Perfil <span>(max. 10MB)</span>{" "}
              </label>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                {...register("fotoPerfil")}
                multiple={false}
              ></input>
              <Locaciones register={register} />

              <input
                type="submit"
                class="btn1 mt-3 mb-5"
                value="guardar"
              ></input>
            </form>
            <input
                type="button"
                class="btn1 mt-3 mb-5"
                value="Volver"
                onClick={()=> navigate('/home')}
              ></input>
            {/* <form className="contenedor-registro" onSubmit={handleSubmit(cambiarCaracteristicas)} >
        <Form>
          <h2>Editar caracteristicas</h2>
          <div key={`inline-checkbox`} className="mb-3">
            {[
              "Portero",
              "Defensa",
              "Lateral",
              "Mediocampista",
              "Delantero",
            ].map((posicion) => (
              <Form.Check
                key={posicion}
                inline
                label={posicion}
                name={posicion}
                type="checkbox"
                id={posicion}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPosicionesSeleccionadas([
                      ...posicionesSeleccionadas,
                      posicion,
                    ]);
                  } else {
                    setPosicionesSeleccionadas(
                      posicionesSeleccionadas.filter((p) => p !== posicion)
                    );
                  }
                }}
              />
            ))}
          </div>
        </Form>
        <h4 className="m-3">Selecciona los dias disponibles</h4>
        <Form>
          <div key={`inline-checkbox`} className="mb-3">
            {[
              "Lunes",
              "Martes",
              "Miercoles",
              "Jueves",
              "Viernes",
              "Sabado",
              "Domingo",
            ].map((dia) => (
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
                    setDiasSeleccionados(
                      diasSeleccionados.filter((d) => d !== dia)
                    );
                  }
                }}
              />
            ))}
          </div>
          <input type="submit" class="btn1 mt-3 mb-5" value="guardar"></input>
        </Form>
      </form> */}
          </div>
      </div>
    </div>
  );
}

export default Perfil;
