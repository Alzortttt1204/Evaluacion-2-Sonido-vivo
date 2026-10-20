import { useState } from 'react'
import AlertaMensaje from '../components/atoms/AlertaMensaje'
import Seccion from '../components/molecules/Seccion'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductosAdmin from '../components/organisms/TablaProductosAdmin'
import { textosAdmin } from '../data/textos'
import { buscarProductoPorId } from '../utils/productos'

// Panel de Control (ruta privada): CRUD de productos en memoria
function Admin({ productos, onCrearProducto, onActualizarProducto, onEliminarProducto }) {
  const [productoEditando, setProductoEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const guardar = (datos) => {
    if (productoEditando) {
      onActualizarProducto(productoEditando.id, datos)
      setMensaje(`Producto "${datos.nombre}" actualizado.`)
      setProductoEditando(null)
    } else {
      onCrearProducto(datos)
      setMensaje(`Producto "${datos.nombre}" agregado al catálogo.`)
    }
  }

  const editar = (producto) => {
    setProductoEditando(producto)
    setMensaje('')
  }

  const eliminar = (id) => {
    const producto = buscarProductoPorId(productos, id)
    onEliminarProducto(id)
    setMensaje(`Producto "${producto.nombre}" eliminado.`)
    if (productoEditando && productoEditando.id === id) setProductoEditando(null)
  }

  return (
    <Seccion id="panel-control" titulo={textosAdmin.titulo}>
      <p>{textosAdmin.descripcion}</p>
      <AlertaMensaje texto={mensaje} />

      <div className="panel-admin">
        <div className="panel-admin-formulario">
          {/* La key cambia al elegir otro producto, así el formulario se vuelve a crear con sus datos */}
          <FormularioProducto
            key={productoEditando ? productoEditando.id : 'nuevo'}
            productoInicial={productoEditando}
            onGuardar={guardar}
            onCancelar={() => setProductoEditando(null)}
          />
        </div>

        <div className="panel-admin-tabla">
          <h3>{textosAdmin.tituloTabla} ({productos.length})</h3>
          <TablaProductosAdmin productos={productos} onEditar={editar} onEliminar={eliminar} />
        </div>
      </div>
    </Seccion>
  );
}

export default Admin;
