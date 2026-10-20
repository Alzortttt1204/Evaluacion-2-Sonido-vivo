// Validaciones de los formularios.
// Son las mismas reglas de la primera entrega (js/login.js, js/registro.js y js/contacto.js),
// ahora como funciones puras: reciben los datos y devuelven el PRIMER error encontrado
// como { campo, mensaje }, o null si todo está correcto.
import { fechaHoy, restarAnios } from './formato'

const EDAD_MINIMA = 13
const EDAD_MAXIMA = 120

const expresionCorreo = /^[A-Za-z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/
const expresionRun = /^[0-9]+[0-9Kk]$/
const expresionSoloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/
const expresionTelefono = /^9[0-9]{8}$/

function error(campo, mensaje) {
  return { campo, mensaje }
}

function estaVacio(valor) {
  return valor === undefined || valor === null || String(valor).trim() === ''
}

export function esCorreoValido(correo) {
  return expresionCorreo.test(correo)
}

// Revisa un correo: obligatorio, máximo 100 caracteres y dominio permitido
function validarCorreo(correo) {
  if (estaVacio(correo)) return error('correo', 'Debe ingresar un correo')
  if (correo.length > 100) return error('correo', 'El correo no puede superar los 100 caracteres')
  if (!esCorreoValido(correo)) {
    return error('correo', 'Dominio invalido. Ingrese un dominio valido (gmail.com, duoc.cl, profesor.duoc.cl)')
  }
  return null
}

// Revisa un nombre o apellido: obligatorio, largo máximo y solo letras
function validarTextoPersona(campo, valor, etiqueta, maximo) {
  if (estaVacio(valor)) return error(campo, `Debe ingresar ${etiqueta}`)
  if (valor.length > maximo) return error(campo, `El campo no puede superar los ${maximo} caracteres`)
  if (!expresionSoloLetras.test(valor)) return error(campo, 'Este campo solo puede contener letras')
  return null
}

// La fecha de nacimiento es opcional. Si se ingresa, no puede ser posterior a hoy y la persona
// debe tener entre 13 y 120 años. Las fechas AAAA-MM-DD se pueden comparar directamente como texto.
function validarFechaNacimiento(fenac) {
  if (estaVacio(fenac)) return null

  const hoy = fechaHoy()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fenac)) return error('fenac', 'La fecha de nacimiento no es válida')
  if (fenac > hoy) return error('fenac', 'La fecha de nacimiento no puede ser posterior a hoy')
  if (fenac > restarAnios(hoy, EDAD_MINIMA)) {
    return error('fenac', `Debe tener al menos ${EDAD_MINIMA} años para registrarse`)
  }
  if (fenac < restarAnios(hoy, EDAD_MAXIMA)) {
    return error('fenac', `La fecha de nacimiento no es válida (más de ${EDAD_MAXIMA} años)`)
  }
  return null
}

export function validarLogin({ correo, contrasena }) {
  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) return errorCorreo
  if (estaVacio(contrasena)) return error('contrasena', 'Debe ingresar una contraseña')
  if (contrasena.length < 4 || contrasena.length > 10) {
    return error('contrasena', 'La contraseña debe tener entre 4 y 10 caracteres')
  }
  return null
}

export function validarRegistro(datos) {
  const { run, nombre, apellidos, correo, fenac, telefono, direccion, comuna,
    tipoUsuario, instrumento, nivel, contrasena, repetirContrasena } = datos

  if (estaVacio(run)) return error('run', 'El run no debe estar vacio')
  if (run.length < 7 || run.length > 9) return error('run', 'Largo del run no valido')
  if (!expresionRun.test(run)) return error('run', 'Formato del run no valido')

  const errorNombre = validarTextoPersona('nombre', nombre, 'un nombre', 50)
  if (errorNombre) return errorNombre

  const errorApellidos = validarTextoPersona('apellidos', apellidos, 'sus apellidos', 100)
  if (errorApellidos) return errorApellidos

  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) return errorCorreo

  const errorFecha = validarFechaNacimiento(fenac)
  if (errorFecha) return errorFecha

  // Campos de contexto de la tienda
  if (!estaVacio(telefono) && !expresionTelefono.test(telefono)) {
    return error('telefono', 'El teléfono debe tener 9 dígitos y comenzar con 9')
  }

  if (estaVacio(direccion)) return error('direccion', 'Debe ingresar una dirección')
  if (direccion.length > 300) return error('direccion', 'La direccion no puede superar los 300 caracteres')

  if (estaVacio(comuna)) return error('comuna', 'Debe seleccionar una comuna')
  if (estaVacio(tipoUsuario)) return error('tipoUsuario', 'Debe seleccionar un tipo de usuario')
  if (estaVacio(instrumento)) return error('instrumento', 'Debe seleccionar su instrumento principal')
  if (estaVacio(nivel)) return error('nivel', 'Debe seleccionar su nivel musical')

  if (estaVacio(contrasena)) return error('contrasena', 'Debe ingresar una contraseña')
  if (contrasena.length < 4 || contrasena.length > 10) {
    return error('contrasena', 'La contraseña debe tener entre 4 y 10 caracteres')
  }
  if (estaVacio(repetirContrasena)) return error('repetirContrasena', 'Debe repetir la contraseña')
  if (contrasena !== repetirContrasena) return error('repetirContrasena', 'Las contraseñas no coinciden')

  return null
}

export function validarContacto({ nombre, correo, motivo, comentario }) {
  const errorNombre = validarTextoPersona('nombre', nombre, 'un nombre', 100)
  if (errorNombre) return errorNombre

  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) return errorCorreo

  if (estaVacio(motivo)) return error('motivo', 'Debe seleccionar el motivo de contacto')

  if (estaVacio(comentario)) return error('comentario', 'Debe ingresar un comentario')
  if (comentario.length > 500) return error('comentario', 'El comentario no puede superar los 500 caracteres')

  return null
}

export function validarProducto({ nombre, marca, categoria, precio, stock, descripcion }) {
  if (estaVacio(nombre)) return error('nombre', 'Debe ingresar el nombre del producto')
  if (nombre.length > 60) return error('nombre', 'El nombre no puede superar los 60 caracteres')

  if (estaVacio(marca)) return error('marca', 'Debe ingresar la marca')
  if (marca.length > 40) return error('marca', 'La marca no puede superar los 40 caracteres')

  if (estaVacio(categoria)) return error('categoria', 'Debe seleccionar una categoría')

  const precioNumero = Number(precio)
  if (estaVacio(precio)) return error('precio', 'Debe ingresar el precio')
  if (!Number.isInteger(precioNumero) || precioNumero <= 0) {
    return error('precio', 'El precio debe ser un número entero mayor a 0')
  }
  if (precioNumero > 9999999) return error('precio', 'El precio no puede superar $9.999.999')

  const stockNumero = Number(stock)
  if (estaVacio(stock)) return error('stock', 'Debe ingresar el stock')
  if (!Number.isInteger(stockNumero) || stockNumero < 0) {
    return error('stock', 'El stock debe ser un número entero igual o mayor a 0')
  }
  if (stockNumero > 999) return error('stock', 'El stock no puede superar las 999 unidades')

  if (estaVacio(descripcion)) return error('descripcion', 'Debe ingresar una descripción')
  if (descripcion.length > 200) return error('descripcion', 'La descripción no puede superar los 200 caracteres')

  return null
}

export function validarCheckout({ nombre, correo, telefono, entrega, comuna, direccion, pago }) {
  const errorNombre = validarTextoPersona('nombre', nombre, 'un nombre', 100)
  if (errorNombre) return errorNombre

  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) return errorCorreo

  if (estaVacio(telefono)) return error('telefono', 'Debe ingresar un teléfono de contacto')
  if (!expresionTelefono.test(telefono)) return error('telefono', 'El teléfono debe tener 9 dígitos y comenzar con 9')

  if (estaVacio(entrega)) return error('entrega', 'Debe seleccionar el tipo de entrega')

  // Comuna y dirección solo se piden cuando el pedido es con despacho
  if (entrega === 'despacho') {
    if (estaVacio(comuna)) return error('comuna', 'Debe seleccionar una comuna')
    if (estaVacio(direccion)) return error('direccion', 'Debe ingresar la dirección de despacho')
    if (direccion.length > 300) return error('direccion', 'La direccion no puede superar los 300 caracteres')
  }

  if (estaVacio(pago)) return error('pago', 'Debe seleccionar un medio de pago')

  return null
}
