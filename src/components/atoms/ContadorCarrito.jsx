function ContadorCarrito({ cantidad }) {
  return (
    <span className="contador-carrito" aria-label={`${cantidad} productos en el carrito`}>
      {cantidad}
    </span>
  );
}

export default ContadorCarrito;
