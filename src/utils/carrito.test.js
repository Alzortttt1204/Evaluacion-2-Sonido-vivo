import { describe, it, expect } from 'vitest'
import { agregarAlCarrito, cambiarCantidad, calcularTotal } from './carrito'

const guitarra = { id: 1, nombre: 'Guitarra', precio: 100000, imagen: 'guitarra.jpg', stock: 5 }
const puas = { id: 8, nombre: 'Puas', precio: 15000, imagen: 'puas.jpg', stock: 25 }

describe('carrito de compras', () => {

  it('PU-007: agregar dos veces el mismo producto suma las cantidades', () => {
    // Arrange
    const carrito = agregarAlCarrito([], guitarra, 1)

    // Act
    const resultado = agregarAlCarrito(carrito, guitarra, 2)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].cantidad).toBe(3)
  })

  it('PU-008: la cantidad del carrito nunca supera el stock disponible', () => {
    // Arrange
    const carrito = []

    // Act
    const resultado = agregarAlCarrito(carrito, guitarra, 10)

    // Assert
    expect(resultado[0].cantidad).toBe(5)
  })

  it('PU-009: calcularTotal multiplica precio por cantidad y suma todos los productos', () => {
    // Arrange
    const carrito = [
      { ...guitarra, cantidad: 2 },
      { ...puas, cantidad: 3 },
    ]

    // Act
    const total = calcularTotal(carrito)

    // Assert
    expect(total).toBe(245000)
  })

  it('PU-010: dejar la cantidad en 0 quita el producto del carrito', () => {
    // Arrange
    const carrito = [{ ...guitarra, cantidad: 1 }, { ...puas, cantidad: 2 }]

    // Act
    const resultado = cambiarCantidad(carrito, 1, 0)

    // Assert
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(8)
  })

})
