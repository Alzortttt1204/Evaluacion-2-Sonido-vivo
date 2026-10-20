import MenuPrincipal from './MenuPrincipal'
import { textosGenerales } from '../../data/textos'

function Header({ cantidadCarrito, sesion, tema, onCambiarTema, onCerrarSesion }) {
  return (
    <header id="encabezado">
      <h1>{textosGenerales.nombreTienda}</h1>
      <p>{textosGenerales.eslogan}</p>

      <MenuPrincipal
        cantidadCarrito={cantidadCarrito}
        sesion={sesion}
        tema={tema}
        onCambiarTema={onCambiarTema}
        onCerrarSesion={onCerrarSesion}
      />
    </header>
  );
}

export default Header;
