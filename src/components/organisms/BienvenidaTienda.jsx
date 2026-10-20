import EnlaceBoton from '../atoms/EnlaceBoton'
import Seccion from '../molecules/Seccion'
import { textosHome } from '../../data/textos'

function BienvenidaTienda() {
  const { titulo, texto, boton } = textosHome.bienvenida

  return (
    <Seccion id="inicio" titulo={titulo}>
      <p>{texto}</p>
      <EnlaceBoton to="/productos">{boton}</EnlaceBoton>
    </Seccion>
  );
}

export default BienvenidaTienda;
