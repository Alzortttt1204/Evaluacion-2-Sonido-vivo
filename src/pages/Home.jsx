import BienvenidaTienda from '../components/organisms/BienvenidaTienda'
import VideoTienda from '../components/organisms/VideoTienda'
import ProductosDestacados from '../components/organisms/ProductosDestacados'

function Home({ productos }) {
  return (
    <>
      <BienvenidaTienda />
      <VideoTienda />
      <ProductosDestacados productos={productos.slice(0, 4)} />
    </>
  );
}

export default Home;
