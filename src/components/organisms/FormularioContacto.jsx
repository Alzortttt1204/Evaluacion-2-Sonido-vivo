import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertaMensaje from '../atoms/AlertaMensaje'
import ListaCampos from '../molecules/ListaCampos'
import { camposContacto, valoresVacios } from '../../data/formularios'
import { textosContacto } from '../../data/textos'
import { validarContacto } from '../../utils/validaciones'
import { enfocarCampo } from '../../utils/formato'

function FormularioContacto() {
  const [datos, setDatos] = useState(valoresVacios(camposContacto))
  const [error, setError] = useState(null)
  const [exito, setExito] = useState('')

  const manejarCambio = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  const manejarEnvio = (event) => {
    event.preventDefault()

    const errorEncontrado = validarContacto(datos)
    if (errorEncontrado) {
      setError(errorEncontrado)
      setExito('')
      enfocarCampo(errorEncontrado.campo)
      return
    }

    // No hay servidor: el mensaje se confirma en pantalla y el formulario se limpia
    setError(null)
    setExito(textosContacto.exito)
    setDatos(valoresVacios(camposContacto))
  }

  return (
    <Form id="formulario-contacto" noValidate onSubmit={manejarEnvio}>
      <fieldset>
        <legend>{textosContacto.leyenda}</legend>
        <AlertaMensaje texto={exito} />
        <ListaCampos campos={camposContacto} datos={datos} error={error} onChange={manejarCambio} />
        <Button type="submit" variant="warning">{textosContacto.boton}</Button>
      </fieldset>
    </Form>
  );
}

export default FormularioContacto;
