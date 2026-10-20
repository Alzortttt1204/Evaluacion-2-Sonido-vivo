import { describe, it, expect, vi, afterEach } from 'vitest'
import { validarLogin, validarRegistro, validarProducto, validarCheckout } from './validaciones'

// Datos de un registro correcto: cada prueba cambia solo el campo que quiere revisar
const registroValido = {
  run: '19011022K',
  nombre: 'Ignacio',
  apellidos: 'Hidalgo Soto',
  correo: 'ignacio@duoc.cl',
  fenac: '',
  telefono: '',
  direccion: 'Av. Libertad 100',
  comuna: 'Viña del Mar',
  tipoUsuario: 'cliente',
  instrumento: 'Bajo',
  nivel: 'Intermedio',
  contrasena: 'clave1',
  repetirContrasena: 'clave1',
}

describe('validaciones', () => {

  it('PU-001: validarLogin rechaza un correo con dominio no permitido', () => {
    // Arrange
    const datos = { correo: 'usuario@yahoo.com', contrasena: 'clave123' }

    // Act
    const resultado = validarLogin(datos)

    // Assert
    expect(resultado.campo).toBe('correo')
    expect(resultado.mensaje).toContain('Dominio invalido')
  })

  it('PU-002: validarRegistro acepta un registro con todos los datos correctos', () => {
    // Arrange
    const datos = { ...registroValido }

    // Act
    const resultado = validarRegistro(datos)

    // Assert
    expect(resultado).toBeNull()
  })

  it('PU-003: validarRegistro detecta un RUN con formato no válido', () => {
    // Arrange
    const datos = { ...registroValido, run: '1901A022K' }

    // Act
    const resultado = validarRegistro(datos)

    // Assert
    expect(resultado).toEqual({ campo: 'run', mensaje: 'Formato del run no valido' })
  })

  it('PU-004: validarRegistro detecta que las contraseñas no coinciden', () => {
    // Arrange
    const datos = { ...registroValido, repetirContrasena: 'otraClave' }

    // Act
    const resultado = validarRegistro(datos)

    // Assert
    expect(resultado).toEqual({ campo: 'repetirContrasena', mensaje: 'Las contraseñas no coinciden' })
  })

  it('PU-005: validarProducto exige un precio entero mayor a 0', () => {
    // Arrange
    const datos = { nombre: 'Ukelele', marca: 'Kala', categoria: 'guitarras', precio: '-500', stock: '3', descripcion: 'Ukelele soprano' }

    // Act
    const resultado = validarProducto(datos)

    // Assert
    expect(resultado.campo).toBe('precio')
  })

  it('PU-006: validarCheckout pide la dirección solo cuando la entrega es con despacho', () => {
    // Arrange
    const base = { nombre: 'Camila Rojas', correo: 'camila@gmail.com', telefono: '987654321', comuna: '', direccion: '', pago: 'transferencia' }

    // Act
    const conRetiro = validarCheckout({ ...base, entrega: 'retiro' })
    const conDespacho = validarCheckout({ ...base, entrega: 'despacho' })

    // Assert
    expect(conRetiro).toBeNull()
    expect(conDespacho.campo).toBe('comuna')
  })

})

describe('validaciones de la fecha de nacimiento', () => {

  // Se fija la fecha y hora del sistema para que las pruebas den lo mismo cualquier día
  afterEach(() => {
    vi.useRealTimers()
  })

  it('PU-039: rechaza una fecha de nacimiento de mañana, incluso a las 22:30', () => {
    // Arrange: "hoy" es el 16-10-2026 a las 22:30, hora local de Chile
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 16, 22, 30))
    const datos = { ...registroValido, fenac: '2026-10-17' }

    // Act
    const resultado = validarRegistro(datos)

    // Assert
    expect(resultado).toEqual({ campo: 'fenac', mensaje: 'La fecha de nacimiento no puede ser posterior a hoy' })
  })

  it('PU-040: exige entre 13 y 120 años y acepta una fecha válida', () => {
    // Arrange
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 16, 12, 0))

    // Act
    const muyJoven = validarRegistro({ ...registroValido, fenac: '2015-01-01' })
    const muyAntigua = validarRegistro({ ...registroValido, fenac: '1890-05-10' })
    const valida = validarRegistro({ ...registroValido, fenac: '2004-03-21' })

    // Assert
    expect(muyJoven).toEqual({ campo: 'fenac', mensaje: 'Debe tener al menos 13 años para registrarse' })
    expect(muyAntigua.campo).toBe('fenac')
    expect(valida).toBeNull()
  })

})
