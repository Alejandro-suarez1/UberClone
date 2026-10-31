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
Archivos y commit: src/i18n/es.js (hash: {{HASH:A-12}})
Verificación: Buscar en el código claves y comprobar que existen en el diccionario
Aprendizaje: Tener todos los textos juntos hace fácil revisar y traducir

### Entrada #A-13
Fecha: 2026-10-30
Integrante: Alejandro
Herramienta: Claude
Objetivo: Traducir los textos al inglés
Prompt: Ayudame a traducir estos textos
Qué se usó / modificó / descartó: Se usaron las traducciones sugeridas, se descarto la estructura
Archivos y commit: src/i18n/en.js (hash: {{HASH:A-13}})
Verificación: Comparar que es.js y en.js tienen exactamente las mismas claves
Aprendizaje: Si falta una clave en un idioma, la app muestra el texto en español como respaldo