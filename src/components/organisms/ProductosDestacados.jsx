import Seccion from '../molecules/Seccion'
import GrillaProductos from './GrillaProductos'
import { textosHome } from '../../data/textos'

// En el inicio se muestran los 4 primeros productos, sin descripción (igual que js/home.js)
function ProductosDestacados({ productos }) {
  return (
    <Seccion id="destacados" titulo={textosHome.destacados.titulo}>
      <GrillaProductos id="productos-home" productos={productos} mostrarDescripcion={false} />
    </Seccion>
  );
}

export default ProductosDestacados;
