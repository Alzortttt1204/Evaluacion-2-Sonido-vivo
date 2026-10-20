// Manejo de la sesión con localStorage.
// La sesión guarda los datos del usuario SIN la contraseña.
import { usuarios } from '../data/usuarios'

const CLAVE_SESION = 'sesionSonidoVivo'

// Compara el correo y la contraseña con las cuentas estáticas.
// Devuelve los datos del usuario (sin contraseña) o null si no coinciden.
export function autenticar(correo, contrasena) {
  const correoNormalizado = correo.trim().toLowerCase()
  const usuario = usuarios.find(
    (item) => item.correo === correoNormalizado && item.contrasena === contrasena
  )
  if (!usuario) return null

  const datosSesion = { ...usuario }
  delete datosSesion.contrasena
  return datosSesion
}

export function guardarSesion(usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
}

export function obtenerSesion() {
  const guardada = localStorage.getItem(CLAVE_SESION)
  if (!guardada) return null
  try {
    return JSON.parse(guardada)
  } catch {
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}
