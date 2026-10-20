// Catálogo inicial de la tienda (migrado desde js/productos-data.js).
// Se agregan marca y stock como datos propios de una tienda de instrumentos.
import guitarra from '../img/guitarra-stratocaster.jpg'
import bajo from '../img/bajo-jazz-bass.jpg'
import bateria from '../img/bateria-5-piezas.jpg'
import teclado from '../img/teclado-61-teclas.jpg'
import amplificador from '../img/amplificador-20w.jpg'
import microfono from '../img/microfono-dinamico.jpg'
import pedal from '../img/pedal-overdrive.jpg'
import puas from '../img/set-puas-correa.jpg'
import generica from '../img/producto-generico.svg'

// Imagen que se asigna a los productos creados desde el Panel de Control
export const imagenGenerica = generica

export const productosIniciales = [
  {
    id: 1,
    nombre: 'Guitarra Electrica Stratocaster',
    precio: 349990,
    descripcion: 'Guitarra electrica cuerpo solido, 3 pastillas single coil, ideal para rock y blues.',
    imagen: guitarra,
    categoria: 'guitarras',
    marca: 'Fender',
    stock: 5,
  },
  {
    id: 2,
    nombre: 'Bajo Electrico Jazz Bass',
    precio: 289990,
    descripcion: 'Bajo de 4 cuerdas, cuerpo de tilo, sonido calido y versatil.',
    imagen: bajo,
    categoria: 'bajos',
    marca: 'Fender',
    stock: 3,
  },
  {
    id: 3,
    nombre: 'Bateria Acustica 5 Piezas',
    precio: 549990,
    descripcion: 'Set completo de bateria con platillos, ideal para estudio y ensayo.',
    imagen: bateria,
    categoria: 'baterias',
    marca: 'Pearl',
    stock: 2,
  },
  {
    id: 4,
    nombre: 'Teclado Digital 61 Teclas',
    precio: 199990,
    descripcion: 'Teclado digital con multiples sonidos y ritmos incorporados, sensible al toque.',
    imagen: teclado,
    categoria: 'teclados',
    marca: 'Yamaha',
    stock: 6,
  },
  {
    id: 5,
    nombre: 'Amplificador de Guitarra 20W',
    precio: 89990,
    descripcion: 'Amplificador combo de 20 watts, canal limpio y canal con distorsion.',
    imagen: amplificador,
    categoria: 'amplificadores',
    marca: 'Marshall',
    stock: 8,
  },
  {
    id: 6,
    nombre: 'Microfono Vocal Dinamico',
    precio: 45990,
    descripcion: 'Microfono dinamico para voz, ideal para presentaciones en vivo.',
    imagen: microfono,
    categoria: 'microfonos',
    marca: 'Shure',
    stock: 10,
  },
  {
    id: 7,
    nombre: 'Pedal de Efectos Overdrive',
    precio: 39990,
    descripcion: 'Pedal de distorsion suave para guitarra electrica, tono clasico.',
    imagen: pedal,
    categoria: 'pedales',
    marca: 'Boss',
    stock: 7,
  },
  {
    id: 8,
    nombre: 'Set de Puas y Correa',
    precio: 14990,
    descripcion: 'Pack de puas variadas mas correa ajustable para guitarra o bajo.',
    imagen: puas,
    categoria: 'accesorios',
    marca: 'Dunlop',
    stock: 25,
  },
]
