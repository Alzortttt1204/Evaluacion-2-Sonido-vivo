import { formatearPrecio } from '../../utils/formato'

function Precio({ valor }) {
  return <p className="precio">{formatearPrecio(valor)}</p>;
}

export default Precio;
