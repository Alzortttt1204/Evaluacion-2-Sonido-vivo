// Botón simple. Los estilos los pone el CSS original según dónde se use
// (.tarjeta-producto button, .detalle-info button, etc.)
function Boton({ children, type = 'button', ...props }) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}

export default Boton;
