import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListaCampos from '../molecules/ListaCampos'
import { camposProducto, valoresVacios } from '../../data/formularios'
import { textosAdmin } from '../../data/textos'
import { validarProducto } from '../../utils/validaciones'
import { enfocarCampo } from '../../utils/formato'

// Pasa un producto del catálogo a los valores del formulario (los inputs trabajan con texto)
function datosDesdeProducto(producto) {
  return {
    nombre: producto.nombre,
    marca: producto.marca,
    categoria: producto.categoria,
    precio: String(producto.precio),
    stock: String(producto.stock),
    descripcion: producto.descripcion,
  }
}

// Formulario del Panel de Control. Si recibe productoInicial está en modo edición.
function FormularioProducto({ productoInicial, onGuardar, onCancelar }) {
  const editando = Boolean(productoInicial)
  const [datos, setDatos] = useState(
    editando ? datosDesdeProducto(productoInicial) : valoresVacios(camposProducto)
  )
  const [error, setError] = useState(null)

  const manejarCambio = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  const manejarEnvio = (event) => {
    event.preventDefault()

    const errorEncontrado = validarProducto(datos)
    if (errorEncontrado) {
      setError(errorEncontrado)
      enfocarCampo(errorEncontrado.campo)
      return
    }

    setError(null)
    onGuardar({
      ...datos,
      nombre: datos.nombre.trim(),
      marca: datos.marca.trim(),
      descripcion: datos.descripcion.trim(),
    })
    if (!editando) setDatos(valoresVacios(camposProducto))
  }

  return (
    <Form id="formulario-producto" noValidate onSubmit={manejarEnvio}>
      <fieldset>
        <legend>{editando ? textosAdmin.leyendaEditar : textosAdmin.leyendaNuevo}</legend>
        <ListaCampos campos={camposProducto} datos={datos} error={error} onChange={manejarCambio} />
        {!editando && <p className="nota-formulario">{textosAdmin.notaImagen}</p>}

        <div className="botones-formulario">
          <Button type="submit" variant="warning">
            {editando ? textosAdmin.botonGuardar : textosAdmin.botonCrear}
          </Button>
          {editando && (
            <Button type="button" variant="secondary" onClick={onCancelar}>
              {textosAdmin.botonCancelar}
            </Button>
          )}
        </div>
      </fieldset>
    </Form>
  );
}

export default FormularioProducto;
