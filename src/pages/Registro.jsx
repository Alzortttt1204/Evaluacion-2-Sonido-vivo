import { Link } from 'react-router-dom'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { textosRegistro } from '../data/textos'

function Registro() {
  return (
    <>
      <FormularioRegistro />
      <p className="enlace-secundario">
        {textosRegistro.pregunta} <Link to="/login">{textosRegistro.enlace}</Link>
      </p>
    </>
  );
}

export default Registro;
