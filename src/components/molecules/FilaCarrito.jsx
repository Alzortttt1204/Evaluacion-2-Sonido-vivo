import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/formato'

// Una línea del carrito: producto, precio unitario, botones - / + , subtotal y eliminar
function FilaCarrito({ item, onCambiarCantidad, onEliminar }) {
  const { id, nombre, precio, imagen, cantidad, stock } = item

  return (
    <div className="fila-carrito">
      <img className="fila-carrito-imagen" src={imagen} alt={nombre} />

      <div className="fila-carrito-info">
        <h3>{nombre}</h3>
        <p>{formatearPrecio(precio)} c/u</p>
      </div>

      <div className="fila-carrito-cantidad">
        <Boton aria-label={`Quitar una unidad de ${nombre}`} onClick={() => onCambiarCantidad(id, cantidad - 1)}>
          −
        </Boton>
        <span aria-label={`Cantidad de ${nombre}`}>{cantidad}</span>
        <Boton
          aria-label={`Agregar una unidad de ${nombre}`}
          onClick={() => onCambiarCantidad(id, cantidad + 1)}
          disabled={cantidad >= stock}
        >
          +
        </Boton>
      </div>

      <p className="precio fila-carrito-subtotal">{formatearPrecio(precio * cantidad)}</p>

      <Boton className="btn-eliminar" onClick={() => onEliminar(id)}>
        Eliminar
      </Boton>
    </div>
  );
}

export default FilaCarrito;
