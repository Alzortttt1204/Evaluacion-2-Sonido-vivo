import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import TarjetaProducto from './TarjetaProducto'

const productoMock = {
  id: 7,
  nombre: 'Pedal de Efectos Overdrive',
  descripcion: 'Pedal de distorsion suave para guitarra electrica.',
  precio: 39990,
  imagen: 'pedal.jpg',
  stock: 7,
}

// MemoryRouter es necesario porque la tarjeta usa useNavigate
function renderizarTarjeta(props) {
  return render(
    <MemoryRouter>
      <TarjetaProducto producto={productoMock} {...props} />
    </MemoryRouter>
  )
}

describe('TarjetaProducto', () => {

  it('PU-016: al hacer click en Favorito avisa el id del producto', () => {
    // Arrange
    const onToggleFavorito = vi.fn()
    renderizarTarjeta({ esFavorito: false, onToggleFavorito })

    // Act
    fireEvent.click(screen.getByRole('button', { name: '♡ Favorito' }))

    // Assert
    expect(onToggleFavorito).toHaveBeenCalledWith(7)
  })

  it('PU-017: al agregar al carrito llama a la función y el botón cambia a "✓ Agregado"', () => {
    // Arrange
    const onAgregarCarrito = vi.fn()
    renderizarTarjeta({ onAgregarCarrito })
    const boton = screen.getByRole('button', { name: 'Agregar al carrito' })

    // Act
    fireEvent.click(boton)

    // Assert
    expect(onAgregarCarrito).toHaveBeenCalledWith(productoMock, 1)
    expect(boton.textContent).toBe('✓ Agregado')
  })

  it('PU-018: muestra el precio con formato chileno', () => {
    // Arrange
    renderizarTarjeta({})

    // Act
    const precio = screen.getByText('$39.990')

    // Assert
    expect(precio).toBeInTheDocument()
  })

})
