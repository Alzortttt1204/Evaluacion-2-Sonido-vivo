import Seccion from '../molecules/Seccion'
import { textosHome } from '../../data/textos'

function VideoTienda() {
  const { titulo, fuente, alternativo } = textosHome.video

  return (
    <Seccion id="video" titulo={titulo}>
      <video controls>
        <source src={fuente} type="video/mp4" />
        {alternativo}
      </video>
    </Seccion>
  );
}

export default VideoTienda;
