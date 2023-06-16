import React from "react";
import "./css/registro.css";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import Resizer from "react-image-file-resizer";
import Loaders from '../components/Loaders'
import Locaciones from "../components/Locaciones";
import Context from "../../Context";

function Registro() {

  const { URL_SERVER } = useContext(Context);

  const {register, formState: {errors} ,handleSubmit, setValue, watch  } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [usuarioExistente, setUsuarioExistente] = useState(false);


  useEffect(() => {
    cargarDatosGuardados();
  }, []);


  const cargarDatosGuardados = () => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      Object.keys(usuario).forEach(key => {
        setValue(key, usuario[key]);
      });
    }
  }; 



 

  const onSubmit = async (data) => {
    setLoading(true);
    // Realizar la solicitud GET para verificar si el usuario existe
    const response = await fetch(`${URL_SERVER}/verificar-usuario/${data.usuario}`);
    const result = await response.json();

    if (result.exists) {
      // El usuario ya existe
      setUsuarioExistente(true);
    } else {
       //El usuario no existe, continuar con el registro
      const userData = { ...data };
      delete userData.confirmPassword;
      const file = userData.fotoPerfil[0]; // Obtiene el archivo de imagen seleccionado
      const resizedImage = await resizeAndCompressImage(file); // Realiza la compresión de la imagen
      const base64Image = resizedImage.replace(/^data:image\/[a-z]+;base64,/, '');
      userData.fotoPerfil = base64Image; // Agrega la imagen comprimida sin el prefijo al objeto userData
      localStorage.setItem('usuario', JSON.stringify(userData));
      navigate("/registro2", { state: { usuario: userData } });
      setLoading(false);
    }
  }

  
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


  const password = useRef({});
  password.current = watch("password", "");

  return (
    <div className="contenedor-principal">
      {loading ? (
      <Loaders />
    ) : (
      <form className="contenedor-registro" onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loaders />}
        <h2>Registrar</h2>
        <div className="inputs">
          <div className="container1">
            <input
              className="input1"
              type="text"
              {...register('nombre', {
                required: true
              })}
            ></input>
            {errors.nombre?.type === 'required' && <p className="error" >El nombre es requerido</p>}
            <label className="label1">Nombre</label>
          </div>
          <div className="container1">
            <input
              className="input1"
              type="text"
              {...register('apellido', {
                required: true
              })}
            ></input>
            {errors.apellido?.type === 'required' && <p className="error">El apellido es requerido</p>}
            <label className="label1">Apellido</label>
          </div>
          <div className="container1">
            <input
              className="input1"
              type="text"
              {...register('usuario', {
                required: true
              })}
            ></input>
            {errors.usuario?.type === 'required' && <p className="error">El usuario es requerido</p>}
            {usuarioExistente && <p className="error">El usuario ya existe</p>}
            <label className="label1">Nombre de usuario</label>
          </div>
          <div className="container1">
            <input
              className="input1"
              type="text"
              {...register('correo', {
                pattern:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
              })}
            ></input>
            {errors.email?.type === 'pattern' && <p className="error">Escriba un correo valido</p>}
            <label className="label1">Correo</label>
          </div>
          <div className="container1">
            <input
              className="input1"
              type="password"
              {...register('password', {
                required: true
              })}
            ></input>
            {errors.password?.type === 'required' && <p className="error">La contraseña es requerida</p>}
            <label className="label1">Contraseña</label>
          </div>
          <div className="container1">
            <input
              className="input1"
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password.current || "Las contraseñas no coinciden"
              })}
            ></input>
            {errors.password?.type === 'required' && <p className="error">Reingrese su contraseña</p>}
            {errors.confirmPassword?.message && (<p className="error">Las contraseñas deben coincidir</p>)}
            <label className="label1">Confirmar contraseña</label>
          </div>
          <form className="container1">
            <input
              type="date"
              {...register('nacimiento', {
                required: true
              })}
              className="input1"
            />
            {errors.nacimiento?.type === 'required' && <p className="error">La fecha es requerida</p>}
            <label className="label1">Fecha de Nacimiento</label>
          </form>
          <div className="container1">
            <input
              className="input1"
              type="tel"
              placeholder="Ej: 912345678"
              {...register('celular', {
                required: true,
                pattern: /^[0-9]{9}$/,
              })}
            ></input>
            {errors.celular?.type === 'required' && <p className="error">El celular es requerido</p>}
            {errors.celular?.type === "pattern" && (<p className="error">El número celular debe tener 9 dígitos</p>)}
            <label className="label1">Numero celular</label>
          </div>
        </div>
        <Locaciones register={register}/>
        <label className="label1">Foto de Perfil <span>(max. 10MB)</span> <span style={{color:'crimson'}}>(foto requerida)* </span></label>
        <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              {...register('fotoPerfil', {
                required: true
              })}
              multiple={false}
            ></input>
           {errors.fotoPerfil?.type === 'required' && <p className="error">La imagen es requerida</p>}
        <input type="submit" class="btn1 mt-3 mb-5" value="Siguiente"></input>

      </form>
      )}
    </div>
    )
}

export default Registro;
