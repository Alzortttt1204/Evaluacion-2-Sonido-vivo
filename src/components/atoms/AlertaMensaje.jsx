import Alert from 'react-bootstrap/Alert'

// Mensaje de éxito o de error dentro de los formularios (React Bootstrap)
function AlertaMensaje({ tipo = 'success', texto }) {
  if (!texto) return null;

  return (
    <Alert variant={tipo} className="alerta-formulario">
      {texto}
    </Alert>
  );
}

export default AlertaMensaje;
