import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/navegation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../../Context";



function Navegation() {
  const setActiveClass = ({ isActive }) => (isActive ? "activo" : "inactivo");

  const navigate = useNavigate();
  const { usuario, setUsuario } = useContext(Context);
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    navigate("/inicio");
  };
  return (
    
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="transparent"
      variant="dark"
      fixed="top"
    >
      <Container className="mt-3 position-relative">
        <Navbar.Brand to="/inicio">
        <NavLink  to="/" className={setActiveClass}>
                  <p className="logoNav">FALTA-UNO <i class='bx bx-football bx-lg bx-tada '></i></p> 
                </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!usuario ? (
              <Nav>
                <NavLink to="/inicio" className={setActiveClass}>
                  <p className="deco me-5">INICIO <i class='bx bx-log-in bx-sm bx-fade-right-hover'></i></p>
                </NavLink>
                <NavLink to="/registro" className={setActiveClass}>
                  <p className="deco me-5">REGISTRAR <i class='bx bx-edit bx-sm bx-burst-hover'></i></p>
                </NavLink>
              </Nav>
            ) : (
              <Nav>
                <NavLink to="/home" className={setActiveClass}>
                  <p className="deco me-5">BUSCAR JUGADORES <i class='bx bx-body bx-sm bx-tada-hover'></i></p>
                </NavLink>
                <NavLink to="/publicaciones" className={setActiveClass}>
                  <p className="deco me-5">PUBLICACIONES <i class='bx bx-message bx-sm bx-tada-hover'></i></p>
                </NavLink>
                <NavLink to="/perfil" className={setActiveClass}>
                  <p className="deco me-5">PERFIL <i class='bx bxs-user bx-sm bx-tada-hover'></i></p>
                </NavLink>
                <NavLink to="/inicio" className={setActiveClass}>
                  <p className="deco me-5 boton-cerrar " onClick={logout}><i class='bx bx-log-out bx-md bx-fade-left-hover'></i></p>
                </NavLink>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegation;
