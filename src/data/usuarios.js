// Cuentas de prueba con credenciales estáticas (lo pide la evaluación).
// No hay servidor ni base de datos: el login compara contra esta lista.
export const usuarios = [
  {
    correo: 'admin@duoc.cl',
    contrasena: 'admin123',
    rol: 'administrador',
    run: '19011022K',
    nombre: 'Administrador',
    apellidos: 'Sonido Vivo',
    telefono: '912345678',
    direccion: 'Av. Valparaíso 1250',
    comuna: 'Viña del Mar',
    instrumento: 'Guitarra',
    nivel: 'Profesional',
  },
  {
    correo: 'cliente@gmail.com',
    contrasena: 'cliente123',
    rol: 'cliente',
    run: '20123456K',
    nombre: 'Camila',
    apellidos: 'Rojas Pérez',
    telefono: '987654321',
    direccion: 'Calle Álvarez 455',
    comuna: 'Viña del Mar',
    instrumento: 'Bajo',
    nivel: 'Intermedio',
  },
]
