import { useState } from 'react'
import Boton from '../atoms/Boton'
import BotonFavorito from '../atoms/BotonFavorito'
import DatoEtiquetado from '../atoms/DatoEtiquetado'
import ImagenProducto from '../atoms/ImagenProducto'
import Precio from '../atoms/Precio'
import SelectorCantidad from '../molecules/SelectorCantidad'
import { categorias, textoDeOpcion } from '../../data/opciones'
import { formatearPrecio } from '../../utils/formato'

// Detalle de un producto (antes js/producto.js): calcula el subtotal y agrega al carrito
function DetalleProducto({ producto, esFavorito, onToggleFavorito, onAgregarCarrito }) {
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const { nombre, precio, descripcion, imagen, categoria, marca, stock } = producto

  // Devuelve la cantidad como número, o null si no es válida (y deja el aviso en pantalla)
  const leerCantidad = (revisarStock) => {
    const numero = Number(cantidad)
    if (!Number.isInteger(numero) || numero <= 0) {
      setMensaje('Ingresa una cantidad valida.')
      return null
    }
    if (revisarStock && numero > stock) {
      setMensaje(`Solo hay ${stock} unidades disponibles.`)
      return null
    }
    return numero
  }

  const calcularSubtotal = () => {
    const numero = leerCantidad(false)
    if (numero === null) return
    setMensaje('Subtotal: ' + formatearPrecio(precio * numero))
  }

  const agregarAlCarrito = () => {
    const numero = leerCantidad(true)
    if (numero === null) return
    onAgregarCarrito(producto, numero)
    setMensaje(`Agregaste ${numero} unidad(es) al carrito.`)
  }

  return (
    <div className="detalle-grid">
      <ImagenProducto src={imagen} alt={nombre} claseContenedor="detalle-imagen-wrap" />

      <div className="detalle-info">
        <h1>{nombre}</h1>
        <Precio valor={precio} />
        <p>{descripcion}</p>
        <DatoEtiquetado etiqueta="Categoria" valor={textoDeOpcion(categorias, categoria)} />
        <DatoEtiquetado etiqueta="Marca" valor={marca} />
        <DatoEtiquetado etiqueta="Stock disponible" valor={stock > 0 ? `${stock} unidades` : 'Sin stock'} />

        <SelectorCantidad cantidad={cantidad} maximo={stock} onCambiar={setCantidad} />

        <div className="acciones-detalle">
          <Boton onClick={calcularSubtotal}>Calcular</Boton>
          <Boton onClick={agregarAlCarrito} disabled={stock < 1}>Agregar al carrito</Boton>
          <BotonFavorito esFavorito={esFavorito} onClick={() => onToggleFavorito(producto.id)} />
        </div>

        <p id="mensaje-subtotal">{mensaje}</p>
      </div>
    </div>
  );
}

export default DetalleProducto;
