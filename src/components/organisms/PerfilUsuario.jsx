import DatoEtiquetado from '../atoms/DatoEtiquetado'
import { tiposUsuario, textoDeOpcion } from '../../data/opciones'

// Datos del usuario que inició sesión
function PerfilUsuario({ usuario }) {
  if (!usuario) return null;

  return (
    <div className="datos-perfil">
      <DatoEtiquetado etiqueta="Nombre" valor={`${usuario.nombre} ${usuario.apellidos}`} />
      <DatoEtiquetado etiqueta="RUN" valor={usuario.run} />
      <DatoEtiquetado etiqueta="Correo" valor={usuario.correo} />
      <DatoEtiquetado etiqueta="Teléfono" valor={usuario.telefono} />
      <DatoEtiquetado etiqueta="Dirección" valor={usuario.direccion} />
      <DatoEtiquetado etiqueta="Comuna" valor={usuario.comuna} />
      <DatoEtiquetado etiqueta="Tipo de usuario" valor={textoDeOpcion(tiposUsuario, usuario.rol)} />
      <DatoEtiquetado etiqueta="Instrumento principal" valor={usuario.instrumento} />
      <DatoEtiquetado etiqueta="Nivel musical" valor={usuario.nivel} />
    </div>
  );
}

export default PerfilUsuario;
