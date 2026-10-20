import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormularioProducto from './FormularioProducto'

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })
}

describe('FormularioProducto (Panel de Control)', () => {

  it('PU-029: con datos válidos entrega el producto nuevo al Panel', () => {
    // Arrange
    const onGuardar = vi.fn()
    render(<FormularioProducto productoInicial={null} onGuardar={onGuardar} onCancelar={vi.fn()} />)
    escribir('Nombre del producto:', 'Ukelele Soprano')
    escribir('Marca:', 'Kala')
    escribir('Categoría:', 'guitarras')
    escribir('Precio (CLP):', '59990')
    escribir('Stock disponible:', '4')
    escribir('Descripción:', 'Ukelele de 4 cuerdas')

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))

    // Assert
    expect(onGuardar).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Ukelele Soprano',
      marca: 'Kala',
      categoria: 'guitarras',
      precio: '59990',
    }))
  })

  it('PU-030: en modo edición carga los datos del producto y cambia el botón', () => {
    // Arrange
    const producto = { id: 3, nombre: 'Bateria', marca: 'Pearl', categoria: 'baterias', precio: 549990, stock: 2, descripcion: 'Set completo' }

    // Act
    render(<FormularioProducto productoInicial={producto} onGuardar={vi.fn()} onCancelar={vi.fn()} />)

    // Assert
    expect(screen.getByLabelText('Nombre del producto:')).toHaveValue('Bateria')
    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeInTheDocument()
  })

})
