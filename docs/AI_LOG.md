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
Archivos y commit: src/services/tripService.js hash: 066fdcd9c34cb6f9e9e0cf09da6dcf034a3d0818
Verificación: Crear una solicitud en Firestore y comprobar que subscribeToRequests la recibe; pedir dos páginas del historial
Aprendizaje: Aprendí que Firestore puede requerir índices compuestos para ejecutar determinadas consultas y que la consola facilita su creación mediante un enlace

### Entrada #B-3
Fecha: 2026-10-29
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Crear el servicio encargado de solicitar permisos de ubicación, obtener la ubicación actual del conductor y realizar un seguimiento continuo de sus coordenadas
Prompt: Me puedes guiar de tal manera que pueda crear el archivo para solicitar los permisos de ubicación del conductor, obtener su ubicación actual y permitir el seguimiento de sus movimientos en tiempo real
Qué se usó / modificó / descartó: Se usó Expo Location para solicitar permisos y rastrear en tiempo real al conductor en primer plano. Se implementó stopWatchingPlace() para cancelar la suscripción y limpiar la memoria al salir de la pantalla o cambiar de estado, descartando el seguimiento en segundo plano
Archivos y commit: src/services/locationService.js hash: 6286ca84bc56e7d6295e3c49d5e899278827d614
Verificación: Aceptar y negar el permiso y ver el resultado; mover el teléfono y ver nuevas posiciones
Aprendizaje: Comprendí cómo gestionar el ciclo completo de localización en primer plano, desde el control asíncrono de los permisos del usuario y la captura de coordenadas actuales, hasta el manejo correcto de flujos de datos continuos que deben ser cancelados para no saturar el dispositivo

### Entrada #B-4
Fecha: 2026-11-01
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Obtener la ruta entre dos puntos y dibujarla
Prompt: Necesito armar la ruta entre dos puntos en React Native usando Google Maps, la cual guarde los viajes buscados para no gastar el cupo gratis y dibuje una línea recta de respaldo si no hay internet o clave de la API
Qué se usó / modificó / descartó: Se usó la estructura del fetch y la decodificación de la polilínea. Se modificó añadiendo un límite de 50 elementos al caché para no saturar la RAM y formateando los kilómetros a dos decimales, descartando el bloque de error vacío para meter un console.error que detecte fallas de red
Archivos y commit: src/services/directionsService.js hash: 7022623b0542b15424f0ce0b3e8a31bdb867b87c
Verificación: Solicitar una ruta conocida para validar distancia y tiempo; remover la API key para forzar la línea recta de respaldo
Aprendizaje: Aprendí que se debe solicitar la ruta únicamente por tramo y no por cada movimiento del vehículo, reduciendo drásticamente las consultas innecesarias para cuidar el cupo gratuito

### Entrada #B-5
Fecha: 2026-11-01
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Implementar un servicio de integración con la pasarela de pagos en el cliente, delegando la lógica de negocio y las credenciales críticas en el backend, y controlando las redirecciones del flujo mediante URLs de retorno
Prompt: Necesito crear un archivo de servicios para mandarle al backend el ID del viaje y el monto que se va a cobrar. El backend nos debe responder con un enlace para que el usuario pague. Agrega una seguridad por si se nos olvida configurar la URL del backend, evita que la app se cierre si la respuesta falla, y crea una función que detecte cuando el usuario termina de pagar para mandarlo de vuelta a la app
Qué se usó / modificó / descartó: Se usó la estructura original del fetch y las funciones planteadas por Claude. Se modificó el código añadiendo una validación temprana para el monto y un control de seguridad en la función de las URLs para evitar fallos si los datos llegan vacíos. Se descartó procesar la solicitud si el monto no es un número válido mayor a cero
Archivos y commit: src/services/paymentService.js hash: 
Verificación: Con el backend corriendo, createPayment devuelve una URL de checkout
Aprendizaje: Aprendí que por seguridad, las contraseñas y claves secretas de los pagos nunca deben guardarse en el teléfono del usuario. La aplicación móvil solo debe avisar cuánto se va a cobrar y el backend se encarga de hablar con la pasarela de pagos de forma segura