# A Tu Lado Hoy · Buscador de servicios (Propuesta C)

Prototipo funcional de la página de búsqueda: encabezado fijo con buscador y opciones rápidas, banner rotativo de servicios destacados, accesos rápidos, categorías, filtros con conteo y grilla de servicios.

Hecho con **HTML + Tailwind CSS 3.4.17 + íconos Lucide 0.460.0 + JavaScript simple** (sin frameworks).

## Estructura

```
a-tu-lado-hoy/
├── index.html            Página completa (estructura y textos)
├── css/styles.css        Estilos YA COMPILADOS (listos para usar)
├── src/input.css         Fuente de estilos: colores de marca (claro/oscuro) + Tailwind
├── tailwind.config.js    Colores y tipografías de la marca para Tailwind
├── js/data.js            Datos de ejemplo: servicios, categorías, comunas, imágenes
├── js/app.js             Lógica: banner, accesos rápidos, filtros, resultados, favoritos
├── js/vendor/lucide.min.js  Librería de íconos (incluida, no depende de internet)
├── assets/logo.svg       Logo provisorio
├── assets/img/*.jpg      Fotos de las tarjetas y del banner
└── package.json          Scripts para recompilar estilos
```

## Ver la página

Abre `index.html` con doble clic, o en Cursor usa la extensión **Live Server** (clic derecho → *Open with Live Server*). No necesita instalar nada para verse.

## Editar estilos

Las clases de Tailwind se escriben directamente en `index.html` y `js/app.js`. Si agregas clases nuevas, recompila `css/styles.css`:

```bash
npm install
npm run dev     # recompila automáticamente mientras editas
npm run build   # versión final, minificada
```

Requiere Node.js 18 o superior.

## Cambios frecuentes

| Quiero cambiar… | Dónde |
|---|---|
| Colores de marca | `src/input.css` (bloque `:root`) |
| Tipografías | `tailwind.config.js` (`fontFamily`) y el enlace de Google Fonts en `index.html` |
| Servicios de ejemplo | `js/data.js`, arreglo `S` |
| Avisos del banner | `js/app.js`, arreglo `SLIDES` |
| Accesos rápidos | `js/app.js`, arreglo `SHORT` |
| Fotos | `assets/img/` y el mapa `IMG` en `js/data.js` |
| Íconos | Nombres de [lucide.dev/icons](https://lucide.dev/icons) en `data-lucide="nombre"` |

## Pendientes antes de publicar

- **Datos ficticios:** prestadores, precios, avisos y programas son de ejemplo.
- **Fotos de baja resolución:** se recortaron de una maqueta. Reemplázalas por fotos originales (ideal 1200 px de ancho).
- **Logo provisorio:** `assets/logo.svg` es una aproximación; usa el archivo oficial.
- **Números de emergencia** (*4141 y SAMU 131): verificar contra fuentes oficiales del MINSAL.
- **Botones sin destino:** "Ver servicio", "Ingresar", "Profesionales", etc. aún no llevan a otras pantallas.
- **Revisión legal** de textos de verificación, publicidad y protección de datos según normativa chilena.
