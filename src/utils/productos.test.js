import { describe, it, expect } from 'vitest'
import { filtrarProductos, crearProducto, eliminarProducto } from './productos'

const productos = [
  { id: 1, nombre: 'Guitarra Electrica', marca: 'Fender', categoria: 'guitarras', precio: 349990, stock: 5 },
  { id: 2, nombre: 'Bajo Electrico', marca: 'Fender', categoria: 'bajos', precio: 289990, stock: 3 },
  { id: 3, nombre: 'Teclado Digital', marca: 'Yamaha', categoria: 'teclados', precio: 199990, stock: 6 },
]

describe('catálogo de productos', () => {

  it('PU-011: filtrarProductos combina el texto buscado con la categoría', () => {
    // Arrange
    const texto = 'fender'
    const categoria = 'bajos'

    // Act
    const resultado = filtrarProductos(productos, texto, categoria)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Bajo Electrico')
  })

  it('PU-012: crearProducto asigna el siguiente id, convierte precio/stock a número y usa la imagen genérica', () => {
    // Arrange
    const datos = { nombre: 'Ukelele', marca: 'Kala', categoria: 'guitarras', precio: '59990', stock: '4', descripcion: 'Ukelele soprano' }

    // Act
    const resultado = crearProducto(productos, datos, 'generica.svg')
    const nuevo = resultado[resultado.length - 1]

    // Assert
    expect(resultado).toHaveLength(4)
    expect(nuevo).toMatchObject({ id: 4, precio: 59990, stock: 4, imagen: 'generica.svg' })
  })

  it('PU-013: eliminarProducto quita solo el producto indicado', () => {
    // Arrange
    const idAEliminar = 2

    // Act
    const resultado = eliminarProducto(productos, idAEliminar)

    // Assert
    expect(resultado.map((producto) => producto.id)).toEqual([1, 3])
  })

})
