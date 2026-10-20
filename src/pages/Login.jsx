import { Link, useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { textosLogin } from '../data/textos'

function Login({ onLogin }) {
  const navigate = useNavigate()

  // El administrador va al Panel de Control; el resto a Mi Perfil
  const manejarLogin = (usuario) => {
    onLogin(usuario)
    navigate(usuario.rol === 'administrador' ? '/admin' : '/perfil')
  }

  return (
    <>
      <FormularioLogin onLogin={manejarLogin} />
      <p className="enlace-secundario">
        {textosLogin.pregunta} <Link to="/registro">{textosLogin.enlace}</Link>
      </p>
    </>
  );
}

export default Login;
