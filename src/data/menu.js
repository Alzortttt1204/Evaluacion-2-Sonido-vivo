// Items del menu principal
export const itemsMenu = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/carrito', label: 'Carrito' },
]

// Solo se muestran cuando NO hay sesión iniciada
export const itemsInvitado = [
  { to: '/login', label: 'Ingresar' },
  { to: '/registro', label: 'Registrarse' },
]

// Solo se muestran cuando hay sesión iniciada
export const itemsUsuario = [
  { to: '/perfil', label: 'Mi Perfil' },
]

// Solo para el administrador
export const itemsAdministrador = [
  { to: '/admin', label: 'Panel de Control' },
]
