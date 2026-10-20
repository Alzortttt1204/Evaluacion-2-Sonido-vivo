// Muestra un dato con su etiqueta en negrita: "Categoria: Guitarras"
function DatoEtiquetado({ etiqueta, valor }) {
  return (
    <p className="dato-etiquetado">
      <strong>{etiqueta}:</strong> {valor}
    </p>
  );
}

export default DatoEtiquetado;
