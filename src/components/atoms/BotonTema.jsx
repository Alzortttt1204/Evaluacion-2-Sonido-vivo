// Alterna entre el tema oscuro (diseño original) y el tema claro
function BotonTema({ tema, onCambiarTema }) {
  return (
    <button type="button" className="btn-tema" onClick={onCambiarTema}>
      {tema === 'oscuro' ? '☀ Modo claro' : '☾ Modo oscuro'}
    </button>
  );
}

export default BotonTema;
