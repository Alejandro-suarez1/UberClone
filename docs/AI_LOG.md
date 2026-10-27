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