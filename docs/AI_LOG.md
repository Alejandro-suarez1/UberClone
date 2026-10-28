### Entradas de Alejandro Suarez

### Entrada #A-1
Fecha: 2026-10-26
Integrante: Alejandro
Herramienta: Claude
Objetivo: Definir la arquitectura, los contratos y el reparto de archivos entre ambos compañeros y crear la paleta de colores de la app
Prompt: Quiero que analices todo este proyecto, y que me definas la arquitectura y los contratos, porque ten en cuenta que tengo que trabajar con un compañero entonces debemos realizar funciones diferentes que no vayan a chocar cuando hagamos un commit o algo, quiero que actues como arquitecto de software. Primero me vas a pasar los comandos para generar el proyecto, que es un proyecto movil hecho en javascript con expo go. 
Qué se usó / modificó / descartó: Se usó la estructura de carpetas, los contratos y src/theme/colors.js. Se descartó @react-native-firebase y @react-native-community/geolocation porque no funcionan en Expo Go, se reemplazaron por firebase (JS) y expo-location.
Archivos y commit: src/theme/colors.js (hash: 01b77f1091775c34064032ac69183e7410e1ca88)
Verificación: Importar colors en App.js y comprobar en Expo Go que el fondo y el color primario se ven correctos
Aprendizaje: Las librerías con código nativo propio no corren en Expo Go, separar el trabajo por dueño de archivo evita conflictos en Git

### Entrada #A-2
Fecha: 2026-10-26
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el sistema tipográfico de la app: fuentes y estilos de texto reutilizables
Prompt: Ayúdame a organizar las fuentes y los estilos de texto de la aplicación para reutilizarlos en las diferentes pantallas, incluyendo títulos, textos normales y precios.
Qué se usó / modificó / descartó: Se usó el archivo src/theme/typography.js completo. Nada descartado.
Archivos y commit: src/theme/typography.js (hash: 8a9cbd421ed7abbe05635f09ec75b2b9bb60fdc0)
Verificación: Cargar fontAssets con useFonts en App.js y renderizar un Text con typography.title y typography.money en Expo Go
Aprendizaje: Las fuentes de Google se importan como paquetes y deben cargarse con useFonts antes de renderizar.

### Entrada #A-3
Fecha: 2026-10-28
Integrante: Alejandro
Herramienta: Claude
Objetivo: Definir la escala de espacios, radios y sombras de la app
Prompt: ayudame a definir la escala de espacios, radios y sombras de la app
Qué se usó / modificó / descartó: Se usaron algunos estilos y sombras que claude propuso, nada descartado.
Archivos y commit: src/theme/spacing.js (hash: c925c16ca79aeb218c607eba308e34ffe7fb2b84)
Verificación: Importar spacing y shadows.glow en una vista de prueba y ver el halo lima
Aprendizaje: Una escala fija de espacios evita números sueltos y mantiene el diseño consistente

### Entrada #A-4
Fecha: 2026-10-28
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el estilo de mapa oscuro a juego con la paleta
Prompt: ayudame a crear el estilo de mapa oscuro 
Qué se usó / modificó / descartó: Se utilizaron los elementos que aportaban al desarrollo de la actividad y se modificaron algunas partes para mejorar el resultado. También se descartaron los elementos que no eran necesarios o que no cumplían con lo que se buscaba. 
Archivos y commit: src/theme/mapStyle.js (hash: {{HASH:A-4}})
Verificación: Pasar darkMapStyle a un MapView en Android y comprobar que el mapa se ve oscuro
Aprendizaje: El estilo de Google Maps es un JSON.