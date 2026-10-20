function BotonFavorito({ esFavorito, onClick }) {
  return (
    <button
      type="button"
      className={esFavorito ? 'btn-favorito activo' : 'btn-favorito'}
      aria-pressed={esFavorito}
      onClick={onClick}
    >
      {esFavorito ? '♥ En favoritos' : '♡ Favorito'}
    </button>
  );
}

export default BotonFavorito;
