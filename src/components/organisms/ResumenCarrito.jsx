import Boton from '../atoms/Boton'
import FilaCarrito from '../molecules/FilaCarrito'
import { textosCarrito } from '../../data/textos'
import { calcularTotal, contarUnidades } from '../../utils/carrito'
import { formatearPrecio } from '../../utils/formato'

// Lista de productos del carrito + resumen de pago (unidades y total)
function ResumenCarrito({ carrito, onCambiarCantidad, onEliminar, onVaciar }) {
  return (
    <div className="resumen-carrito">
      {carrito.map((item) => (
        <FilaCarrito
          key={item.id}
          item={item}
          onCambiarCantidad={onCambiarCantidad}
          onEliminar={onEliminar}
        />
      ))}

      <div className="total-carrito">
        <p>Productos: {contarUnidades(carrito)} unidad(es)</p>
        <p className="precio">Total: {formatearPrecio(calcularTotal(carrito))}</p>
        <Boton className="btn-vaciar" onClick={onVaciar}>{textosCarrito.vaciar}</Boton>
      </div>
    </div>
  );
}

export default ResumenCarrito;
