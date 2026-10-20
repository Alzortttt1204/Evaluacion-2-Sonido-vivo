// Opciones de las listas desplegables. Todas usan la forma { valor, texto }.

export const categorias = [
  { valor: 'guitarras', texto: 'Guitarras' },
  { valor: 'bajos', texto: 'Bajos' },
  { valor: 'baterias', texto: 'Baterías' },
  { valor: 'teclados', texto: 'Teclados' },
  { valor: 'amplificadores', texto: 'Amplificadores' },
  { valor: 'microfonos', texto: 'Micrófonos' },
  { valor: 'pedales', texto: 'Pedales' },
  { valor: 'accesorios', texto: 'Accesorios' },
]

export const tiposUsuario = [
  { valor: 'administrador', texto: 'Administrador' },
  { valor: 'cliente', texto: 'Cliente' },
  { valor: 'vendedor', texto: 'Vendedor' },
]

// Comunas de la Región de Valparaíso, donde está la tienda
export const comunas = [
  { valor: 'Viña del Mar', texto: 'Viña del Mar' },
  { valor: 'Valparaíso', texto: 'Valparaíso' },
  { valor: 'Concón', texto: 'Concón' },
  { valor: 'Quilpué', texto: 'Quilpué' },
  { valor: 'Villa Alemana', texto: 'Villa Alemana' },
  { valor: 'Quillota', texto: 'Quillota' },
  { valor: 'San Antonio', texto: 'San Antonio' },
  { valor: 'Los Andes', texto: 'Los Andes' },
]

export const instrumentos = [
  { valor: 'Guitarra', texto: 'Guitarra' },
  { valor: 'Bajo', texto: 'Bajo' },
  { valor: 'Batería', texto: 'Batería' },
  { valor: 'Teclado / Piano', texto: 'Teclado / Piano' },
  { valor: 'Voz', texto: 'Voz' },
  { valor: 'Otro', texto: 'Otro' },
]

export const nivelesMusicales = [
  { valor: 'Principiante', texto: 'Principiante' },
  { valor: 'Intermedio', texto: 'Intermedio' },
  { valor: 'Avanzado', texto: 'Avanzado' },
  { valor: 'Profesional', texto: 'Profesional' },
]

export const motivosContacto = [
  { valor: 'cotizacion', texto: 'Cotizar un instrumento' },
  { valor: 'stock', texto: 'Consultar stock' },
  { valor: 'servicio-tecnico', texto: 'Servicio técnico / reparación' },
  { valor: 'otro', texto: 'Otro' },
]

export const tiposEntrega = [
  { valor: 'retiro', texto: 'Retiro en tienda (Viña del Mar)' },
  { valor: 'despacho', texto: 'Despacho a domicilio' },
]

// Medios de pago simulados: el sitio no procesa pagos reales
export const mediosPago = [
  { valor: 'transferencia', texto: 'Transferencia bancaria' },
  { valor: 'debito', texto: 'Tarjeta de débito' },
  { valor: 'credito', texto: 'Tarjeta de crédito' },
  { valor: 'efectivo', texto: 'Efectivo al retirar' },
]

// Devuelve el texto que corresponde a un valor (por ejemplo 'baterias' -> 'Baterías')
export function textoDeOpcion(opciones, valor) {
  const opcion = opciones.find((item) => item.valor === valor)
  return opcion ? opcion.texto : valor
}
