import CampoFormulario from './CampoFormulario'

// Dibuja todos los campos de un formulario y le pasa a cada uno su valor y su error
function ListaCampos({ campos, datos, error, onChange }) {
  return (
    <>
      {campos.map((campo) => (
        <CampoFormulario
          key={campo.name}
          campo={campo}
          valor={datos[campo.name]}
          onChange={onChange}
          error={error && error.campo === campo.name ? error.mensaje : ''}
        />
      ))}
    </>
  );
}

export default ListaCampos;
