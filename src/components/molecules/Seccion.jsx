// Bloque con el estilo original ".seccion" (fondo gris oscuro y sombra)
function Seccion({ id, titulo, className = '', children }) {
  return (
    <section id={id} className={`seccion ${className}`.trim()}>
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  );
}

export default Seccion;
