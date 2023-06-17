import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/navegation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";



function Navegation() {
  const setActiveClass = ({ isActive }) => (isActive ? "activo" : "inactivo");

  const navigate = useNavigate();
  const { usuario, setUsuario, setToken } = useContext(Context);
  
  const logout = () => {
    setUsuario(null);
    setToken(null); // Agrega esta línea para borrar el token
    localStorage.removeItem("token");
    navigate("/inicio");
  };
  

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const threshold = 50; // Ajusta el valor según tus necesidades

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setIsNavbarVisible(
        currentScrollPos < threshold || (isScrollingUp && currentScrollPos === 0)
      );

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    
    <Navbar
    className={`navbar ${isNavbarVisible ? "visible" : "hidden"}`}
      collapseOnSelect
      expand="lg"
      bg="transparent"
      variant="dark"
      fixed="top"
    >
      <Container className="mt-3" >
        <Navbar.Brand to="/inicio">
        <NavLink  to="/" className={setActiveClass}>
                  <p className="logoNav" onClick={logout}>FALTA-UNO <i class='bx bx-football bx-lg bx-tada '></i></p> 
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
