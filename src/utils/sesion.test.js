import { describe, it, expect } from 'vitest'
import { autenticar, guardarSesion, obtenerSesion, cerrarSesion } from './sesion'

describe('sesión con localStorage', () => {

  it('PU-014: autenticar devuelve el usuario SIN la contraseña cuando las credenciales son correctas', () => {
    // Arrange
    const correo = 'admin@duoc.cl'
    const contrasena = 'admin123'

    // Act
    const usuario = autenticar(correo, contrasena)

    // Assert
    expect(usuario.rol).toBe('administrador')
    expect(usuario).not.toHaveProperty('contrasena')
  })

  it('PU-015: guardar, leer y cerrar la sesión en localStorage', () => {
    // Arrange
    const usuario = { correo: 'cliente@gmail.com', rol: 'cliente' }

    // Act
    guardarSesion(usuario)
    const leida = obtenerSesion()
    cerrarSesion()
    const despuesDeCerrar = obtenerSesion()

    // Assert
    expect(leida).toEqual(usuario)
    expect(despuesDeCerrar).toBeNull()
  })

})
