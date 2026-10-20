import Form from 'react-bootstrap/Form'

// Un campo de formulario (React Bootstrap): etiqueta + input/select/textarea + mensaje de error.
// "campo" viene de src/data/formularios.js
function CampoFormulario({ campo, valor, onChange, error }) {
  const { name, label, type = 'text', placeholder, as, rows, min, max, opciones, placeholderOpcion } = campo

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>

      {as === 'select' ? (
        <Form.Select name={name} value={valor} onChange={onChange} isInvalid={Boolean(error)}>
          <option value="">{placeholderOpcion}</option>
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          as={as}
          rows={rows}
          type={type}
          min={min}
          max={max}
          name={name}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          isInvalid={Boolean(error)}
        />
      )}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;
