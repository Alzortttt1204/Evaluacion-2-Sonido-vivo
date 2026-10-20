// Campo "Cantidad" del detalle de producto (mismo input de la primera entrega)
function SelectorCantidad({ cantidad, maximo, onCambiar }) {
  return (
    <div className="selector-cantidad">
      <label htmlFor="cantidad">Cantidad: </label>
      <input
        type="number"
        id="cantidad"
        min="1"
        max={maximo}
        value={cantidad}
        onChange={(event) => onCambiar(event.target.value)}
      />
    </div>
  );
}

export default SelectorCantidad;
