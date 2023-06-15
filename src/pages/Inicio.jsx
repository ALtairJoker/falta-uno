import React from "react";
import { useState, useContext } from "react";
import Context from "../../Context";
import "./css/inicio.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loaders from '../components/Loaders'

function Inicio() {


    const { setUsuario, setToken } = useContext(Context);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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
      setLoading(true);
      
      const URL_SERVER = 'https://server-falta-uno.vercel.app';
      /* const URL_SERVER = 'http://localhost:5000'; */
      const endpoint = "/login";
      const { username, password } = usuario;
      try {
        if (!username || !password) return alert("Email y password obligatorias");
        
        const response = await axios.post(URL_SERVER + endpoint, usuario);
        const { token: authToken , usuario: datosUsuario } = response.data;
        setToken(authToken);
        const fotoPerfilBase64 = datosUsuario.foto_perfil.replace(/^data:image\/[a-z]+;base64,/, '');
        const datosUsuario2 = { ...datosUsuario, foto_perfil: fotoPerfilBase64 }; // Actualizar los datos del usuario
        setUsuario(datosUsuario2);
        navigate("/home");
      } catch (error) {
        const message = error.message || "Ocurrió un error";
        alert(message + " 🙁");
        console.log(message);
      }
      setLoading(false);
    };
    

    return (
      <div className="contenedor-principal">
        <div className="contenedor-form mt-2">
          {loading && <Loaders />}
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
          <button class="btn1 mb-5" onClick={login} disabled={loading}>
            Ingresar
          </button>
        </div>
      </div>
    );
}

export default Inicio;
