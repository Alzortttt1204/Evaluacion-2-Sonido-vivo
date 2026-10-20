import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DetalleProducto from './DetalleProducto'

const productoMock = {
  id: 1,
  nombre: 'Guitarra Electrica Stratocaster',
  precio: 10000,
  descripcion: 'Guitarra de prueba',
  imagen: 'guitarra.jpg',
  categoria: 'guitarras',
  marca: 'Fender',
  stock: 5,
}

function renderizarDetalle(onAgregarCarrito = vi.fn()) {
  render(
    <DetalleProducto
      producto={productoMock}
      esFavorito={false}
      onToggleFavorito={vi.fn()}
      onAgregarCarrito={onAgregarCarrito}
    />
  )
}

describe('DetalleProducto', () => {

  it('PU-019: calcula el subtotal según la cantidad ingresada', () => {
    // Arrange
    renderizarDetalle()
    fireEvent.change(screen.getByLabelText('Cantidad:'), { target: { value: '3' } })

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }))

    // Assert
    expect(screen.getByText('Subtotal: $30.000')).toBeInTheDocument()
  })

  it('PU-020: con cantidad 0 avisa que no es válida', () => {
    // Arrange
    renderizarDetalle()
    fireEvent.change(screen.getByLabelText('Cantidad:'), { target: { value: '0' } })

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }))

    // Assert
    expect(screen.getByText('Ingresa una cantidad valida.')).toBeInTheDocument()
  })

  it('PU-021: no deja agregar al carrito más unidades que el stock', () => {
    // Arrange
    const onAgregarCarrito = vi.fn()
    renderizarDetalle(onAgregarCarrito)
    fireEvent.change(screen.getByLabelText('Cantidad:'), { target: { value: '9' } })

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    // Assert
    expect(onAgregarCarrito).not.toHaveBeenCalled()
    expect(screen.getByText('Solo hay 5 unidades disponibles.')).toBeInTheDocument()
  })

})
