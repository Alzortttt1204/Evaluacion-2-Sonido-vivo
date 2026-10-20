import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListaCampos from '../molecules/ListaCampos'
import { camposLogin, valoresVacios } from '../../data/formularios'
import { textosLogin } from '../../data/textos'
import { validarLogin } from '../../utils/validaciones'
import { autenticar, guardarSesion } from '../../utils/sesion'
import { enfocarCampo } from '../../utils/formato'

function FormularioLogin({ onLogin }) {
  const [datos, setDatos] = useState(valoresVacios(camposLogin))
  const [error, setError] = useState(null)

  const manejarCambio = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  const manejarEnvio = (event) => {
    // Evita que la página se recargue (comportamiento por defecto del formulario)
    event.preventDefault()

    // 1. Validaciones de la primera entrega
    const errorEncontrado = validarLogin(datos)
    if (errorEncontrado) {
      setError(errorEncontrado)
      enfocarCampo(errorEncontrado.campo)
      return
    }

    // 2. Comparación con las credenciales estáticas
    const usuario = autenticar(datos.correo, datos.contrasena)
    if (!usuario) {
      setError({ campo: 'contrasena', mensaje: textosLogin.credencialesIncorrectas })
      enfocarCampo('contrasena')
      return
    }

    // 3. Se guarda la sesión en localStorage y se avisa a App
    setError(null)
    guardarSesion(usuario)
    onLogin(usuario)
  }

  return (
    <Form id="formulario-login" noValidate onSubmit={manejarEnvio}>
      <fieldset>
        <legend>{textosLogin.leyenda}</legend>
        <ListaCampos campos={camposLogin} datos={datos} error={error} onChange={manejarCambio} />
        <Button type="submit" variant="warning">{textosLogin.boton}</Button>
      </fieldset>
    </Form>
  );
}

export default FormularioLogin;
