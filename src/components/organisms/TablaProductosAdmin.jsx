import Table from 'react-bootstrap/Table'
import FilaProductoAdmin from '../molecules/FilaProductoAdmin'

// Tabla de React Bootstrap. "responsive" agrega scroll horizontal solo dentro de la tabla en celulares.
function TablaProductosAdmin({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p className="mensaje-vacio">No hay productos en el catálogo.</p>;
  }

  return (
    <Table striped bordered hover responsive size="sm" className="tabla-admin">
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <FilaProductoAdmin
            key={producto.id}
            producto={producto}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default TablaProductosAdmin;
