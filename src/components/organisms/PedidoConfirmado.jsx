import DatoEtiquetado from '../atoms/DatoEtiquetado'
import EnlaceBoton from '../atoms/EnlaceBoton'
import Seccion from '../molecules/Seccion'
import { tiposEntrega, mediosPago, textoDeOpcion } from '../../data/opciones'
import { textosCarrito } from '../../data/textos'
import { formatearPrecio } from '../../utils/formato'

function PedidoConfirmado({ pedido }) {
  return (
    <Seccion id="pedido-confirmado" titulo={textosCarrito.pedidoConfirmado}>
      <p>Gracias por tu compra, {pedido.nombre}. Te enviaremos el detalle a {pedido.correo}.</p>
      <DatoEtiquetado etiqueta="N° de pedido" valor={pedido.numero} />
      <DatoEtiquetado etiqueta="Productos" valor={`${pedido.unidades} unidad(es)`} />
      <DatoEtiquetado etiqueta="Total pagado" valor={formatearPrecio(pedido.total)} />
      <DatoEtiquetado etiqueta="Entrega" valor={textoDeOpcion(tiposEntrega, pedido.entrega)} />
      {pedido.entrega === 'despacho' && (
        <DatoEtiquetado etiqueta="Dirección" valor={`${pedido.direccion}, ${pedido.comuna}`} />
      )}
      <DatoEtiquetado etiqueta="Medio de pago" valor={textoDeOpcion(mediosPago, pedido.pago)} />
      <EnlaceBoton to="/productos">Seguir comprando</EnlaceBoton>
    </Seccion>
  );
}

export default PedidoConfirmado;
