// Contenedor + imagen. En las tarjetas usa "espacio-imagen"
// y en el detalle "detalle-imagen-wrap", igual que en la primera entrega.
function ImagenProducto({ src, alt, claseContenedor = 'espacio-imagen' }) {
  return (
    <div className={claseContenedor}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default ImagenProducto;
