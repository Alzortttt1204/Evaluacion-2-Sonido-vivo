import { useState } from 'react'
import Seccion from '../components/molecules/Seccion'
import BarraFiltros from '../components/molecules/BarraFiltros'
import GrillaProductos from '../components/organisms/GrillaProductos'
import { categorias } from '../data/opciones'
import { textosProductos } from '../data/textos'
import { filtrarProductos } from '../utils/productos'

function Productos({ productos, favoritos, onToggleFavorito, onAgregarCarrito }) {
  // Filtro dinámico: cada vez que cambia el texto o la categoría, la lista se vuelve a calcular
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('todas')

  const productosFiltrados = filtrarProductos(productos, texto, categoria)

  return (
    <Seccion id="catalogo">
      <h1>{textosProductos.titulo}</h1>

      <BarraFiltros
        texto={texto}
        categoria={categoria}
        categorias={categorias}
        onCambiarTexto={setTexto}
        onCambiarCategoria={setCategoria}
      />

      <p className="resultado-filtro">
        Mostrando {productosFiltrados.length} de {productos.length} productos
      </p>

      {productosFiltrados.length > 0 ? (
        <GrillaProductos
          id="lista-productos"
          productos={productosFiltrados}
          favoritos={favoritos}
          onToggleFavorito={onToggleFavorito}
          onAgregarCarrito={onAgregarCarrito}
        />
      ) : (
        <p className="mensaje-vacio">{textosProductos.sinResultados}</p>
      )}
    </Seccion>
  );
}

export default Productos;
