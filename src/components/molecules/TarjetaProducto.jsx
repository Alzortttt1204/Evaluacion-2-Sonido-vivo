import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Boton from '../atoms/Boton'
import BotonFavorito from '../atoms/BotonFavorito'
import ImagenProducto from '../atoms/ImagenProducto'
import Precio from '../atoms/Precio'

// Tarjeta del catálogo (misma estructura que generaba js/productos.js).
// Los botones de carrito y favorito solo aparecen si se reciben sus funciones.
function TarjetaProducto({ producto, mostrarDescripcion = true, esFavorito = false, onToggleFavorito, onAgregarCarrito }) {
  const [agregado, setAgregado] = useState(false)
  const navigate = useNavigate()
  const { id, nombre, descripcion, precio, imagen, stock } = producto

  const agregarAlCarrito = () => {
    onAgregarCarrito(producto, 1)
    setAgregado(true)
  }

  return (
    <article className="tarjeta-producto">
      <ImagenProducto src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      {mostrarDescripcion && <p className="descripcion-corta">{descripcion}</p>}
      <Precio valor={precio} />

      <div className="acciones-tarjeta">
        <Boton onClick={() => navigate(`/productos/${id}`)}>Ver detalle</Boton>

        {onToggleFavorito && (
          <BotonFavorito esFavorito={esFavorito} onClick={() => onToggleFavorito(id)} />
        )}

        {onAgregarCarrito && (
          <Boton className="btn-agregar" onClick={agregarAlCarrito} disabled={stock < 1}>
            {stock < 1 ? 'Sin stock' : agregado ? '✓ Agregado' : 'Agregar al carrito'}
          </Boton>
        )}
      </div>
    </article>
  );
}

export default TarjetaProducto;
