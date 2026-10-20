import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { guardarSesion } from './utils/sesion'

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
}

describe('App (rutas y estado compartido)', () => {

  it('PU-037: una ruta que no existe muestra la página 404', () => {
    // Arrange
    const rutaInexistente = '/pagina-que-no-existe'

    // Act
    render(
      <MemoryRouter initialEntries={[rutaInexistente]}>
        <App />
      </MemoryRouter>
    )

    // Assert
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('PU-038: un producto creado en el Panel de Control aparece en el catálogo', () => {
    // Arrange: administrador con sesión iniciada, entrando al Panel
    guardarSesion({ correo: 'admin@duoc.cl', rol: 'administrador', nombre: 'Administrador', apellidos: 'Sonido Vivo' })
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    )
    escribir('Nombre del producto:', 'Ukelele Soprano')
    escribir('Marca:', 'Kala')
    escribir('Categoría:', 'guitarras')
    escribir('Precio (CLP):', '59990')
    escribir('Stock disponible:', '4')
    escribir('Descripción:', 'Ukelele de 4 cuerdas')

    // Act: se guarda el producto y se navega al catálogo con el menú
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    fireEvent.click(screen.getByRole('link', { name: 'Productos' }))

    // Assert
    expect(screen.getByText('Ukelele Soprano')).toBeInTheDocument()
    expect(screen.getByText('Mostrando 9 de 9 productos')).toBeInTheDocument()
  })

})
