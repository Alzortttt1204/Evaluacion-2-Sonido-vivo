import Boton from '../components/atoms/Boton'
import Seccion from '../components/molecules/Seccion'
import GrillaProductos from '../components/organisms/GrillaProductos'
import PerfilUsuario from '../components/organisms/PerfilUsuario'
import { textosPerfil } from '../data/textos'

// Mi Perfil (ruta privada): datos del usuario y sus productos favoritos
function Perfil({ sesion, productos, favoritos, onToggleFavorito, onAgregarCarrito, onCerrarSesion }) {
  const productosFavoritos = productos.filter((producto) => favoritos.includes(producto.id))

  return (
    <>
      <Seccion id="perfil" titulo={textosPerfil.titulo}>
        <PerfilUsuario usuario={sesion} />
        <Boton className="btn-ver-productos" onClick={onCerrarSesion}>{textosPerfil.cerrarSesion}</Boton>
      </Seccion>

      <Seccion id="favoritos" titulo={textosPerfil.tituloFavoritos}>
        {productosFavoritos.length > 0 ? (
          <GrillaProductos
            productos={productosFavoritos}
            favoritos={favoritos}
            onToggleFavorito={onToggleFavorito}
            onAgregarCarrito={onAgregarCarrito}
          />
        ) : (
          <p className="mensaje-vacio">{textosPerfil.sinFavoritos}</p>
        )}
      </Seccion>
    </>
  );
}

export default Perfil;
