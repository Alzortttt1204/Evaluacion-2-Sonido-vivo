import TarjetaProducto from '../molecules/TarjetaProducto'

// Recorre los productos con .map() y dibuja una tarjeta por cada uno
function GrillaProductos({ id, productos, mostrarDescripcion = true, favoritos = [], onToggleFavorito, onAgregarCarrito }) {
  return (
    <div id={id} className="grilla-productos">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          mostrarDescripcion={mostrarDescripcion}
          esFavorito={favoritos.includes(producto.id)}
          onToggleFavorito={onToggleFavorito}
          onAgregarCarrito={onAgregarCarrito}
        />
      ))}
    </div>
  );
}

export default GrillaProductos;
