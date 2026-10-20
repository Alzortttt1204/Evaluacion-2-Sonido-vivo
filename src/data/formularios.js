// Campos de los formularios. Cada formulario recorre su arreglo con .map()
// y dibuja un CampoFormulario por cada elemento.
import {
  categorias, tiposUsuario, comunas, instrumentos, nivelesMusicales,
  motivosContacto, tiposEntrega, mediosPago,
} from './opciones'
import { fechaHoy, restarAnios } from '../utils/formato'

export const camposLogin = [
  { name: 'correo', label: 'Correo electrónico:', type: 'email', placeholder: 'tucorreo@duoc.cl' },
  { name: 'contrasena', label: 'Contraseña:', type: 'password' },
]

export const camposRegistro = [
  { name: 'run', label: 'RUN (sin puntos ni guión):', placeholder: '19011022K' },
  { name: 'nombre', label: 'Nombre:', placeholder: 'Ingrese su nombre' },
  { name: 'apellidos', label: 'Apellidos:', placeholder: 'Ingrese sus apellidos' },
  { name: 'correo', label: 'Correo electrónico:', type: 'email', placeholder: 'tucorreo@duoc.cl' },
  // min y max hacen que el calendario no deje elegir fechas fuera del rango (13 a 120 años)
  { name: 'fenac', label: 'Fecha de nacimiento (opcional):', type: 'date', min: restarAnios(fechaHoy(), 120), max: restarAnios(fechaHoy(), 13) },
  { name: 'telefono', label: 'Teléfono (opcional):', type: 'tel', placeholder: '912345678' },
  { name: 'direccion', label: 'Dirección:', placeholder: 'Ingrese su dirección' },
  { name: 'comuna', label: 'Comuna:', as: 'select', opciones: comunas, placeholderOpcion: '-- SELECCIONE UNA COMUNA --' },
  { name: 'tipoUsuario', label: 'Tipo de usuario:', as: 'select', opciones: tiposUsuario, placeholderOpcion: '-- SELECCIONE UN TIPO --' },
  { name: 'instrumento', label: 'Instrumento principal:', as: 'select', opciones: instrumentos, placeholderOpcion: '-- SELECCIONE UN INSTRUMENTO --' },
  { name: 'nivel', label: 'Nivel musical:', as: 'select', opciones: nivelesMusicales, placeholderOpcion: '-- SELECCIONE SU NIVEL --' },
  { name: 'contrasena', label: 'Contraseña:', type: 'password', placeholder: 'Ingrese su contraseña' },
  { name: 'repetirContrasena', label: 'Repetir contraseña:', type: 'password', placeholder: 'Repita su contraseña' },
]

export const camposContacto = [
  { name: 'nombre', label: 'Nombre completo:', placeholder: 'Ingrese su nombre' },
  { name: 'correo', label: 'Correo electrónico:', type: 'email', placeholder: 'tucorreo@duoc.cl' },
  { name: 'motivo', label: 'Motivo de contacto:', as: 'select', opciones: motivosContacto, placeholderOpcion: '-- SELECCIONE UN MOTIVO --' },
  { name: 'instrumentoInteres', label: 'Instrumento de interés (opcional):', as: 'select', opciones: categorias, placeholderOpcion: '-- NINGUNO EN PARTICULAR --' },
  { name: 'comentario', label: 'Comentario:', as: 'textarea', rows: 5, placeholder: 'Escriba su comentario' },
]

export const camposProducto = [
  { name: 'nombre', label: 'Nombre del producto:', placeholder: 'Ej: Guitarra Acustica Clasica' },
  { name: 'marca', label: 'Marca:', placeholder: 'Ej: Yamaha' },
  { name: 'categoria', label: 'Categoría:', as: 'select', opciones: categorias, placeholderOpcion: '-- SELECCIONE UNA CATEGORÍA --' },
  { name: 'precio', label: 'Precio (CLP):', type: 'number', placeholder: 'Ej: 129990', min: 1 },
  { name: 'stock', label: 'Stock disponible:', type: 'number', placeholder: 'Ej: 5', min: 0 },
  { name: 'descripcion', label: 'Descripción:', as: 'textarea', rows: 3, placeholder: 'Descripción corta del producto' },
]

// Los campos con soloDespacho: true se muestran solo si el cliente elige "Despacho a domicilio"
export const camposCheckout = [
  { name: 'nombre', label: 'Nombre completo:', placeholder: 'Ingrese su nombre' },
  { name: 'correo', label: 'Correo electrónico:', type: 'email', placeholder: 'tucorreo@duoc.cl' },
  { name: 'telefono', label: 'Teléfono de contacto:', type: 'tel', placeholder: '912345678' },
  { name: 'entrega', label: 'Tipo de entrega:', as: 'select', opciones: tiposEntrega, placeholderOpcion: '-- SELECCIONE EL TIPO DE ENTREGA --' },
  { name: 'comuna', label: 'Comuna:', as: 'select', opciones: comunas, placeholderOpcion: '-- SELECCIONE UNA COMUNA --', soloDespacho: true },
  { name: 'direccion', label: 'Dirección de despacho:', placeholder: 'Calle, número, depto.', soloDespacho: true },
  { name: 'pago', label: 'Medio de pago:', as: 'select', opciones: mediosPago, placeholderOpcion: '-- SELECCIONE UN MEDIO DE PAGO --' },
]

// Devuelve un objeto { campo: '' } con todos los campos vacíos (estado inicial del formulario)
export function valoresVacios(campos) {
  const valores = {}
  campos.forEach((campo) => {
    valores[campo.name] = ''
  })
  return valores
}
