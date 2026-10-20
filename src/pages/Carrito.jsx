import { useState } from 'react'
import EnlaceBoton from '../components/atoms/EnlaceBoton'
import Seccion from '../components/molecules/Seccion'
import ResumenCarrito from '../components/organisms/ResumenCarrito'
import FormularioCheckout from '../components/organisms/FormularioCheckout'
import PedidoConfirmado from '../components/organisms/PedidoConfirmado'
import { textosCarrito } from '../data/textos'
import { calcularTotal, contarUnidades } from '../utils/carrito'

function Carrito({ carrito, sesion, onCambiarCantidad, onEliminar, onVaciar }) {
  const [pedido, setPedido] = useState(null)

  const confirmarCompra = (datosCompra) => {
    setPedido({
      ...datosCompra,
      numero: 'SV-' + String(Date.now()).slice(-6),
      unidades: contarUnidades(carrito),
      total: calcularTotal(carrito),
    })
    onVaciar()
  }

  if (pedido) {
    return <PedidoConfirmado pedido={pedido} />;
  }

  if (carrito.length === 0) {
    return (
      <Seccion id="carrito" titulo={textosCarrito.titulo}>
        <div className="carrito-vacio">
          <p className="mensaje-vacio">{textosCarrito.vacio}</p>
          <EnlaceBoton to="/productos">{textosCarrito.irAProductos}</EnlaceBoton>
        </div>
      </Seccion>
    );
  }

  return (
    <Seccion id="carrito" titulo={textosCarrito.titulo}>
      <div className="carrito-layout">
        <div className="carrito-items">
          <ResumenCarrito
            carrito={carrito}
            onCambiarCantidad={onCambiarCantidad}
            onEliminar={onEliminar}
            onVaciar={onVaciar}
          />
        </div>
        <div className="carrito-checkout">
          <FormularioCheckout sesion={sesion} onConfirmar={confirmarCompra} />
        </div>
      </div>
    </Seccion>
  );
}

export default Carrito;
