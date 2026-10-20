import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'
import RutaPrivada from './routes/RutaPrivada'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Producto from './pages/Producto'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Admin from './pages/Admin'
import Carrito from './pages/Carrito'
import Perfil from './pages/Perfil'
import NoEncontrado from './pages/NoEncontrado'

import { productosIniciales, imagenGenerica } from './data/productos'
import { agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, contarUnidades } from './utils/carrito'
import { crearProducto, actualizarProducto, eliminarProducto } from './utils/productos'
import { obtenerSesion, cerrarSesion } from './utils/sesion'

function App() {
  const navigate = useNavigate()

  // Estados que comparten varias páginas
  const [productos, setProductos] = useState(productosIniciales) // catálogo (CRUD en memoria)
  const [carrito, setCarrito] = useState([])                      // carrito de compras
  const [favoritos, setFavoritos] = useState([])                  // ids de productos favoritos
  const [sesion, setSesion] = useState(obtenerSesion())           // usuario guardado en localStorage
  const [tema, setTema] = useState('oscuro')                      // 'oscuro' (original) o 'claro'

  // Los cambios que dependen del valor anterior usan la forma setX((anterior) => ...),
  // así siempre se trabaja con el estado más reciente aunque haya varios cambios seguidos.

  // ----- Carrito -----
  const manejarAgregarCarrito = (producto, cantidad) => {
    setCarrito((anterior) => agregarAlCarrito(anterior, producto, cantidad))
  }

  const manejarCambiarCantidad = (id, cantidad) => {
    setCarrito((anterior) => cambiarCantidad(anterior, id, cantidad))
  }

  const manejarEliminarDelCarrito = (id) => {
    setCarrito((anterior) => eliminarDelCarrito(anterior, id))
  }

  const vaciarCarrito = () => setCarrito([])

  // ----- Favoritos -----
  const alternarFavorito = (id) => {
    setFavoritos((anterior) =>
      anterior.includes(id) ? anterior.filter((favorito) => favorito !== id) : [...anterior, id]
    )
  }

  // ----- Panel de Control (CRUD en memoria) -----
  const manejarCrearProducto = (datos) => {
    setProductos((anterior) => crearProducto(anterior, datos, imagenGenerica))
  }

  const manejarActualizarProducto = (id, datos) => {
    setProductos((anterior) => actualizarProducto(anterior, id, datos))
  }

  const manejarEliminarProducto = (id) => {
    setProductos((anterior) => eliminarProducto(anterior, id))
    setCarrito((anterior) => eliminarDelCarrito(anterior, id))
    setFavoritos((anterior) => anterior.filter((favorito) => favorito !== id))
  }

  // ----- Sesión -----
  const manejarLogin = (usuario) => setSesion(usuario)

  const manejarCerrarSesion = () => {
    cerrarSesion()
    setSesion(null)
    navigate('/login')
  }

  // ----- Tema -----
  const cambiarTema = () => setTema((anterior) => (anterior === 'oscuro' ? 'claro' : 'oscuro'))

  return (
    <div className={`app-container tema-${tema}`} data-bs-theme={tema === 'oscuro' ? 'dark' : 'light'}>
      <Header
        cantidadCarrito={contarUnidades(carrito)}
        sesion={sesion}
        tema={tema}
        onCambiarTema={cambiarTema}
        onCerrarSesion={manejarCerrarSesion}
      />

      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home productos={productos} />} />
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                favoritos={favoritos}
                onToggleFavorito={alternarFavorito}
                onAgregarCarrito={manejarAgregarCarrito}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={
              <Producto
                productos={productos}
                favoritos={favoritos}
                onToggleFavorito={alternarFavorito}
                onAgregarCarrito={manejarAgregarCarrito}
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login onLogin={manejarLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                sesion={sesion}
                onCambiarCantidad={manejarCambiarCantidad}
                onEliminar={manejarEliminarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route
            path="/perfil"
            element={
              <RutaPrivada>
                <Perfil
                  sesion={sesion}
                  productos={productos}
                  favoritos={favoritos}
                  onToggleFavorito={alternarFavorito}
                  onAgregarCarrito={manejarAgregarCarrito}
                  onCerrarSesion={manejarCerrarSesion}
                />
              </RutaPrivada>
            }
          />
          <Route
            path="/admin"
            element={
              <RutaPrivada rolRequerido="administrador">
                <Admin
                  productos={productos}
                  onCrearProducto={manejarCrearProducto}
                  onActualizarProducto={manejarActualizarProducto}
                  onEliminarProducto={manejarEliminarProducto}
                />
              </RutaPrivada>
            }
          />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
