import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./css/cards.css";
import { useNavigate } from "react-router-dom";

function BasicExample( {image, usuario, dorsal, nacimiento, posiciones, id} ) {

    const navigate = useNavigate();

    const fechaNacimiento = new Date(nacimiento);
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
    <div className='contornoCard'>
        <Card style={{ width: '16rem', background: 'rgb(0, 41, 58)', borderRadius: '5px', padding: '1em' }} >
        <Card.Title className='nombreUsuario fs-3 text'>{`${usuario.charAt(0).toUpperCase()}${usuario.slice(1)}`}</Card.Title>
        <Card.Title className='nombreUsuario fs-3 text'>{dorsal} </Card.Title>
        <Card.Img variant="top" src={image} className='imagenCard'/>
        <Card.Body >   
            <Card.Text className='fs-4 '>{edad} años</Card.Text>
            <Card.Text className='border border-success'>
              {posiciones
                .filter((posicion, index, self) => {
                  // Filtrar los elementos duplicados
                  return (
                    index ===
                    self.findIndex((p) => p.codigo === posicion.codigo)
                  );
                })
                .map((posicion, index, array) => (
                  <span key={posicion.codigo}>
                    {posicion.codigo}
                    {index < array.length - 1 && " - "}
                  </span>
                ))}
            </Card.Text>
            {esCumpleaños && <h4 className='nombreUsuario'>¡Feliz cumpleaños!</h4>}
            <Button variant="success" onClick={() => navigate(`/jugador/${id}`)}>Fichar</Button>
        </Card.Body>
        </Card>
    </div>
  );
}

export default BasicExample;

