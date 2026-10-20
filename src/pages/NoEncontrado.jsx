import EnlaceBoton from '../components/atoms/EnlaceBoton'
import Seccion from '../components/molecules/Seccion'
import { textosError404 } from '../data/textos'

// Página 404: se muestra para cualquier ruta que no exista
function NoEncontrado() {
  const { codigo, titulo, mensaje, boton } = textosError404

  return (
    <Seccion id="error-404">
      <p className="codigo-error">{codigo}</p>
      <h2>{titulo}</h2>
      <p>{mensaje}</p>
      <EnlaceBoton to="/">{boton}</EnlaceBoton>
    </Seccion>
  );
}

export default NoEncontrado;
