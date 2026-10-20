import { Link, useParams } from 'react-router-dom'
import Seccion from '../components/molecules/Seccion'
import DetalleProducto from '../components/organisms/DetalleProducto'
import { textosProducto } from '../data/textos'
import { buscarProductoPorId } from '../utils/productos'

function Producto({ productos, favoritos, onToggleFavorito, onAgregarCarrito }) {
  // El id viene en la ruta: /productos/:id (antes producto.html?id=...)
  const { id } = useParams()
  const producto = buscarProductoPorId(productos, id)

  return (
    <Seccion id="detalle-producto">
      <Link to="/productos" className="volver">{textosProducto.volver}</Link>

      <div id="detalle-contenido">
        {producto ? (
          <DetalleProducto
            key={producto.id}
            producto={producto}
            esFavorito={favoritos.includes(producto.id)}
            onToggleFavorito={onToggleFavorito}
            onAgregarCarrito={onAgregarCarrito}
          />
        ) : (
          <p>{textosProducto.noEncontrado}</p>
        )}
      </div>
    </Seccion>
  );
}

export default Producto;
