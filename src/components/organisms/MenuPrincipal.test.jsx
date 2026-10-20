import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import MenuPrincipal from './MenuPrincipal'

function renderizarMenu(sesion) {
  render(
    <MemoryRouter>
      <MenuPrincipal
        cantidadCarrito={2}
        sesion={sesion}
        tema="oscuro"
        onCambiarTema={vi.fn()}
        onCerrarSesion={vi.fn()}
      />
    </MemoryRouter>
  )
}

describe('MenuPrincipal', () => {

  it('PU-022: el botón ☰ abre y cierra el menú (estado abierto)', () => {
    // Arrange
    renderizarMenu(null)
    const boton = screen.getByRole('button', { name: '☰ Menú' })

    // Act
    fireEvent.click(boton)

    // Assert
    expect(boton).toHaveAttribute('aria-expanded', 'true')
    expect(boton.textContent).toBe('✕ Cerrar menú')
  })

  it('PU-023: sin sesión muestra Ingresar y oculta el Panel de Control', () => {
    // Arrange
    const sesion = null

    // Act
    renderizarMenu(sesion)

    // Assert
    expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Panel de Control' })).not.toBeInTheDocument()
  })

  it('PU-024: con sesión de administrador muestra Panel de Control y Cerrar sesión', () => {
    // Arrange
    const sesion = { correo: 'admin@duoc.cl', rol: 'administrador' }

    // Act
    renderizarMenu(sesion)

    // Assert
    expect(screen.getByRole('link', { name: 'Panel de Control' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Ingresar' })).not.toBeInTheDocument()
  })

})
