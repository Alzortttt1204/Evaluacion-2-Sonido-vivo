// Muestra un precio en pesos chilenos: 349990 -> "$349.990"
export function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL')
}

// Fecha de hoy (hora local) en formato AAAA-MM-DD, el mismo que entrega <input type="date">.
// No se usa new Date('AAAA-MM-DD') porque eso se interpreta en UTC y en Chile queda un día corrido de noche.
export function fechaHoy() {
  const hoy = new Date()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')
  return `${hoy.getFullYear()}-${mes}-${dia}`
}

// Resta años a una fecha AAAA-MM-DD: restarAnios('2026-10-16', 13) -> '2013-10-16'
export function restarAnios(fecha, anios) {
  return `${Number(fecha.slice(0, 4)) - anios}${fecha.slice(4)}`
}

// Pone el cursor en el campo que tiene el error (igual que .focus() en la primera entrega)
export function enfocarCampo(id) {
  const campo = document.getElementById(id)
  if (campo) campo.focus()
}
