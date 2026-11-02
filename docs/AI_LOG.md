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
Archivos y commit: src/theme/mapStyle.js (hash: 21b8daae08e0e9b46567da3234fd8db6eae5a67c)
Verificación: Pasar darkMapStyle a un MapView en Android y comprobar que el mapa se ve oscuro
Aprendizaje: El estilo de Google Maps es un JSON.

### Entrada #A-5
Fecha: 2026-10-28
Integrante: Alejandro
Herramienta: Claude
Objetivo: Dejar todas las tarifas y la comisión en un único archivo configurable
Prompt: ayudame a dejar todas las tarifas y la comisión en un único archivo configurable
Qué se usó / modificó / descartó: Se incluyeron todas las tarifas y la comisión del 20% tomando como referencia los valores del enunciado. No fue necesario descartar nada.
Archivos y commit: src/config/pricing.js (hash: 3d4450787bc6dd13e738ebfc8096f9290246c114)
Verificación: Revisar que los valores coinciden con la tabla de la sección 5 del enunciado
Aprendizaje: Centralizar la configuración permite cambiar una tarifa sin tocar la lógica

### Entrada #A-6
Fecha: 2026-10-28
Integrante: Alejandro
Herramienta: Claude
Objetivo: Leer las variables EXPO_PUBLIC_* en un solo lugar y fijar constantes como los 15 segundos
Prompt: ayudame a leer las variables EXPO_PUBLIC_* en un solo lugar y fijar constantes 
Qué se usó / modificó / descartó: Se centralizó la lectura de las variables de entorno EXPO_PUBLIC_* y se definieron las constantes necesarias, incluyendo los 15 segundos. No se descartó nada.
Archivos y commit: src/config/env.js (hash: 2f97014d2fe01b3b14509132d2e808ef3cc05ce9)
Verificación: Imprimir ENV.USE_MOCKS con y sin la variable en el .env
Aprendizaje: Expo solo expone al código las variables que empiezan por EXPO_PUBLIC_

### Entrada #A-7
Fecha: 2026-10-29
Integrante: Alejandro
Herramienta: Claude
Objetivo: Tener las listas de opciones de los selectores y el nombre de la app
Prompt: Ayúdame a definir un nombre adecuado para la aplicación y a crear las listas de opciones que se utilizarán en los selectores del sistema
Qué se usó / modificó / descartó: Se tomó como base la propuesta generada por Claude para organizar las opciones de los selectores en el archivo src/config/options.js. Se revisó la estructura del código y se ajustó según las necesidades del proyecto, verificando la correspondencia entre los valores y sus traducciones en status. Se descartaron las opciones que no eran necesarias para la implementación. Se uso el nombre sugerido por Claude para la app
Archivos y commit: src/config/options.js (hash: 936972506e8fbb5bbf08104de413176fac899946)
Verificación: Revisar que cada valor tenga su traducción en status.
Aprendizaje: Separar valores de etiquetas facilita traducir los selectores

### Entrada #A-8
Fecha: 2026-10-29
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la función única que calcula tarifa, comisión y ganancia neta
Prompt: Ayúdame a implementar una función en JavaScript que permita calcular la tarifa total del viaje, la comisión correspondiente y la ganancia neta, teniendo en cuenta la distancia recorrida, el tiempo del viaje y la categoría del servicio (Económico o XL). Organiza la lógica de manera clara y reutilizable, evitando duplicar cálculos en diferentes partes de la aplicación. Explícame cómo funciona y qué casos debo probar para verificar que los resultados sean correctos
Qué se usó / modificó / descartó: Se tomó como base la solución propuesta por Claude para centralizar los cálculos de tarifas, comisiones y ganancias netas. Se revisó la lógica implementada y se validaron los resultados con los valores del ejemplo del enunciado. Se descartaron alternativas que implicaran duplicar los cálculos en distintas partes del sistema.
Archivos y commit: src/utils/calculateFare.js (hash: 58a21e5942ff0bc674be8e3a653dd7afd5669616)
Verificación: Con 8,5 km y 22 min: Económico da 19.200 / 3.840 / 15.360 y XL da 26.900 / 5.380 / 21.520
Aprendizaje: Una función pura con una sola fuente de verdad evita diferencias entre la estimación y el cierre del viaje

### Entrada #A-9
Fecha: 2026-10-29
Integrante: Alejandro
Herramienta: Claude
Objetivo: Dar formato a pesos y fechas 
Prompt: Ayúdame a implementar funciones para dar formato a los valores monetarios en pesos colombianos y para procesar fechas en formato ISO. La función formatCOP debe mostrar los valores con el símbolo $ y utilizar puntos como separadores de miles. Por otra parte, parseISODate debe validar correctamente las fechas recibidas y rechazar fechas inexistentes, como el 30 de febrero. Evita depender de Intl, ya que el entorno de ejecución puede no contar con soporte completo para esta funcionalidad. Y por ultimo explicame como funciona y como lo podría adaptar
Qué se usó / modificó / descartó: Se tomó como referencia la solución propuesta por Claude para implementar el formato de moneda y la validación de fechas. Se descartó el uso de Intl para evitar problemas de compatibilidad con el entorno de ejecución.
Archivos y commit: src/utils/format.js (hash: 0994c8259e4372d25aa1667ed62e7a7c92212fcb)
Verificación: formatCOP(26900) devuelve $26.900 y parseISODate rechaza el 30 de febrero
Aprendizaje: Hermes no siempre trae Intl completo, por eso conviene formatear a mano

### Entrada #A-10
Fecha: 2026-10-30
Integrante: Alejandro
Herramienta: Claude
Objetivo: Calcular los rangos de fechas para Ganancias e Historial
Prompt: ayudame a implementar las funciones para calcular los rangos de fechas de Ganancias e Historial (hoy, semana, mes, año y fechas personalizadas). Utiliza fechas locales para evitar errores de zona horaria, establece el lunes como inicio de semana y asegúrate de que el rango de hoy abarque las 24 horas del día
Qué se usó / modificó / descartó: Se tomó como base el código generado por Claude. Se revisó y ajustó la lógica de los rangos de fechas para adaptarla al funcionamiento del proyecto. No se descartó ninguna función principal
Archivos y commit: src/utils/dateRanges.js (hash: d049e3fc14532de2c1e25cdeebdab9c9d38e94a4)
Verificación: La semana empieza el lunes anterior y el rango de hoy dura 24 horas
Aprendizaje: Trabajar con fechas locales evita errores de zona horaria en los totales

### Entrada #A-11
Fecha: 2026-10-30
Integrante: Alejandro
Herramienta: Claude
Objetivo: Escribir las validaciones de los campos del registro
Prompt: ayudame a implementar las validaciones de los campos del formulario de registro. Incluye validaciones para la placa del vehículo, mayoría de edad, capacidad de pasajeros y fechas de vencimiento 
Qué se usó / modificó / descartó: Se utilizó como base el código generado por Claude. Se revisaron las condiciones de validación y se ajustaron algunos criterios según los requisitos del registro. Se conservaron las claves de error para facilitar las traducciones. No se descartaron funciones principales
Archivos y commit: src/utils/validators.js (hash: 80402bd0ceab598943d016d9f67b4e05c9537e9a)
Verificación: Probar placa ABC123, menor de 18, XL con 4 pasajeros y vencimientos de hoy y de mañana
Aprendizaje: Devolver claves de error y no textos permite mostrar el mensaje en cualquier idioma

### Entrada #A-12
Fecha: 2026-10-30
Integrante: Alejandro
Herramienta: Claude
Objetivo: Reunir todos los textos en español
Prompt: Ayudame a estructurar todos los textos en español
Qué se usó / modificó / descartó: Se usó la estructura similar a la sugerida por claude cambiando los textos correspientes de la aplicación
Archivos y commit: src/i18n/es.js (hash: 9da3a67c2f5b44e02e1aefbb4b1ffac3e79a183f)
Verificación: Buscar en el código claves y comprobar que existen en el diccionario
Aprendizaje: Tener todos los textos juntos hace fácil revisar y traducir

### Entrada #A-13
Fecha: 2026-10-30
Integrante: Alejandro
Herramienta: Claude
Objetivo: Traducir los textos al inglés
Prompt: Ayudame a traducir estos textos
Qué se usó / modificó / descartó: Se usaron las traducciones sugeridas, se descarto la estructura
Archivos y commit: src/i18n/en.js (hash: 2a6ef18a774a5ee23756f9eac52442d640daa1b2)
Verificación: Comparar que es.js y en.js tienen exactamente las mismas claves
Aprendizaje: Si falta una clave en un idioma, la app muestra el texto en español como respaldo

### Entrada #A-14
Fecha: 2026-10-31
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la función translate y unir los textos de A y de B
Prompt: Ayúdame a implementar la función translate, integrando los diccionarios de español e inglés con sus respectivos espacios de nombres. La función debe reemplazar variables dinámicas y devolver la clave cuando no exista una traducción.
Qué se usó / modificó / descartó: Se integraron es.js con trip.es.js y en.js con trip.en.js, manteniendo separados los espacios de nombres. Une es.js con trip.es.js y en.js con trip.en.js.
Archivos y commit: src/i18n/index.js (hash: 1c8a30318060dea9d937139ec90367544f2c7901)
Verificación: translate('es','auth.register.terms',{rate:20}) reemplaza {rate} y una clave inexistente devuelve la misma clave
Aprendizaje: Unir diccionarios por espacios de nombres evita que dos personas editen el mismo archivo

### Entrada #A-15
Fecha: 2026-10-31
Integrante: Alejandro
Herramienta: Claude
Objetivo: Cambiar el idioma de toda la app y recordarlo
Prompt: Ayúdame a implementar un contexto de idioma para que la aplicación pueda cambiar entre español e inglés y recordar la selección del usuario al cerrar y volver a abrir la app.
Qué se usó / modificó / descartó: Se tomó como referencia la estructura propuesta por Claude para implementar el contexto de idioma. Se adaptó la solución al proyecto y se aprovechó la lógica sugerida para guardar y recuperar el idioma mediante AsyncStorage. No se descartaron partes importantes de la propuesta
Archivos y commit: src/context/I18nContext.js (hash: 2b886fa6ba1c25fd9dc92599b50290abc8a7a081)
Verificación: Cambiar a inglés, cerrar y abrir la app: debe seguir en inglés
Aprendizaje: El idioma es una preferencia, por eso puede ir en AsyncStorage

### Entrada #A-16
Fecha: 2026-10-31
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la hoja inferior que usan los selectores, las fechas y la cámara
Prompt: Ayúdame a crear un componente BottomSheet reutilizable que pueda utilizar en los selectores, fechas y cámara
Qué se usó / modificó / descartó: Se aprovechó la estructura y la lógica de apertura y cierre, integrándolas en el proyecto para poder reutilizarlo en diferentes pantallas.
Archivos y commit: src/components/common/BottomSheet.js (hash: 92dd2af7959e0e1e73cc7c1713cda21a53070765)
Verificación: Abrirla y cerrarla tocando fuera; el contenido respeta la zona segura
Aprendizaje: Un componente base evita repetir el mismo modal en varias pantallas

### Entrada #A-17
Fecha: 2026-10-31
Integrante: Alejandro
Herramienta: Claude
Objetivo: como hacer el botón principal de una app con degradado lima y efecto al presionar
Prompt: Como puedo mejorar el botón principal de una aplicación con un degradado en tonos lima y una animación suave al presionarlo. También quiero que pueda manejar diferentes estilos y estados, como cargando y deshabilitado
Qué se usó / modificó / descartó: Se tomó como referencia la propuesta de Claude para implementar el diseño y las animaciones del botón. Se aprovechó la estructura sugerida y se integraron las variantes primary, secondary, danger y ghost, junto con los estados de carga y deshabilitado
Archivos y commit: src/components/common/Button.js (hash: 4aa4a1ef3d7fc24209d755e2ad083bef9366c2c2)
Verificación: Probar los cuatro estilos, el estado cargando y el estado deshabilitado
Aprendizaje: Animated.spring con useNativeDriver da un efecto suave sin gastar rendimiento

### Entrada #A-18
Fecha: 2026-10-31
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el campo de texto con etiqueta y error debajo (no en un Alert)
Prompt: Ayúdame a crear un componente Input reutilizable que tenga una etiqueta y permita mostrar mensajes de error debajo del campo, cambiando el borde a rojo cuando el valor no sea válido. 
Qué se usó / modificó / descartó: Se utilizó la orientación de Claude para definir la estructura del componente y manejar los estados de validación. Se integró la propuesta al proyecto, ajustando el campo para mostrar los errores directamente debajo del input, sin utilizar Alert
Archivos y commit: src/components/common/Input.js (hash: {{HASH:A-18}})
Verificación: Escribir un valor inválido: el borde se pone rojo y el mensaje sale debajo
Aprendizaje: El error va en el campo para que el usuario sepa exactamente qué corregir


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
Archivos y commit: src/services/paymentService.js hash: 6f44aad59e8aec4f9aad9c2707dbecb92bfa93cc
Verificación: Con el backend corriendo, createPayment devuelve una URL de checkout
Aprendizaje: Aprendí que por seguridad, las contraseñas y claves secretas de los pagos nunca deben guardarse en el teléfono del usuario. La aplicación móvil solo debe avisar cuánto se va a cobrar y el backend se encarga de hablar con la pasarela de pagos de forma segura

### Entrada #B-6
Fecha: 2026-11-01
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Estructurar e implementar el sistema de internacionalización en español e inglés para todo el flujo de pantallas del conductor Inicio, Solicitud, Viaje en curso y Cobro
Prompt: Necesito que me ayudes a crear los archivos de traducción para la versión del conductor que maneje los textos en español e inglés de las pantallas de inicio, solicitud entrante, viaje en curso y resumen de cobro. Debe usar las mismas claves de traducción en ambos archivos para evitar textos faltantes al alternar el selector de idioma
Qué se usó / modificó / descartó: Se usaron de forma íntegra las estructuras y claves mapeadas provistas por la IA. Se verificó la simetría exacta entre las claves en español e inglés para mitigar errores de renderizado de texto vacío en la interfaz al cambiar de idioma. No se descartó contenido
Archivos y commit: src/i18n/trip.es.js, src/i18n/trip.en.js hash: c0230222dd9b737cf2cbf46fa04c43ef150cc532
Verificación: Alternar el selector global de idioma del Drawer en el emulador de Expo Go y comprobar que los componentes dinámicos
conmutaran sus textos de forma instantánea y correcta
Aprendizaje: Aprendí que organizar las traducciones desde el principio con las mismas palabras clave en español y en inglés te ahorra el dolor de cabeza de que la aplicación se quede en blanco o con textos rotos cuando el usuario cambia de idioma

### Entrada #B-7
Fecha: 2026-11-01
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Crear el hook personalizado useDriverLocation para enviar la ubicacion en tiempo real
Prompt: Ayudame a crear un hook en React Native llamado useDriverLocation. Necesito que cuando el conductor este disponible, la app empiece a seguir su ubicacion y guarde los cambios en la base de datos. Si el conductor se apaga o cierra la pantalla, el rastreo se debe detener por completo para no gastar bateria
Qué se usó / modificó / descartó: Se usó la base que generó Claude para controlar el encendido y apagado seguro del GPS, pero modifiqué el código añadiendo una validación propia para que solo guarde en la base de datos si el conductor realmente se movió de lugar. Descarté la idea original de la IA de enviar datos en cada instante, logrando así ahorrar batería y llamadas innecesarias al servidor si el vehículo está detenido. También agregué alertas en consola para ver los fallos al programar
Archivos y commit: src/hooks/useDriverLocation.js hash:
Verificación: Entrar a la app desde el emulador y encender el botón de "Disponible". Revisar la base de datos y ver cómo las coordenadas cambiaban solas. Al apagar el botón, el mapa debe dejar de enviar datos, confirmando que la limpieza funciona bien
Aprendizaje: Aprendí que en React siempre hay que programar una función de limpieza cuando se trabaja con funciones que se quedan corriendo en segundo plano, porque de lo contrario la aplicación se vuelve lenta o sigue consumiendo batería sin necesidad