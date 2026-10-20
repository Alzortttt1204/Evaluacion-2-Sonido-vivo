import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormularioLogin from './FormularioLogin'

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
}

describe('FormularioLogin', () => {

  it('PU-025: con una contraseña incorrecta muestra el error y no inicia sesión', () => {
    // Arrange
    const onLogin = vi.fn()
    render(<FormularioLogin onLogin={onLogin} />)
    escribir('Correo electrónico:', 'admin@duoc.cl')
    escribir('Contraseña:', 'mala123')

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    // Assert
    expect(screen.getByText('Correo o contraseña incorrectos')).toBeInTheDocument()
    expect(onLogin).not.toHaveBeenCalled()
    expect(localStorage.getItem('sesionSonidoVivo')).toBeNull()
  })

  it('PU-026: con credenciales correctas guarda la sesión en localStorage y avisa a App', () => {
    // Arrange
    const onLogin = vi.fn()
    render(<FormularioLogin onLogin={onLogin} />)
    escribir('Correo electrónico:', 'cliente@gmail.com')
    escribir('Contraseña:', 'cliente123')

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    // Assert
    const sesionGuardada = JSON.parse(localStorage.getItem('sesionSonidoVivo'))
    expect(sesionGuardada.correo).toBe('cliente@gmail.com')
    expect(sesionGuardada).not.toHaveProperty('contrasena')
    expect(onLogin).toHaveBeenCalledWith(expect.objectContaining({ rol: 'cliente' }))
  })

})
