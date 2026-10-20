import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Productos from './Productos'
import { productosIniciales } from '../data/productos'

function renderizarCatalogo() {
  render(
    <MemoryRouter>
      <Productos
        productos={productosIniciales}
        favoritos={[]}
        onToggleFavorito={vi.fn()}
        onAgregarCarrito={vi.fn()}
      />
    </MemoryRouter>
  )
}

describe('Página Productos', () => {

  it('PU-034: muestra las 8 tarjetas del catálogo inicial', () => {
    // Arrange
    renderizarCatalogo()

    // Act
    const tarjetas = screen.getAllByRole('article')

    // Assert
    expect(tarjetas).toHaveLength(8)
  })

  it('PU-035: el filtro por categoría deja solo los productos de esa categoría', () => {
    // Arrange
    renderizarCatalogo()

    // Act
    fireEvent.change(screen.getByLabelText('Categoría:'), { target: { value: 'pedales' } })

    // Assert
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByText('Pedal de Efectos Overdrive')).toBeInTheDocument()
    expect(screen.getByText('Mostrando 1 de 8 productos')).toBeInTheDocument()
  })

  it('PU-036: si la búsqueda no encuentra nada muestra un aviso', () => {
    // Arrange
    renderizarCatalogo()

    // Act
    fireEvent.change(screen.getByLabelText('Buscar:'), { target: { value: 'violin' } })

    // Assert
    expect(screen.queryAllByRole('article')).toHaveLength(0)
    expect(screen.getByText('No se encontraron productos con esos filtros.')).toBeInTheDocument()
  })

})
