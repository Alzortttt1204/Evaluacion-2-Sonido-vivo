import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertaMensaje from '../atoms/AlertaMensaje'
import ListaCampos from '../molecules/ListaCampos'
import { camposRegistro, valoresVacios } from '../../data/formularios'
import { textosRegistro } from '../../data/textos'
import { validarRegistro } from '../../utils/validaciones'
import { enfocarCampo } from '../../utils/formato'

function FormularioRegistro() {
  const [datos, setDatos] = useState(valoresVacios(camposRegistro))
  const [error, setError] = useState(null)
  const [exito, setExito] = useState('')

  const manejarCambio = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  const manejarEnvio = (event) => {
    event.preventDefault()

    const errorEncontrado = validarRegistro(datos)
    if (errorEncontrado) {
      setError(errorEncontrado)
      setExito('')
      enfocarCampo(errorEncontrado.campo)
      return
    }

    setError(null)
    setExito(`${textosRegistro.exito}. ¡Bienvenido/a a Sonido Vivo, ${datos.nombre}!`)
    setDatos(valoresVacios(camposRegistro))
  }

  return (
    <Form id="formulario-registro" noValidate onSubmit={manejarEnvio}>
      <fieldset>
        <legend>{textosRegistro.leyenda}</legend>
        <AlertaMensaje texto={exito} />
        <ListaCampos campos={camposRegistro} datos={datos} error={error} onChange={manejarCambio} />
        <Button type="submit" variant="warning">{textosRegistro.boton}</Button>
      </fieldset>
    </Form>
  );
}

export default FormularioRegistro;
