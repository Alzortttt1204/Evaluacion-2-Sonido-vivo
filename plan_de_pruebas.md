# Plan de Pruebas Unitarias — Sonido Vivo (React)

**Integrantes:** Bastian Alarcón e Ignacio Hidalgo
<br />

**Asignatura:** Desarrollo FullStack II — Evaluación Parcial 2
<br />

**Herramientas:** Vitest 5 + React Testing Library + jsdom
<br />

**Fecha:** 16-10-2026

---

## 1. Objetivo

Comprobar que las funcionalidades críticas de la migración a React funcionan como se espera:
validaciones de formularios (heredadas de la primera entrega), carrito de compras, catálogo y filtro
dinámico, inicio de sesión con credenciales estáticas, protección de rutas con `localStorage`,
CRUD en memoria del Panel de Control y navegación (incluida la página 404).

## 2. Alcance

| Área | Qué se prueba | Archivo de pruebas |
| :--- | :--- | :--- |
| Validaciones | Reglas de login, registro (incluida la fecha de nacimiento), producto y checkout | `src/utils/validaciones.test.js` |
| Carrito | Agregar, respetar stock, total y quitar productos | `src/utils/carrito.test.js` |
| Catálogo | Filtro por texto/categoría, crear y eliminar productos | `src/utils/productos.test.js` |
| Sesión | Autenticación y uso de `localStorage` | `src/utils/sesion.test.js` |
| Tarjeta de producto | Favorito, agregar al carrito y formato de precio | `src/components/molecules/TarjetaProducto.test.jsx` |
| Detalle de producto | Subtotal, cantidad inválida y límite de stock | `src/components/organisms/DetalleProducto.test.jsx` |
| Menú principal | Botón ☰ (responsivo) y enlaces según la sesión | `src/components/organisms/MenuPrincipal.test.jsx` |
| Login | Credenciales incorrectas y correctas | `src/components/organisms/FormularioLogin.test.jsx` |
| Registro | Campo de contexto obligatorio y registro correcto | `src/components/organisms/FormularioRegistro.test.jsx` |
| Panel de Control | Formulario de producto (crear y editar) | `src/components/organisms/FormularioProducto.test.jsx` |
| Rutas privadas | Acceso con y sin sesión, y según el rol | `src/routes/RutaPrivada.test.jsx` |
| Página Productos | Catálogo completo, filtro y búsqueda sin resultados | `src/pages/Productos.test.jsx` |
| App | Página 404 y CRUD en memoria visible en el catálogo | `src/App.test.jsx` |

## 3. Metodología

Todas las pruebas siguen el patrón **AAA**, marcado con comentarios dentro de cada prueba:

- **Arrange (Preparación):** se crean los datos de prueba (mocks), las funciones espía con `vi.fn()` y se renderiza el componente.
- **Act (Acción):** se simula lo que haría el usuario con `fireEvent.change` / `fireEvent.click`, o se llama a la función.
- **Assert (Verificación):** se comprueba el resultado con `expect`.

Los componentes que usan enlaces o `useNavigate` se envuelven en `MemoryRouter`.
Antes de cada prueba se limpia `localStorage` (ver `src/setupTests.js`).

## 4. Cómo ejecutar las pruebas

```bash
npm install
npm test            # modo observador
npx vitest run      # una sola ejecución (la que se usó para este plan)
```

## 5. Casos de prueba

| ID | Componente<br>*(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange: props, mocks)* | Acción<br>*(Act: fireEvent, render)* | Resultado Esperado<br>*(Assert: expect)* | Estado<br>*(Pasa / Falla)* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| PU-001 | validaciones | `validarLogin` rechaza un dominio no permitido | Datos con correo `usuario@yahoo.com` | Llamar a `validarLogin` | Error en el campo `correo` con el mensaje "Dominio invalido" | ✅ Pasa |
| PU-002 | validaciones | `validarRegistro` acepta un registro correcto | Objeto con todos los campos válidos (incluidos los de contexto) | Llamar a `validarRegistro` | Devuelve `null` (sin errores) | ✅ Pasa |
| PU-003 | validaciones | `validarRegistro` detecta un RUN con formato no válido | Registro válido con RUN `1901A022K` | Llamar a `validarRegistro` | Error `{ campo: 'run', mensaje: 'Formato del run no valido' }` | ✅ Pasa |
| PU-004 | validaciones | `validarRegistro` detecta contraseñas distintas | Registro válido con `repetirContrasena` diferente | Llamar a `validarRegistro` | Error en `repetirContrasena`: "Las contraseñas no coinciden" | ✅ Pasa |
| PU-005 | validaciones | `validarProducto` exige precio entero mayor a 0 | Producto con precio `-500` | Llamar a `validarProducto` | Error en el campo `precio` | ✅ Pasa |
| PU-006 | validaciones | `validarCheckout` pide comuna/dirección solo con despacho | Mismos datos sin comuna ni dirección | Validar con entrega `retiro` y con `despacho` | Retiro → `null`; despacho → error en `comuna` | ✅ Pasa |
| PU-007 | carrito de compras | Agregar dos veces el mismo producto suma cantidades | Carrito con 1 guitarra | `agregarAlCarrito` con 2 unidades más | Un solo ítem con cantidad 3 | ✅ Pasa |
| PU-008 | carrito de compras | La cantidad nunca supera el stock | Carrito vacío, guitarra con stock 5 | Agregar 10 unidades | Cantidad final 5 | ✅ Pasa |
| PU-009 | carrito de compras | `calcularTotal` suma precio × cantidad | 2 guitarras ($100.000) + 3 púas ($15.000) | Llamar a `calcularTotal` | Total `245000` | ✅ Pasa |
| PU-010 | carrito de compras | Cantidad 0 quita el producto | Carrito con guitarra y púas | `cambiarCantidad(carrito, 1, 0)` | Queda solo el producto id 8 | ✅ Pasa |
| PU-011 | catálogo de productos | El filtro combina texto y categoría | 3 productos de prueba | `filtrarProductos(productos, 'fender', 'bajos')` | Solo "Bajo Electrico" | ✅ Pasa |
| PU-012 | catálogo de productos | `crearProducto` asigna id, convierte números y pone imagen genérica | 3 productos + datos de un ukelele (precio y stock como texto) | Llamar a `crearProducto` | 4 productos; el nuevo tiene `id 4`, `precio 59990`, `stock 4` e imagen genérica | ✅ Pasa |
| PU-013 | catálogo de productos | `eliminarProducto` quita solo el indicado | 3 productos | Eliminar el id 2 | Quedan los ids `[1, 3]` | ✅ Pasa |
| PU-014 | sesión con localStorage | `autenticar` devuelve el usuario sin contraseña | Credenciales de la cuenta de prueba del administrador | Llamar a `autenticar` | Rol `administrador` y sin propiedad `contrasena` | ✅ Pasa |
| PU-015 | sesión con localStorage | Guardar, leer y cerrar sesión | Objeto usuario cliente | `guardarSesion` → `obtenerSesion` → `cerrarSesion` | Se lee el mismo usuario; después de cerrar, `null` | ✅ Pasa |
| PU-016 | TarjetaProducto | Click en Favorito avisa el id | Producto mock (id 7) y `onToggleFavorito = vi.fn()` | Click en "♡ Favorito" | `onToggleFavorito` llamado con `7` | ✅ Pasa |
| PU-017 | TarjetaProducto | Agregar al carrito cambia el botón (useState) | Producto mock y `onAgregarCarrito = vi.fn()` | Click en "Agregar al carrito" | Se llama con `(producto, 1)` y el botón dice "✓ Agregado" | ✅ Pasa |
| PU-018 | TarjetaProducto | Precio con formato chileno | Producto con precio 39990 | Renderizar la tarjeta | Se muestra "$39.990" | ✅ Pasa |
| PU-019 | DetalleProducto | Calcula el subtotal | Producto de $10.000 con stock 5 | Escribir 3 en Cantidad y click en "Calcular" | Texto "Subtotal: $30.000" | ✅ Pasa |
| PU-020 | DetalleProducto | Cantidad 0 no es válida | Mismo producto | Escribir 0 y click en "Calcular" | Texto "Ingresa una cantidad valida." | ✅ Pasa |
| PU-021 | DetalleProducto | No agrega más que el stock | Producto con stock 5 y `onAgregarCarrito = vi.fn()` | Escribir 9 y click en "Agregar al carrito" | La función NO se llama y aparece "Solo hay 5 unidades disponibles." | ✅ Pasa |
| PU-022 | MenuPrincipal | Botón ☰ abre el menú (responsivo) | Menú sin sesión dentro de `MemoryRouter` | Click en "☰ Menú" | `aria-expanded="true"` y texto "✕ Cerrar menú" | ✅ Pasa |
| PU-023 | MenuPrincipal | Sin sesión: Ingresar sí, Panel no | `sesion = null` | Renderizar el menú | Existe "Ingresar" y no existe "Panel de Control" | ✅ Pasa |
| PU-024 | MenuPrincipal | Con sesión de administrador | `sesion` con rol `administrador` | Renderizar el menú | Existen "Panel de Control" y "Cerrar sesión"; no existe "Ingresar" | ✅ Pasa |
| PU-025 | FormularioLogin | Contraseña incorrecta | Formulario con `onLogin = vi.fn()`; correo de admin y contraseña errónea | Click en "Ingresar" | Mensaje "Correo o contraseña incorrectos", `onLogin` no se llama y no hay sesión en `localStorage` | ✅ Pasa |
| PU-026 | FormularioLogin | Credenciales correctas | Credenciales de la cuenta de prueba del cliente | Click en "Ingresar" | Sesión guardada en `localStorage` (sin contraseña) y `onLogin` llamado con rol `cliente` | ✅ Pasa |
| PU-027 | FormularioRegistro | Campo de contexto obligatorio | Todos los campos de la primera entrega completos, sin "Instrumento principal" | Click en "Registrarme" | Mensaje "Debe seleccionar su instrumento principal" y el cursor queda en ese campo | ✅ Pasa |
| PU-028 | FormularioRegistro | Registro correcto | Todos los campos completos, incluidos instrumento y nivel | Click en "Registrarme" | Mensaje "Registro realizado correctamente" y el formulario se limpia | ✅ Pasa |
| PU-029 | FormularioProducto (Panel de Control) | Crear producto válido | Formulario vacío con `onGuardar = vi.fn()`; se completan los 6 campos | Click en "Agregar producto" | `onGuardar` llamado con nombre, marca, categoría y precio ingresados | ✅ Pasa |
| PU-030 | FormularioProducto (Panel de Control) | Modo edición | `productoInicial` = batería Pearl | Renderizar el formulario | El campo nombre trae "Bateria" y el botón dice "Guardar cambios" | ✅ Pasa |
| PU-031 | RutaPrivada | Sin sesión redirige al login | `localStorage` vacío | Entrar a `/admin` | Se ve "Página de login" y no el panel | ✅ Pasa |
| PU-032 | RutaPrivada | Administrador entra al panel | Sesión de administrador en `localStorage` | Entrar a `/admin` | Se ve "Panel de Control" | ✅ Pasa |
| PU-033 | RutaPrivada | Cliente no entra al panel | Sesión de cliente en `localStorage` | Entrar a `/admin` | Redirige a "Página de perfil" | ✅ Pasa |
| PU-034 | Página Productos | Catálogo completo | Los 8 productos iniciales | Renderizar la página | 8 tarjetas (`article`) | ✅ Pasa |
| PU-035 | Página Productos | Filtro por categoría | Los 8 productos iniciales | Elegir "pedales" en Categoría | 1 tarjeta ("Pedal de Efectos Overdrive") y "Mostrando 1 de 8 productos" | ✅ Pasa |
| PU-036 | Página Productos | Búsqueda sin resultados | Los 8 productos iniciales | Escribir "violin" en Buscar | 0 tarjetas y el aviso "No se encontraron productos con esos filtros." | ✅ Pasa |
| PU-037 | App (rutas y estado compartido) | Ruta inexistente | `MemoryRouter` en `/pagina-que-no-existe` | Renderizar `App` | Se muestran "404" y "Página no encontrada" | ✅ Pasa |
| PU-038 | App (rutas y estado compartido) | CRUD en memoria visible en el catálogo | Sesión de administrador; `App` en `/admin`; formulario completo | Click en "Agregar producto" y luego en el enlace "Productos" | El catálogo muestra "Ukelele Soprano" y "Mostrando 9 de 9 productos" | ✅ Pasa |
| PU-039 | validaciones de la fecha de nacimiento | Rechaza una fecha de nacimiento de mañana, incluso a las 22:30 | Fecha del sistema fijada en 16-10-2026 22:30 (`vi.setSystemTime`); registro válido con `fenac: '2026-10-17'` | Llamar a `validarRegistro` | Error en `fenac`: "La fecha de nacimiento no puede ser posterior a hoy" (antes, de noche, esta fecha pasaba por la diferencia con UTC) | ✅ Pasa |
| PU-040 | validaciones de la fecha de nacimiento | Exige entre 13 y 120 años | Fecha del sistema fijada en 16-10-2026; tres registros con fechas 2015-01-01, 1890-05-10 y 2004-03-21 | Llamar a `validarRegistro` con cada uno | 2015 → "Debe tener al menos 13 años para registrarse"; 1890 → error en `fenac`; 2004 → `null` (válida) | ✅ Pasa |

## 6. Resultado de la ejecución

```
 Test Files  13 passed (13)
      Tests  40 passed (40)
```

Las 40 pruebas pasan. Además del plan automatizado, se revisó manualmente en el navegador
(Chrome) la versión de escritorio (1280 px) y celular (375 px) de las páginas, comparándolas
con el sitio original de la primera entrega.
