import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormularioRegistro from './FormularioRegistro'

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
}

// Completa todos los campos obligatorios de la primera entrega (sin los de contexto)
function completarDatosBase() {
  escribir('RUN (sin puntos ni guión):', '19011022K')
  escribir('Nombre:', 'Ignacio')
  escribir('Apellidos:', 'Hidalgo Soto')
  escribir('Correo electrónico:', 'ignacio@duoc.cl')
  escribir('Dirección:', 'Av. Libertad 100')
  escribir('Comuna:', 'Viña del Mar')
  escribir('Tipo de usuario:', 'cliente')
  escribir('Contraseña:', 'clave1')
  escribir('Repetir contraseña:', 'clave1')
}

describe('FormularioRegistro', () => {

  it('PU-027: exige el campo de contexto "Instrumento principal" y deja el cursor en él', () => {
    // Arrange
    render(<FormularioRegistro />)
    completarDatosBase()

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }))

    // Assert
    expect(screen.getByText('Debe seleccionar su instrumento principal')).toBeInTheDocument()
    expect(screen.getByLabelText('Instrumento principal:')).toHaveFocus()
  })

  it('PU-028: con todos los datos correctos confirma el registro y limpia el formulario', () => {
    // Arrange
    render(<FormularioRegistro />)
    completarDatosBase()
    escribir('Instrumento principal:', 'Bajo')
    escribir('Nivel musical:', 'Intermedio')

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }))

    // Assert
    expect(screen.getByText(/Registro realizado correctamente/)).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre:')).toHaveValue('')
  })

})
