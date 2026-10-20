import { NavLink } from 'react-router-dom'

// NavLink agrega la clase "active" al enlace de la página actual
function ItemMenu({ to, onClick, children }) {
  return (
    <li>
      <NavLink to={to} end={to === '/'} onClick={onClick}>
        {children}
      </NavLink>
    </li>
  );
}

export default ItemMenu;
