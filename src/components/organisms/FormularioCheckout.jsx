import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListaCampos from '../molecules/ListaCampos'
import { camposCheckout, valoresVacios } from '../../data/formularios'
import { textosCarrito } from '../../data/textos'
import { validarCheckout } from '../../utils/validaciones'
import { enfocarCampo } from '../../utils/formato'

// Si hay sesión iniciada, se rellenan nombre, correo y teléfono con los datos del usuario
function valoresIniciales(sesion) {
  const valores = valoresVacios(camposCheckout)
  if (sesion) {
    valores.nombre = `${sesion.nombre} ${sesion.apellidos}`
    valores.correo = sesion.correo
    valores.telefono = sesion.telefono
  }
  return valores
}

function FormularioCheckout({ sesion, onConfirmar }) {
  const [datos, setDatos] = useState(valoresIniciales(sesion))
  const [error, setError] = useState(null)

  // Comuna y dirección solo aparecen cuando se elige "Despacho a domicilio"
  const camposVisibles = camposCheckout.filter(
    (campo) => !campo.soloDespacho || datos.entrega === 'despacho'
  )

  const manejarCambio = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  const manejarEnvio = (event) => {
    event.preventDefault()

    const errorEncontrado = validarCheckout(datos)
    if (errorEncontrado) {
      setError(errorEncontrado)
      enfocarCampo(errorEncontrado.campo)
      return
    }

    setError(null)
    onConfirmar(datos)
  }

  return (
    <Form id="formulario-checkout" noValidate onSubmit={manejarEnvio}>
      <fieldset>
        <legend>{textosCarrito.leyendaCheckout}</legend>
        <ListaCampos campos={camposVisibles} datos={datos} error={error} onChange={manejarCambio} />
        <p className="nota-formulario">{textosCarrito.notaPago}</p>
        <Button type="submit" variant="warning">{textosCarrito.botonConfirmar}</Button>
      </fieldset>
    </Form>
  );
}

export default FormularioCheckout;
