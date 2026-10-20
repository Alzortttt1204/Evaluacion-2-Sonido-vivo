// Funciones del catálogo: buscar, filtrar y el CRUD en memoria del Panel de Control.
// Igual que en el carrito, siempre devuelven un arreglo nuevo.

export function buscarProductoPorId(productos, id) {
  return productos.find((producto) => producto.id === Number(id))
}

// Filtra por texto (nombre o marca) y por categoría ('todas' = sin filtro)
export function filtrarProductos(productos, texto, categoria) {
  const busqueda = texto.trim().toLowerCase()

  return productos.filter((producto) => {
    const nombreYMarca = `${producto.nombre} ${producto.marca}`.toLowerCase()
    const coincideTexto = nombreYMarca.includes(busqueda)
    const coincideCategoria = categoria === 'todas' || producto.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}

function siguienteId(productos) {
  if (productos.length === 0) return 1
  return Math.max(...productos.map((producto) => producto.id)) + 1
}

export function crearProducto(productos, datos, imagen) {
  const nuevoProducto = {
    ...datos,
    id: siguienteId(productos),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    imagen,
  }
  return [...productos, nuevoProducto]
}

export function actualizarProducto(productos, id, datos) {
  return productos.map((producto) =>
    producto.id === id
      ? { ...producto, ...datos, id, precio: Number(datos.precio), stock: Number(datos.stock) }
      : producto
  )
}

export function eliminarProducto(productos, id) {
  return productos.filter((producto) => producto.id !== id)
}
