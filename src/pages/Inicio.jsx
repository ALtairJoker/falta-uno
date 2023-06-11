import React from "react";
import { useState, useContext } from "react";
import Context from "../../Context";
import "./css/inicio.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inicio() {
    const { setUsuario } = useContext(Context);
    const navigate = useNavigate();
    const [usuario, setUsuarioLogin] = useState({
      username: "",
      password: ""
    });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUsuarioLogin((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
    
    const login = async () => {
      const urlServer = "http://localhost:3000";
      const endpoint = "/login";
      const { username, password } = usuario;
      try {
        if (!username || !password) return alert("Email y password obligatorias");
        
        const response = await axios.post(urlServer + endpoint, usuario);
        const { token, usuario: datosUsuario } = response.data;
        localStorage.setItem("token", token);
        const fotoPerfilBase64 = datosUsuario.foto_perfil.replace(/^data:image\/[a-z]+;base64,/, '');
        const datosUsuario2 = { ...datosUsuario, foto_perfil: fotoPerfilBase64 }; // Actualizar los datos del usuario
        setUsuario(datosUsuario2);
        navigate("/home");
      } catch (error) {
        const message = error.message || "Ocurrió un error";
        alert(message + " 🙁");
        console.log(message);
      }
    };
    

 
    

  return (
    <div className="contenedor-principal">
        <div className="contenedor-form mt-2">
        <h2>Login</h2>
        <div className="container1">
        <input
          className="input1"
          name="username"
          type="text"
          value={usuario.username}
          onChange={handleInputChange}
        ></input>
        <label className="label1">Usuario</label>
      </div>
      <div className="container1">
        <input
          className="input1"
          name="password"
          type="password"
          value={usuario.password}
          onChange={handleInputChange}
        ></input>
        <label className="label1">Contraseña</label>
      </div>
        <button class="btn1 mb-5" onClick={login}>Ingresar</button>
        {/* <h3>O</h3>
        <button class="btn1" onClick={() => navigate('/registro')}>Registrar</button> */}
      </div>
      
    </div>
  );
}

export default Inicio;
