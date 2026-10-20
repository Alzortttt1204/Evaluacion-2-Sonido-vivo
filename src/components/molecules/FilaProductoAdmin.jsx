import Button from 'react-bootstrap/Button'
import { textoDeOpcion, categorias } from '../../data/opciones'
import { formatearPrecio } from '../../utils/formato'

// Fila de la tabla del Panel de Control con los botones Editar y Eliminar
function FilaProductoAdmin({ producto, onEditar, onEliminar }) {
  const { id, nombre, marca, categoria, precio, stock, imagen } = producto
  const stockBajo = stock <= 2

  return (
    <tr>
      <td>{id}</td>
      <td><img src={imagen} alt={nombre} /></td>
      <td>{nombre}</td>
      <td>{marca}</td>
      <td>{textoDeOpcion(categorias, categoria)}</td>
      <td>{formatearPrecio(precio)}</td>
      <td className={stockBajo ? 'stock-bajo' : ''}>
        {stock}{stockBajo && ' (bajo)'}
      </td>
      <td className="acciones-admin">
        <Button size="sm" variant="warning" onClick={() => onEditar(producto)}>Editar</Button>
        <Button size="sm" variant="outline-danger" onClick={() => onEliminar(id)}>Eliminar</Button>
      </td>
    </tr>
  );
}

export default FilaProductoAdmin;
