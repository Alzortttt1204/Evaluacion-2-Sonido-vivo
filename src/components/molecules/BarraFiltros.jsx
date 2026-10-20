import Form from 'react-bootstrap/Form'

// Buscador por nombre/marca y selector de categoría del catálogo
function BarraFiltros({ texto, categoria, categorias, onCambiarTexto, onCambiarCategoria }) {
  return (
    <Form className="barra-filtros" onSubmit={(event) => event.preventDefault()}>
      <Form.Group className="campo-filtro" controlId="buscar">
        <Form.Label>Buscar:</Form.Label>
        <Form.Control
          type="search"
          placeholder="Nombre o marca"
          value={texto}
          onChange={(event) => onCambiarTexto(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="campo-filtro" controlId="filtro-categoria">
        <Form.Label>Categoría:</Form.Label>
        <Form.Select value={categoria} onChange={(event) => onCambiarCategoria(event.target.value)}>
          <option value="todas">Todas</option>
          {categorias.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

export default BarraFiltros;
