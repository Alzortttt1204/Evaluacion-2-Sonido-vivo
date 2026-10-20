import { Navigate } from 'react-router-dom'
import { obtenerSesion } from '../utils/sesion'

// Protege una ruta revisando la sesión guardada en localStorage.
// - Sin sesión: redirige a /login.
// - Con sesión pero sin el rol pedido (por ejemplo un cliente en /admin): redirige a /perfil.
function RutaPrivada({ rolRequerido, children }) {
  const sesion = obtenerSesion()

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && sesion.rol !== rolRequerido) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}

export default RutaPrivada;
