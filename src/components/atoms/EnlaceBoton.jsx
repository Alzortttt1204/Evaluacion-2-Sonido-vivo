import { Link } from 'react-router-dom'

// Enlace con forma de botón naranjo (clase original btn-ver-productos)
function EnlaceBoton({ to, children }) {
  return (
    <Link to={to} className="btn-ver-productos">
      {children}
    </Link>
  );
}

export default EnlaceBoton;
