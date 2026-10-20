import { useState } from 'react'
import Boton from '../atoms/Boton'
import BotonTema from '../atoms/BotonTema'
import ContadorCarrito from '../atoms/ContadorCarrito'
import ItemMenu from '../molecules/ItemMenu'
import { itemsMenu, itemsInvitado, itemsUsuario, itemsAdministrador } from '../../data/menu'

// Menú principal. En celulares (menos de 600px) se muestra el botón ☰ que abre y cierra la lista.
function MenuPrincipal({ cantidadCarrito, sesion, tema, onCambiarTema, onCerrarSesion }) {
  const [abierto, setAbierto] = useState(false)

  const cerrarMenu = () => setAbierto(false)

  // Los enlaces cambian según si hay sesión y según el rol del usuario
  let items = [...itemsMenu]
  if (sesion) {
    if (sesion.rol === 'administrador') items = [...items, ...itemsAdministrador]
    items = [...items, ...itemsUsuario]
  } else {
    items = [...items, ...itemsInvitado]
  }

  const salir = () => {
    cerrarMenu()
    onCerrarSesion()
  }

  return (
    <nav id="menu-principal">
      <button
        type="button"
        className="btn-menu"
        aria-expanded={abierto}
        aria-controls="lista-menu"
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? '✕ Cerrar menú' : '☰ Menú'}
      </button>

      <ul id="lista-menu" className={abierto ? 'abierto' : ''}>
        {items.map((item) => (
          <ItemMenu key={item.to} to={item.to} onClick={cerrarMenu}>
            {item.label}
            {item.to === '/carrito' && <ContadorCarrito cantidad={cantidadCarrito} />}
          </ItemMenu>
        ))}

        {sesion && (
          <li>
            <Boton className="btn-salir" onClick={salir}>Cerrar sesión</Boton>
          </li>
        )}

        <li>
          <BotonTema tema={tema} onCambiarTema={onCambiarTema} />
        </li>
      </ul>
    </nav>
  );
}

export default MenuPrincipal;
