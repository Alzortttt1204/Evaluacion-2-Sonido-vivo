import DatoEtiquetado from '../atoms/DatoEtiquetado'
import Seccion from '../molecules/Seccion'
import { textosContacto } from '../../data/textos'

function InfoTienda() {
  const { titulo, descripcion, direccion, horario } = textosContacto

  return (
    <Seccion id="datos-tienda" titulo={titulo}>
      <p>{descripcion}</p>
      <DatoEtiquetado etiqueta="Dirección" valor={direccion} />
      <DatoEtiquetado etiqueta="Horario" valor={horario} />
    </Seccion>
  );
}

export default InfoTienda;
