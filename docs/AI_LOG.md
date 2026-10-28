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


### Entradas de Juan Diego Delgado

### Entrada #B-1
Fecha: 2026-10-28
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Inicializar Firebase/Firestore para usarlo en tiempo real desde los servicios de viajes y ubicación
Prompt: Quiero conectar mi aplicación con Firebase para poder guardar y consultar la información de los viajes. Guíame creando el archivo
para que todo funcione correctamente.
Qué se usó / modificó / descartó: Se usó src/services/firebase.js completo. Se descartó @react-native-firebase por incompatibilidad con Expo Go.
Archivos y commit: src/services/firebase.js hash: 6c7ca3f8ea566980015409367e1e100db750b7b4
Verificación: Importar db en un archivo de prueba, escribir un documento en la colección trips y verlo en Firebase Console
Aprendizaje: En React Native conviene forzar long polling en Firestore y proteger la inicialización contra recargas en caliente

### Entrada #B-2
Fecha: 2026-10-28
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Crear el servicio de solicitudes, estados, cierre del viaje e historial
Prompt: Ayudame a crear el servicio de solicitudes, estados, cierre del viaje e historial
Qué se usó / modificó / descartó: Se usó la propuesta generada por Claude, sin necesidad de realizar cambios ni descartar contenido. La solución permite finalizar el viaje, calcular el costo del servicio y guardar la información necesaria para consultar el historial de viajes
Archivos y commit: src/services/tripService.js hash:
Verificación: Crear una solicitud en Firestore y comprobar que subscribeToRequests la recibe; pedir dos páginas del historial
Aprendizaje: Aprendí que Firestore puede requerir índices compuestos para ejecutar determinadas consultas y que la consola facilita su creación mediante un enlace