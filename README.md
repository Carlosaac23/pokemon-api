# PokeDex — Proyecto de ejemplo usando la PokeAPI

Una pequeña aplicación web estática que consume la PokeAPI (<https://pokeapi.co>) para buscar y mostrar información básica de un Pokémon: imagen, tipos, estadísticas y atributos como altura, peso y experiencia base.

Este proyecto es ideal como demostración o como punto de partida para explorar fetch, manejo de errores y diseño responsivo con HTML/CSS/JS puros.

## Estructura del proyecto

- `index.html` — Interfaz de usuario principal: campo de búsqueda, botón y contenedores donde se muestran los datos.
- `assets/js/main.js` — Lógica JavaScript: fetch a la PokeAPI, renderizado del resultado, manejo de errores y animaciones sencillas.
- `assets/styles/style.css` — Estilos y diseño responsive.
- `README.md` — Documentación (este archivo).

## Qué hace

1. El usuario escribe el nombre de un Pokémon en el campo de entrada y pulsa el botón "Buscar Pokemon" (o presiona Enter).
2. El script realiza una petición a `https://pokeapi.co/api/v2/pokemon/{nombre}`.
3. Si el Pokémon existe, se muestran:
   - Imagen (sprite frontal)
   - Nombre y tipos (badges con color por tipo)
   - ID, experiencia base, altura (en metros) y peso (en kg)
   - Estadísticas (HP, ataque, defensa, etc.)
4. Si ocurre un error (nombre no encontrado, problemas de red), se muestra una alerta amigable.

## Uso local

Requisitos: Un navegador moderno (Chrome, Firefox, Edge) y conexión a Internet para consultar la PokeAPI.

Pasos para ejecutar localmente:

1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador.

Alternativa (recomendado para evitar problemas de CORS/servido estático): ejecutar un servidor estático simple. Por ejemplo, con Python 3 en la carpeta del proyecto:

```bash
# desde la raíz del proyecto
python -m http.server 8000
# luego abre http://localhost:8000 en tu navegador
```

## API utilizada

Este proyecto consume la PokeAPI pública:

- Endpoint principal: `https://pokeapi.co/api/v2/pokemon/{nameOrId}`

No se necesita clave ni autenticación para las consultas usadas en este ejemplo.

## Detalles de implementación

- `assets/js/main.js`:

  - `getPokemon()` — realiza un `fetch` al endpoint con el nombre proporcionado. Maneja errores HTTP revisando `response.ok` y lanza un `Error` con el texto recibido.
  - `renderPokemon()` — controla la UI: muestra/oculta contenedores, muestra un estado "Buscando..." en el botón, procesa la respuesta y renderiza tipos, estadísticas y atributos. También resetea el estado del botón tras finalizar.
  - `showAlerts(msg, type)` — muestra alertas temporales en el DOM y las elimina tras una animación.
  - Soporta envío por Enter con `keydown`.

- `assets/styles/style.css`:
  - Diseño limpio y centrado, uso de tipografía Inter desde Google Fonts.
  - Badges con colores por tipo (`.type-fire`, `.type-water`, etc.).
  - Animaciones para aparición del bloque de información y para el botón (efecto brillo y loading spinner).

## Licencia

Este repositorio no incluye un archivo de licencia; por defecto, conserva los derechos de autor del autor del repositorio. Si quieres permitir usos abiertos, agrega un archivo `LICENSE` (por ejemplo MIT).

## Contacto / Créditos

Creado como proyecto de ejemplo que consume la PokeAPI. Inspirado en múltiples tutoriales sobre consumo de APIs REST con fetch y manipulación del DOM.
