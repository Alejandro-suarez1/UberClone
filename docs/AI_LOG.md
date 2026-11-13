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
Archivos y commit: src/components/common/Input.js (hash: 57a1bb54ee9dcffb02ccf4afc31a49318fe186c5)
Verificación: Escribir un valor inválido: el borde se pone rojo y el mensaje sale debajo
Aprendizaje: El error va en el campo para que el usuario sepa exactamente qué corregir

### Entrada #A-19
Fecha: 2026-11-02
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la lista desplegable de los formularios
Prompt: Me puedes ayudar a crear un selector de opciones para los formularios? Quiero que al abrirlo muestre las opciones disponibles, permita seleccionar una y muestre un check en la opción elegida
Qué se usó / modificó / descartó: Se tomó como referencia el componente sugerido por Claude y se adaptó a la estructura de los formularios del proyecto. Se descartaron elementos adicionales que no eran necesarios
Archivos y commit: src/components/common/Select.js (hash: 48d4d357eb4c89efd83c6e7d0c2873680633800e)
Verificación: Abrir, elegir una opción y ver el check; cerrar sin elegir
Aprendizaje: La hoja inferior es más cómoda con el pulgar que el selector nativo

### Entrada #A-20
Fecha: 2026-11-02
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el selector de fecha que funciona en Android e iOS
Prompt: Me puedes ayudar a implementar un selector de fecha compatible con Android y iOS, teniendo en cuenta cómo funciona en cada sistema y cómo mostrar la fecha seleccionada?
Qué se usó / modificó / descartó: Se tomó como guía el código de Claude para manejar ambos sistemas. Se utilizaron el diálogo nativo de Android y la hoja inferior con ruleta de iOS, sin necesitar funcionalidades adicionales.
Archivos y commit: src/components/common/DateField.js (hash: c70c6a21d40d14ed2d72c64551b812c5e25f87c3s)
Verificación: Elegir una fecha en un dispositivo Android y en uno iOS (o simulador) y ver el valor en formato día/mes/año
Aprendizaje: El selector de fecha se comporta distinto en cada sistema y hay que manejar los dos casos

### Entrada #A-21
Fecha: 2026-11-02
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el campo para tomar o elegir una foto
Prompt: Me puedes orientar para crear un campo que permita tomar una foto con la cámara o seleccionar una de la galería? También necesito manejar los permisos y mostrar un mensaje si el usuario los rechaza
Qué se usó / modificó / descartó: Se tomó como guía el código propuesto por Claude para permitir seleccionar fotos desde la galería o la cámara. Se aprovechó el manejo de permisos y los mensajes cuando el usuario no los autoriza.
Archivos y commit: src/components/common/ImagePickerField.js (hash: cb3fedcf3a86c4a94f77b3c79b895e54d2fa5f3d)
Verificación: Elegir una foto de galería y otra de cámara; negar el permiso y ver el mensaje
Aprendizaje: Hay que pedir el permiso antes de abrir la cámara o la galería

### Entrada #A-22
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la casilla para aceptar los términos
Prompt: puedes ayudarme a crear una casilla para aceptar los términos y condiciones? Necesito que permita marcar y desmarcar, y que muestre un mensaje de error si el usuario intenta continuar sin aceptarlos
Qué se usó / modificó / descartó: Se tomó como referencia el código de Claude para crear la casilla, incluyendo su estado marcado y desmarcado, la validación y el manejo de accesibilidad con accessibilityRole
Archivos y commit: src/components/common/Checkbox.js (hash: b912d273f4f6c18eacb042e08e5da268aacdf560)
Verificación: Marcar y desmarcar; sin marcar muestra el error en rojo
Aprendizaje: Una casilla accesible usa accessibilityRole checkbox

### Entrada #A-23
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la tarjeta base con degradado sutil y opción de halo
Prompt: Me puedes ayudar a crear un componente de tarjeta reutilizable con un degradado sutil y una opción de halo? Quiero poder utilizar ambos estilos según la necesidad de cada pantalla
Qué se usó / modificó / descartó: Se aprovecharon sus estilos y la posibilidad de reutilizarlo en diferentes partes de la aplicación
Archivos y commit: src/components/common/Card.js (hash: 21376abdaf3a77b2044bb1ac2d170b7ea22b036f)
Verificación: Mostrar una tarjeta normal y una glow en una pantalla de prueba
Aprendizaje: Reutilizar una tarjeta mantiene el mismo estilo en toda la app

### Entrada #A-24
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la etiqueta con punto de color para estados
Prompt: mw puedes ayudar a crear una etiqueta pequeña con un punto de color para identificar diferentes estados? Necesito manejar varios colores según el tipo de estado, especialmente para los pagos
Qué se usó / modificó / descartó: Se tomó como guía el componente generado para mostrar etiquetas con diferentes colores. Se utilizó paymentTone para asignar el color correspondiente según el estado del pago y se conservaron los tonos propuestos
Archivos y commit: src/components/common/Badge.js (hash: 14dee76b1fefd11efde95a87abb30960561ab17d)
Verificación: Probar los tonos success, warning, danger, info y neutral
Aprendizaje: Asociar el estado a un color ayuda a leer la información de un vistazo

### Entrada #A-25
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Mostrar un mensaje cuando no hay datos en lugar de una lista en blanco
Prompt: Me puedes guiar creando un componente que muestre un mensaje cuando una lista no tenga información? Quiero evitar que las pantallas queden en blanco cuando no hay resultados
Qué se usó / modificó / descartó: Claude ayudo guiando para mostrar un mensaje cuando no hay datos. Se aprovechó su estructura para indicar al usuario que no se encontraron resultados
Archivos y commit: src/components/common/EmptyState.js (hash: f22dcdfe305f12fbb1a6e524aa471c05caebfe00)
Verificación: Filtrar el historial sin resultados y ver el mensaje
Aprendizaje: El enunciado pide mostrar un mensaje vacío, no una pantalla en blanco

### Entrada #A-26
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear los filtros horizontales para periodos, métodos de pago e idioma
Prompt: Estoy implementando unos filtros en la aplicación. Cómo podría crear un componente horizontal que permita cambiar entre opciones para periodos, métodos de pago e idioma, mostrando cuál está seleccionada?
Qué se usó / modificó / descartó: Se implementó la estructura de selección propuesta por Claude para mostrar las opciones horizontalmente. Se aprovechó el mismo componente para manejar los diferentes filtros sin tener que crear uno independiente para cada caso
Archivos y commit: src/components/common/Chips.js (hash: 99a6f036e6bea3bd8ce7cce8a3d75db454c245a5)
Verificación: Cambiar de opción y ver cuál queda activa
Aprendizaje: Un componente de selección simple sirve para filtros, idioma y propinas

### Entrada #A-27
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la tarjeta de número para la pantalla de ganancias
Prompt: Necesito mostrar los valores de ganancias en tarjetas, me puedes indicar cómo crear un componente que muestre un título y un monto, y que se adapte cuando los números sean demasiado largos?
Qué se usó / modificó / descartó: Se aprovechó la estructura del componente generado por Claude para mostrar los valores y sus títulos. También se utilizó adjustsFontSizeToFit para evitar que los montos largos se corten
Archivos y commit: src/components/common/StatCard.js (hash: 500bb5a3e1847fd2861d4c9004393be13134a089)
Verificación: Mostrarla con un valor largo y comprobar que el texto se ajusta
Aprendizaje: adjustsFontSizeToFit evita que los montos grandes se corten

### Entrada #A-28
Fecha: 2026-10-27
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el contenedor con fondo degradado, zona segura y scroll
Prompt: Estoy organizando las pantallas de la aplicación y necesito un contenedor que tenga fondo degradado, respete las zonas seguras del dispositivo y permita desplazarse cuando haya mucho contenido, cómo podría implementarlo?
Qué se usó / modificó / descartó: Se utilizó la estructura del componente para manejar el fondo, los márgenes y el desplazamiento de las pantallas. También se aprovechó el ajuste con el teclado para evitar que los campos quedaran ocultos
Archivos y commit: src/components/common/ScreenContainer.js (hash: 28c1e18b4b99e27daba18e7807e067b9aa0a3241)
Verificación: Abrir una pantalla con teclado y comprobar que el campo no queda tapado
Aprendizaje: Un contenedor común da el mismo fondo y márgenes a todas las pantallas

### Entrada #A-29
Fecha: 2026-11-04
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el servicio para registrar y consultar conductores y subir las fotos
Prompt: Estoy trabajando en el registro de conductores y necesito organizar las funciones para guardar sus datos, consultarlos y subir sus fotografías, me puedes orientar sobre cómo conectar este servicio con Firebase y manejar las imágenes?
Qué se usó / modificó / descartó: Se aprovechó la lógica propuesta por Claude para registrar y consultar conductores en Firebase. También se incluyó el manejo de fotografías mediante Cloudinary, conservando la ruta local como alternativa mientras se configura el servicio
Archivos y commit: src/services/driverService.js (hash: deb064ccd582307b5d0e3307492770a2e2179e09)
Verificación: Crear un conductor de prueba y verlo en la colección drivers con approval pending
Aprendizaje: Las fotos se suben a Cloudinary y en la base solo se guarda la URL

### Entrada #A-30
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Manejar la sesión, la aprobación y el estado Disponible
Prompt: Estoy trabajando en la sesión de los conductores y necesito controlar si están aprobados y si pueden aparecer como disponibles, cómo puedo detectar los cambios de aprobación en Firebase sin tener que reiniciar la aplicación?
Qué se usó / modificó / descartó: Se uso como base la lógica propuesta por Claude para controlar la sesión y escuchar los cambios del conductor en tiempo real mediante onSnapshot. También se utilizó la validación para impedir que un conductor no aprobado pueda cambiar su estado a disponible
Archivos y commit: src/context/DriverSessionContext.js (hash: 4b6b0ad76142a4c7a5ef06c57afded136154a7ee)
Verificación: Cambiar approval a approved en Firestore y ver que la app lo detecta; sin aprobar, setAvailable(true) devuelve false
Aprendizaje: Escuchar el documento con onSnapshot evita tener que reiniciar la app al aprobar

### Entrada #A-31
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Guardar el formulario de las tres pestañas y controlar el envío
Prompt: Estoy trabajando en un formulario dividido en tres pestañas y necesito que los datos se conserven al cambiar entre ellas, me puedes indicar cómo controlar la validación y el envío para que solo se active cuando todas estén completas?
Qué se usó / modificó / descartó: Se aprovechó la lógica de Claude para compartir los datos entre las tres pestañas, validar los campos y controlar el botón de envío. También se integraron los procesos para subir las imágenes, registrar el conductor y abrir su sesión
Archivos y commit: src/context/RegistrationContext.js (hash: 70d4f8f6fa7599225758a75d8dca7c5cd9b4f2c4)
Verificación: Dejar campos vacíos: el botón sigue deshabilitado; completar todo y enviar
Aprendizaje: Compartir el estado entre pestañas permite habilitar Enviar solo si las tres son válidas

### Entrada #A-32
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la pantalla inicial con las opciones de registro e ingreso
Prompt: Estoy diseñando la pantalla inicial de la aplicación y quiero mostrar las opciones para registrarse o iniciar sesión, qué estructura podría utilizar para que ambas opciones sean fáciles de identificar y navegar?
Qué se usó / modificó / descartó: Se utilizaron las ideas de Claude para organizar las opciones de registro e ingreso. Se mantuvo la estructura visual propuesta y se integró con la navegación de la aplicación
Archivos y commit: src/screens/auth/WelcomeScreen.js (hash: 8ebd196b3967ab306afb9c756d46f1b172aa751e)
Verificación: Abrir la app sin sesión y navegar a Registro y a Ingresar
Aprendizaje: La primera pantalla define la identidad visual de la app

### Entrada #A-33
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Permitir volver a entrar con el correo registrado
Prompt: Necesito implementar la pantalla de ingreso para que los conductores puedan volver a entrar con su correo registrado. ¿Me puedes orientar sobre cómo validar el correo y mostrar un mensaje cuando no exista una cuenta?
Qué se usó / modificó / descartó: Se utilizó la lógica propuesta por Claude para consultar el correo registrado y validar el ingreso. También se aprovechó la validación para mostrar un mensaje de error debajo del campo cuando el correo no existe
Archivos y commit: src/screens/auth/LoginScreen.js (hash: 78cd08334a16bcccb524ef569dfdbd4c5ab0d1f5)
Verificación: Entrar con un correo registrado y con uno que no existe (debe mostrar el error debajo)
Aprendizaje: Sin autenticación real, el correo identifica la cuenta de la práctica

### Entrada #A-34
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la primera pestaña del registro
Prompt: Estoy desarrollando la primera pestaña del registro y necesito validar los datos personales del conductor, me puedes indicar cómo controlar campos como nombre, documento, edad y correo, mostrando los errores cuando los datos no sean correctos?
Qué se usó / modificó / descartó: Se implementaron las validaciones sugeridas para los datos personales, utilizando mensajes debajo de cada campo para indicar los errores y evitar que se continúe con información incorrecta
Archivos y commit: src/screens/auth/PersonalTab.js (hash: 4220725ae1cba00c67c42f7db3cbfe793b6f2390)
Verificación: Probar nombre con números, documento corto, menor de 18 y correo sin dominio
Aprendizaje: Cada regla del enunciado se convierte en un mensaje debajo del campo

### Entrada #A-35
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la segunda pestaña del registro
Prompt: Estoy trabajando en la segunda pestaña del registro, donde se ingresan los datos del vehículo, me puedes orientar sobre cómo validar la placa, seleccionar el tipo de vehículo y controlar la cantidad de pasajeros permitidos?
Qué se usó / modificó / descartó: Se utilizaron las validaciones propuestas para los datos del vehículo. También se incorporó la conversión automática de la placa a mayúsculas y el control de pasajeros según el tipo de vehículo seleccionado.
Archivos y commit: src/screens/auth/VehicleTab.js (hash: f95a3adca005df0001e5782ffe3d0cde163fb4a3)
Verificación: Escribir la placa en minúscula (se convierte a mayúsculas) y elegir XL con 4 pasajeros
Aprendizaje: La placa se normaliza antes de validar, como pide el enunciado

### Entrada #A-36
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la tercera pestaña del registro
Prompt: Estoy desarrollando la última pestaña del registro, donde se cargan los documentos del conductor y del vehículo, me puedes indicar cómo mostrar la revisión técnico-mecánica solo cuando sea necesaria y validar que se acepten los términos?
Qué se usó / modificó / descartó: Se aprovechó la lógica propuesta para mostrar u ocultar la revisión técnico-mecánica según el año del vehículo. También se incluyeron las validaciones para los documentos y la aceptación obligatoria de los términos
Archivos y commit: src/screens/auth/DocumentsTab.js (hash: fc16d7f1e23b73f15b965b5f83bf0408c44d8dcd)
Verificación: Poner un vehículo de 2015 y ver que aparece la revisión; dejar los términos sin marcar
Aprendizaje: Un formulario puede cambiar según lo que el usuario ya escribió

### Entrada #A-37
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Unir las tres pestañas con Tab y el botón Enviar registro
Prompt: Ya tengo las tres pestañas del registro por separado, me puedes orientar sobre cómo integrarlas en una sola pantalla con navegación por pestañas y un botón para enviar el registro que solo se habilite cuando todas estén completas?
Qué se usó / modificó / descartó: Se incorporó la estructura de navegación entre las tres pestañas y se utilizó una barra inferior personalizada para mostrar el botón de envío y el estado de cada sección. También se aprovechó la validación para controlar cuándo se habilita el botón.
Archivos y commit: src/screens/auth/RegisterScreen.js (hash: 7843b82bf09484ca16a4915cddfadda9481cb957)
Verificación: Con una pestaña incompleta el botón está deshabilitado; con las tres completas se habilita
Aprendizaje: Una barra personalizada permite mostrar el botón de envío siempre visible

### Entrada #A-38
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Calcular los totales de hoy, semana, mes y el saldo
Prompt: Tengo un hook llamado useEarnings.js que debe calcular las ganancias y el saldo a partir de los viajes registrados, me puedes indicar cómo obtener los totales del día, la semana y el mes, teniendo en cuenta que el saldo se calcula restando las comisiones de los viajes en efectivo a los viajes pagados por pasarela?
Qué se usó / modificó / descartó: La orientación de Claude sirvió para comprender cómo organizar los cálculos de ganancias por día, semana y mes, y cómo obtener el saldo teniendo en cuenta los pagos por pasarela y las comisiones de los viajes en efectivo. También se aplicó el uso de useMemo para evitar cálculos innecesarios cuando la lista de viajes no cambia.
Archivos y commit: src/hooks/useEarnings.js (hash: 40bf020fed1cf78d26b742d8e72c7722412d146c)
Verificación: Con los viajes de ejemplo revisar a mano que los totales coinciden
Aprendizaje: useMemo evita recalcular los totales si la lista de viajes no cambió

### Entrada #A-39
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Tener viajes de prueba para trabajar sin esperar el servicio de B
Prompt: Necesito seguir desarrollando la aplicación mientras se conecta el servicio de backend, me puedes orientar sobre cómo crear viajes de prueba que permitan simular diferentes registros y consultar los resultados por páginas, sin depender todavía del servicio real?
Qué se usó / modificó / descartó: La guía de Claude permitió entender cómo generar viajes ficticios y simular la consulta de datos por páginas. Se tuvo en cuenta la variable EXPO_PUBLIC_USE_MOCKS=true para activar estos datos de prueba y poder avanzar con el desarrollo sin depender del servicio de backend.
Archivos y commit: src/utils/mockTrips.js (hash: 2048b41663856d8b4536b7c83d9520930ddf48a6)
Verificación: Pedir dos páginas de 15 viajes y comprobar el orden y el cursor
Aprendizaje: Los datos de ejemplo permiten avanzar en paralelo sin bloquearse

### Entrada #A-40
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Cargar el historial por páginas con filtros
Prompt: Estoy trabajando en el historial de viajes y quiero que los registros se carguen por páginas y puedan filtrarse, me puedes explicar cómo organizar esta lógica para que al cambiar un filtro se vuelva a la primera página y se puedan cargar más resultados al desplazarse?
Qué se usó / modificó / descartó: La orientación de Claude ayudó a comprender cómo manejar la carga paginada y los filtros en el historial. Se aplicó la lógica para consultar los viajes mediante tripService.getDriverTrips o utilizar los datos de ejemplo. También se tuvo en cuenta cómo ignorar respuestas de consultas anteriores para evitar que los resultados de un filtro viejo reemplacen los actuales
Archivos y commit: src/hooks/useTripHistory.js (hash: 71dff7e55ae3805134a2e6e475d8ba0b2a8a5431)
Verificación: Cambiar de filtro y ver que vuelve a la primera página; bajar y ver que carga más
Aprendizaje: Ignorar respuestas viejas evita que un filtro anterior pise al nuevo

### Entrada #A-41
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la fila con fecha, ruta, categoría, tarifa y estado de pago
Prompt: Estoy creando el historial de viajes y necesito mostrar la información de cada recorrido de forma ordenada, me puedes orientar sobre cómo diseñar un componente que presente la fecha, la ruta, la categoría, la tarifa y el estado del pago sin que la fila quede demasiado cargada?
Qué se usó / modificó / descartó: Estoy creando el historial de viajes y necesito mostrar la información de cada recorrido de forma ordenada. ¿Me puedes orientar sobre cómo diseñar un componente que presente la fecha, la ruta, la categoría, la tarifa y el estado del pago sin que la fila quede demasiado cargada?
Archivos y commit: src/components/common/TripListItem.js (hash: 71dff7e55ae3805134a2e6e475d8ba0b2a8a5431)
Verificación: Mostrar un viaje de ejemplo y ver todos los datos
Aprendizaje: Un componente de lista debe ser simple para que la lista sea fluida

### Entrada #A-42
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Mostrar saldo y totales de hoy, semana y mes
Prompt: Ya tengo los cálculos de ganancias y saldo en un hook, me puedes orientar sobre cómo mostrar esa información en la pantalla de ganancias, incluyendo el saldo disponible y los totales de hoy, semana y mes, y cómo actualizar los valores al cambiar de periodo?
Qué se usó / modificó / descartó: Claude me ayudó a identificar cómo organizar la información de ganancias dentro de la pantalla. Se tuvieron en cuenta las ideas para mostrar el saldo y los totales de cada periodo, conectando la información con los cálculos del hook useEarnings para que los valores se actualizaran al cambiar de periodo
Archivos y commit: src/screens/earnings/EarningsScreen.js (hash: 504869d105c1795fb4003275ff4d80bfd4fa313f)
Verificación: Con los datos de ejemplo cambiar de periodo y revisar que los números cambian
Aprendizaje: Trabajar con el historial completo permite calcular el saldo correcto

### Entrada #A-43
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el historial con filtros de fecha y de método de pago
Prompt: Estoy desarrollando la pantalla del historial de viajes y quiero que permita consultar los recorridos según diferentes periodos y métodos de pago, me puedes guiar sobre cómo organizar los filtros de Hoy, Semana, Mes y Rango de fechas, junto con los métodos de pago, y cómo mostrar los resultados sin cargar todos los viajes al mismo tiempo?
Qué se usó / modificó / descartó: Claude me orientó sobre cómo organizar los filtros y conectarlos con la consulta paginada del historial. Se tuvieron en cuenta las opciones de fecha y método de pago, además del uso de FlatList con onEndReached para cargar más viajes a medida que el usuario se desplaza por la pantalla.
Archivos y commit: src/screens/history/HistoryScreen.js (hash: cb2dc8cadb83cdf512303f341d0bd17bc00c80fb)
Verificación: Probar Hoy, Semana, Mes, Rango y los métodos de pago; filtrar hasta que no haya resultados
Aprendizaje: FlatList con onEndReached carga por páginas sin traer todo de una vez

### Entrada #A-44
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Mostrar el detalle del viaje con la ruta dibujada
Prompt: Quiero crear una pantalla para consultar los detalles de cada viaje, incluyendo un mapa que muestre el recorrido realizado, me puedes orientar sobre cómo dibujar la ruta usando las coordenadas guardadas y qué alternativa utilizar cuando no estén disponibles?
Qué se usó / modificó / descartó: Claude me ayudó a comprender cómo representar el recorrido en el mapa utilizando las coordenadas almacenadas. Se tuvo en cuenta el uso de Polyline para dibujar la ruta guardada y, cuando no existe esa información, mostrar una línea sencilla entre el origen y el destino. También se consideró la organización de datos como la comisión, la propina y la calificación del viaje
Archivos y commit: src/screens/history/TripDetailScreen.js (hash: 6c143774c4cea58101caa08d59c1f39c74bd1756)
Verificación: Abrir un viaje y comprobar el mapa, la comisión, la propina y la calificación
Aprendizaje: Dibujar la ruta guardada ahorra llamadas a la API de mapas

### Entrada #A-45
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Permitir editar nombre, celular, vehículo y documentos
Prompt: Estoy trabajando en la pantalla de perfil y quiero permitir que el conductor actualice sus datos personales, información del vehículo y documentos, me puedes orientar sobre cómo implementar la edición de estos campos, reutilizando las validaciones que ya tengo en el formulario de registro y guardando los cambios en Firestore?
Qué se usó / modificó / descartó: la IA me orientó sobre cómo organizar la edición de los datos del perfil y aprovechar los validadores existentes del registro para evitar repetir lógica. También se tuvo en cuenta cómo actualizar campos específicos de Firestore, como personal.phone, sin tener que reemplazar todo el documento.
Archivos y commit: src/screens/profile/ProfileScreen.js (hash: 6c143774c4cea58101caa08d59c1f39c74bd1756)
Verificación: Editar el celular con un valor inválido y con uno válido; ver el cambio en Firestore
Aprendizaje: Los campos con punto, como personal.phone, permiten actualizar solo una parte del documento

### Entrada #A-46
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear la pantalla de idioma, comisión y cierre de sesión
Prompt: Quiero crear una pantalla de configuración para que el conductor pueda consultar y cambiar el idioma, revisar la información de las comisiones y cerrar su sesión, me puedes guiar sobre cómo organizar estas opciones y agregar una confirmación antes de cerrar sesión para evitar salidas accidentales?
Qué se usó / modificó / descartó: me ayudó a definir cómo organizar las opciones de configuración y el comportamiento de cada una. Se tuvieron en cuenta las ideas para cambiar el idioma, mostrar la información de las comisiones y solicitar una confirmación antes de cerrar la sesión
Archivos y commit: src/screens/profile/SettingsScreen.js (hash: 883fd2a45330a89af1096fb1b4afa9c39261eeba)
Verificación: Cambiar el idioma y cerrar sesión con la confirmación
Aprendizaje: Pedir confirmación antes de cerrar sesión evita salir por accidente

### Entrada #A-47
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Crear el menú lateral con los datos del conductor
Prompt: Estoy implementando el menú lateral de la aplicación y quiero que muestre la información principal del conductor, me puedes orientar sobre cómo organizarlo para incluir su foto, nombre, placa del vehículo, estado de aprobación y disponibilidad, de manera que sea fácil consultar el estado de la cuenta?
Qué se usó / modificó / descartó: me ayudó a definir la distribución de los datos dentro del menú lateral y cómo presentar visualmente la información del conductor. Se tuvieron en cuenta los elementos necesarios para identificar al usuario y consultar rápidamente su estado de aprobación y disponibilidad.
Archivos y commit: src/navigation/DrawerContent.js (hash: c95f1411034ec602facfddae080e8e4d696ffc10)
Verificación: Abrir el menú y ver foto, nombre, placa, estado de aprobación y disponibilidad
Aprendizaje: El menú lateral resume el estado de la cuenta en un solo lugar

### Entrada #A-48
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Armar el Drawer con Inicio, Ganancias, Historial, Perfil y Configuración
Prompt: Ya tengo varias pantallas creadas para la aplicación y quiero conectarlas mediante un menú lateral, me puedes orientar sobre cómo configurar el Drawer para navegar entre Inicio, Ganancias, Historial, Perfil y Configuración, teniendo en cuenta que la pantalla de Inicio ya tiene su propio encabezado?
Qué se usó / modificó / descartó: me orientó sobre la configuración del navegador lateral y la conexión de las diferentes pantallas. Se tuvieron en cuenta las opciones de navegación y la particularidad de Inicio, que conserva su propio encabezado. También se identificaron las dependencias necesarias, como gesture-handler y reanimated, para el funcionamiento del Drawer.
Archivos y commit: src/navigation/DrawerNavigator.js (hash: 9626c58e0245597332fb3c710b735362a76819b7)
Verificación: Navegar a cada opción desde el menú
Aprendizaje: El Drawer necesita gesture-handler y reanimated instalados

### Entrada #A-49
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Elegir entre autenticación y app, y registrar las pantallas del viaje
Prompt: Estoy organizando la navegación principal de la aplicación y necesito controlar qué pantallas se muestran según el estado de la sesión, me puedes orientar sobre cómo separar el flujo de autenticación del resto de la aplicación y cómo registrar las pantallas del viaje dentro del Stack, respetando los nombres definidos en el contrato con el otro integrante?
Qué se usó / modificó / descartó: Se usó el archivo completo generado por Claude, sin modificaciones. Nada descartado. Las pantallas del viaje son de B; en el Stack se registran con los nombres del contrato.
Archivos y commit: src/navigation/RootNavigator.js (hash: 9626c58e0245597332fb3c710b735362a76819b7)
Verificación: Sin sesión se ve Welcome; con sesión se ve el Drawer
Aprendizaje: El Stack permite apilar el flujo del viaje encima del Drawer

### Entrada #A-50
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Armar la app con fuentes, proveedores y el contenedor de navegación
Prompt: Estoy organizando el archivo principal App.js y quiero integrar las fuentes de texto, los proveedores de contexto y el contenedor de navegación, me puedes explicar cómo estructurar estos elementos y en qué orden ubicar los proveedores de idioma, sesión y viaje activo para evitar problemas de dependencias entre ellos?
Qué se usó / modificó / descartó: Claude me orientó sobre cómo organizar la estructura principal de la aplicación y conectar sus diferentes elementos. Se tuvieron en cuenta las indicaciones para cargar las fuentes, integrar el contenedor de navegación y establecer el orden correcto de los proveedores: primero idioma, después sesión y finalmente viaje activo.
Archivos y commit: App.js (hash: {{HASH:A-50}})
Verificación: Abrir la app: carga las fuentes y muestra Welcome
Aprendizaje: El orden de los proveedores importa porque unos usan a los otros

### Entrada #A-51
Fecha: 2026-11-05
Integrante: Alejandro
Herramienta: Claude
Objetivo: Documentar la instalación, las variables de entorno y la arquitectura
Prompt: Quiero mejorar el README del proyecto para que cualquier integrante del equipo pueda entender cómo instalar y ejecutar la aplicación, me puedes ayudar sobre cómo documentar los pasos de instalación, las variables de entorno y la arquitectura del proyecto, incluyendo una sección que explique el uso de inteligencia artificial y enlace a la bitácora?
Qué se usó / modificó / descartó: me ayudó a organizar el contenido y definir qué información era importante incluir en la documentación. Se tuvieron en cuenta las indicaciones para explicar la instalación, las variables de entorno y la estructura de la arquitectura, además de agregar una sección sobre el uso de IA con el enlace a la bitácora.
Archivos y commit: README.md (hash: 74bf72acb7c1dec68b23fc9ec72e5f2fa5910b39)
Verificación: Seguir el README desde cero en otra carpeta
Aprendizaje: Un buen README permite que otra persona ejecute el proyecto sin preguntar

### Entrada #A-52
Fecha: 2026-11-06
Integrante: Alejandro
Herramienta: Claude
Objetivo: Elegir entre autenticación y app, y registrar las pantallas del viaje
Prompt: Estoy organizando la navegación de la aplicación y necesito que se muestre una pantalla diferente dependiendo de si el conductor ha iniciado sesión o no, me puedes orientar sobre cómo manejar esta condición y cómo registrar en el Stack las pantallas del viaje que desarrolló el otro integrante, respetando los nombres definidos en el contrato?
Qué se usó / modificó / descartó: La orientación de Claude me permitió comprender cómo separar la navegación de autenticación y la navegación principal. Se tuvieron en cuenta las condiciones para mostrar Welcome cuando no hay una sesión activa y el Drawer cuando el conductor ya inició sesión. También se revisó cómo registrar las pantallas del viaje en el Stack utilizando los nombres acordados con el otro integrante.
Archivos y commit: src/navigation/RootNavigator.js (hash: ca6f011895084003f0395dc3b3627532fadb66ba)
Verificación: Sin sesión se ve Welcome; con sesión se ve el Drawer
Aprendizaje: El Stack permite apilar el flujo del viaje encima del Drawer



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
Archivos y commit: src/hooks/useDriverLocation.js hash: 06bd35877095e2c04b79e01870bcf11f44027ba5
Verificación: Entrar a la app desde el emulador y encender el botón de "Disponible". Revisar la base de datos y ver cómo las coordenadas cambiaban solas. Al apagar el botón, el mapa debe dejar de enviar datos, confirmando que la limpieza funciona bien
Aprendizaje: Aprendí que en React siempre hay que programar una función de limpieza cuando se trabaja con funciones que se quedan corriendo en segundo plano, porque de lo contrario la aplicación se vuelve lenta o sigue consumiendo batería sin necesidad

### Entrada #B-8
Fecha: 2026-11-02
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Implementar la recepción de solicitudes de viaje en tiempo real y gestionar su rechazo automático por expiración del temporizador al transcurrir el límite establecido de 15 segundos
Prompt: Ayudame a crear un hook en para escuchar solicitudes de viaje en tiempo real, permitiendo aceptarlas, rechazarlas manualmente o rechazarlas de forma automática si pasan 15 segundos sin respuesta
Qué se usó / modificó / descartó: Se integró la lógica del hook para gestionar las solicitudes en tiempo real y el control del temporizador. No se descartó nada, pero se optimizó el manejo de excepciones en la función de rechazo incorporando un registro de advertencias en consola para un mejor control de errores de red, manteniendo intacta la estructura base y los nombres de las variables para asegurar la compatibilidad con el proyecto
Archivos y commit: src/hooks/useTripRequests.js hash: cb71bd6d2a5bb08ade6ab1904ff04371436f2dd8
Verificación: Dejar pasar 15 segundos sin hacer nada para comprobar que el estado cambie automáticamente en Firestore, y probar el botón de aceptar para validar que el cambio se registre correctamente
Aprendizaje: Controlar los temporizadores con funciones de limpieza es fundamental para evitar que los procesos se queden corriendo en segundo plano y causen errores de memoria

### Entrada #B-9
Fecha: 2026-11-03
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Guardar el viaje activo y abrir la solicitud entrante cuando llega
Prompt: Ayúdame a estructurar un context para administrar el viaje activo, gestionar la escucha de solicitudes, automatizar la navegación global y robustecer el control de errores en todas las funciones asíncronas
Qué se usó / modificó / descartó: Se integró y ajustó el contexto para controlar el viaje en curso y la navegación automática al recibir una solicitudS. Se mejoró el manejo de errores en las funciones principales para evitar fallos de red inesperados y garantizar que la app responda correctamente si el pasajero cancela el viaje, todo ello sin alterar la estructura base del proyecto. No se descartó nada
Archivos y commit: src/context/ActiveTripContext.js hash: 2870686ee1de1dca856ed0088204a1ee137ee26f
Verificación: Simular la cancelación desde Firestore se valida que se muestra la alerta correspondiente y se redirige al inicio, y se verifica mediante pruebas en consola que los errores de red en las funciones asíncronas son capturados de forma limpia sin afectar la interfaz
Aprendizaje: Un contexto global facilita la gestión de eventos en tiempo real y la navegación, mientras que el control de excepciones previene fallos silenciosos y mejora la estabilidad de la aplicación

### Entrada #B-10
Fecha: 2026-11-04
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Implementar un componente visual de cuenta regresiva en formato de anillo circular para limitar el tiempo de aceptación de las solicitudes de viaje por parte del conductor
Prompt: Necesito crear un componente que muestre un temporizador circular de 15 segundos. Debe incluir un número central con la cuenta regresiva, el anillo debe irse vaciando a medida que pasa el tiempo, y todo el componente debe cambiar a color de alerta cuando falten 5 segundos o menos
Qué se usó / modificó / descartó: Se tomó la idea de la estructura base para el anillo visual del temporizador. Se modificó la forma de girar el círculo para asegurar que la animación comience exactamente arriba en el centro y no se mueva de su lugar en las pantallas de Android e iOS
Archivos y commit: src/components/trip/CountdownRing.js hash: 75b7106ed509f4cc4d25803dc42737a665d707e4
Verificación: Probar en el emulador simulando el contador de 15 a 0 segundos. Confirmar que el círculo se va vaciando de forma limpia, cambia a color rojo al llegar al segundo 5 y el número del centro se mantiene alineado
Aprendizaje: Aprendí cómo usar las propiedades de dibujo de círculos en pantallas móviles para crear barras de progreso circulares y la importancia de fijar el punto de rotación en el centro exacto de la figura para que no se descuadre el diseño

### Entrada #B-11
Fecha: 2026-11-04
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Mostrar la información clave del viaje como origen, destino, distancia, tiempo, categoría, pago, tarifa y ganancia mejorando el rendimiento y la seguridad de los datos
Prompt: Ayudame a crear un componente para la tarjeta de solicitud de viaje que muestre todos los datos clave como origen, destino, estadísticas, pago, tarifa y ganancia usando la función de cálculo
Qué se usó / modificó / descartó: Se usó la estructura inicial y la función de tarifas. Se mejoró el código para que los cálculos financieros no se repitieran innecesariamente en cada pantalla y se añadieron protecciones básicas para evitar que la aplicación falle si algún dato del viaje llega tarde o vacío. No se descartó nada
Archivos y commit: src/components/trip/TripRequestCard.js hash: da7da547124a9f5f50a392f95e7250413e7dc846
Verificación: Revisar visualmente que la tarjeta mostrara los datos correctos y que la tarifa coincidiera con los cálculos esperados
Aprendizaje: Aprendí a organizar elementos visuales y estadísticos en componentes limpios, reutilizando funciones de cálculo para mantener los montos exactos y protegiendo el código contra datos vacíos

### Entrada #B-12
Fecha: 2026-11-04
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Renderizar el mapa del viaje dibujando la ruta con Polyline y los marcadores de la ubicación del conductor y el punto destino
Prompt: Ayudame a crear un componente de mapa interactivo que dibuje la linea de la ruta del viaje y muestre los puntos del conductor y el destino de forma visual
Qué se usó / modificó / descartó: Se usó la base de guia generada por Claude dejando el mapa con estilo oscuro. Se mejoró la lógica del efecto para calcular la firma de la ruta y re-encuadrar el mapa de forma fluida al cambiar el tramo, protegiendo las lecturas de coordenadas vacías. No se descartó nada
Archivos y commit: src/components/trip/RouteMap.js hash: 97b69c3bc1f24769ad291016f3b4bd9d121f1d41
Verificación: Probar en el emulador observando la ruta hacia la recogida del pasajero y hacia el destino final, comprobando el re-encuadre automático del mapa
Aprendizaje: Aprendí a integrar y estructurar un mapa interactivo, combinando líneas de ruta y marcadores personalizados para el conductor y el destino. Además, comprendí cómo usar referencias y efectos condicionales para ajustar automáticamente el zoom y encuadrar todo el recorrido en la pantalla de forma fluida a medida que cambian las coordenadas

### Entrada #B-13
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Permitir que el pasajero pueda dejar una propina de forma rápida y visual al terminar el viaje, asegurando que se refleje correctamente en las ganancias del conductor
Prompt: Necesito que me guies de tal manera que pueda crear un selector rápido de propinas usando chips con montos predefinidos incluyendo la opción de cero para que el usuario pueda agregarlas fácilmente al finalizar un viaje, aplicando los estilos y traducciones del sistema
Qué se usó / modificó / descartó: Se aprovechó la estructura base de componentes visuales (Chips) y las funciones globales de formato de dinero para estructurar las opciones de propina. Se ajustaron los textos descriptivos y las etiquetas de ayuda manteniendo una interfaz limpia y fluida. No se descartó ninguna opción previa
Archivos y commit: src/components/trip/TipSelector.js hash: a28b64a1f2ecba2bf60fe6925724c5d072fe70b1
Verificación: Seleccionar montos en pantalla y comprobar visualmente que la selección responde de inmediato y suma correctamente al total de la ganancia neta del viaje
Aprendizaje: Comprendí cómo estructurar componentes interactivos pequeños basados en opciones rápidas (chips), conectándolos limpiamente con los estados del sistema para mejorar la experiencia al finalizar procesos importantes como el pago de un viaje

### Entrada #B-14
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Integrar una pasarela de pagos segura dentro de un modal en la aplicación móvil utilizando un componente WebView para gestionar el proceso de cobro
Prompt: Necesito que me guies de tal manera que pueda crear un componente modal que abra una pasarela de pago dentro de la aplicación mediante un WebView, mostrando un indicador de carga y detectando automáticamente la URL de retorno del backend para cerrar el modal de forma fluida
Qué se usó / modificó / descartó: Se utilizó una estructura de Modal combinada con WebView de React Native y un indicador de actividad. Se optimizó la lógica de navegación para cerrar el modal de forma automática al detectar que el usuario regresa a la URL de redirección configurada por el backend. No se descartó ningún elemento previo
Archivos y commit: src/components/trip/CheckoutModal.js hash: 7466dce6e8195369dc3d2d84b84551c7ef2d0fd2
Verificación: Abrir el proceso de checkout con una URL de prueba, observar el indicador de carga durante la navegación y comprobar que el modal se cierra correctamente al alcanzar la página de retorno
Aprendizaje: Comprendí cómo integrar vistas web dentro de una aplicación móvil para flujos seguros como pagos, y la importancia de delegar la validación real del éxito de la transacción al backend a través de la base de datos en lugar de depender únicamente de la interfaz del navegador web

### Entrada #B-15
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Mostrar de forma visual y estandarizada los distintos estados de un pago (Aprobado, Pendiente, Rechazado o Efectivo) dentro de la aplicación
Prompt: Me puedes ayudar a crear un componente de insignia reutilizable para los estados de pago, que traduzca dinámicamente cada estado como aprobado, pendiente, rechazado o efectivo y le asigne el color y estilo correspondiente usando la base de insignias del sistema
Qué se usó / modificó / descartó: Se aprovechó el componente global de insignias (Badge) y su utilidad de tonos para pagos, asegurando un valor por defecto en caso de que el estado llegue vacío. Se ajustó para utilizar las traducciones del sistema. No se descartó ningún elemento previo
Archivos y commit: src/components/trip/PaymentStatusPill.js hash: 7d51937d693e706e7fb4c67c4009a34d0ec2c131
Verificación: Probar en pantalla los cuatro estados posibles de un pago y comprobar que cada uno muestra su etiqueta traducida con el color e identidad visual correctos
Aprendizaje: Comprendí que reutilizar componentes base como las insignias (Badge) ayuda a mantener una consistencia visual impecable en toda la aplicación y simplifica la gestión de los colores de estado

### Entrada #B-16
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Diseñar e implementar la pantalla principal de la aplicación para conductores, integrando un mapa interactivo de fondo que sigue la ubicación, un panel flotante con el estado y el interruptor de disponibilidad, y avisos claros según la aprobación de la cuenta
Prompt: Me puedes ayudar a crear la pantalla principal (Home) que muestre un mapa oscuro cubriendo toda la vista, un encabezado flotante con el menú y el saludo personalizado, un panel inferior con el interruptor de disponibilidad bloqueado si la cuenta está pendiente o rechazada, y botones de simulación de prueba visibles únicamente en entorno de desarrollo
Qué se usó / modificó / descartó: Se utilizó una estructura de capas absolutas con MapView de fondo y componentes SafeAreaView superpuestos. Se integraron hooks personalizados para el manejo de la ubicación, sesiones del conductor y traducciones. Se incorporó además la lógica para simular peticiones de viaje en modo de desarrollo. No se descartó ningún elemento previo
Archivos y commit: src/screens/home/HomeScreen.js hash: 62800c871afdad5334557df69bfbf279b3f4d3dd
Verificación: Probar en el emulador comprobando que con una cuenta pendiente el interruptor permanece bloqueado con su respectivo aviso, y que al aprobar la cuenta se activa correctamente para enviar la ubicación en tiempo real
Aprendizaje: Comprendí cómo estructurar pantallas principales complejas utilizando vistas flotantes sobre mapas interactivos, gestionando permisos de ubicación en tiempo real y condicionando los elementos visuales según los estados de validación del usuario

### Entrada #B-17
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Diseñar e implementar la pantalla para visualizar las solicitudes de viaje entrantes, integrando un anillo de cuenta regresiva, los detalles del servicio y los botones de aceptación y rechazo
Prompt: Necesito que me guies para crear una pantalla que muestre la solicitud de viaje entrante con una cuenta regresiva visual, un indicador de los segundos restantes, y botones interactivos para aceptar o rechazar el servicio, manejando correctamente el estado de carga y evitando cierres inesperados durante la aceptación
Qué se usó / modificó / descartó: Se utilizó una estructura de contenedor con scroll, combinada con componentes visuales especializados como CountdownRing y TripRequestCard. Se implementó una referencia para evitar que la pantalla se desmonte automáticamente al procesar la aceptación. No se descartó ningún elemento previo
Archivos y commit: src/screens/trip/IncomingRequestScreen.js hash: d993b565b3e06cdbe61b8cc5f2fe741fbe52b763
Verificación: Probar en pantalla la recepción de un viaje aceptando una solicitud, rechazando otra de forma manual, y permitiendo que una tercera expire por tiempo límite
Aprendizaje: Comprendí que al manejar flujos asíncronos críticos como la aceptación de un viaje, es fundamental utilizar referencias de control para evitar que efectos secundarios o cambios de estado cierren la pantalla de forma prematura antes de completar la navegación al trayecto en curso

### Entrada #B-18
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Diseñar e implementar la pantalla de seguimiento del viaje en curso, gestionando de forma dinámica la ruta hacia el punto de recogida, el estado con el pasajero a bordo hacia el destino, y las acciones de finalización o cancelación
Prompt: Necesito que me guies para crear la pantalla donde se lleva a cabo el viaje, mostrando la ruta interactiva en el mapa, calculando el tiempo estimado de llegada, permitiendo cambiar al estado de pasajero a bordo, integrar un selector de propinas, abrir aplicaciones externas de navegación y finalizar o cancelar el servicio de forma segura
Qué se usó / modificó / descartó: Se utilizó una vista de mapa integrada combinada con un panel flotante inferior. Se implementó una lógica de simplificación de coordenadas para optimizar el guardado de la ruta al finalizar el trayecto, y se condicionaron las acciones según el estado activo del viaje. No se descartó ningún elemento previo
Archivos y commit: src/screens/trip/TripInProgressScreen.js hash: 11b45184c99824e9caef8dc897c8cf65732b8da6
Verificación: Realizar un viaje completo de prueba en el emulador comprobando la transición de la ruta hacia la recogida y su posterior cambio hacia el destino al pulsar "Pasajero a bordo", revisando la correcta persistencia de los estados
Aprendizaje: Comprendí que estructurar pantallas de procesos largos requiere una sincronización precisa entre el estado actual del viaje y los componentes visuales mostrados como el objetivo del mapa y los botones de acción, garantizando una experiencia fluida para el conductor

### Entrada #B-19
Fecha: 2026-11-05
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Diseñar e implementar la pantalla de resumen y cobro de la tarifa del viaje, desglosando ganancias netas, comisiones, propinas y el estado del pago mediante integración con Mercado Pago o efectivo
Prompt: Necesito que me guies para crear la pantalla donde el conductor visualiza el desglose financiero del viaje (tarifa, comisión y propinas), muestra el estado del pago con insignias dinámicas, y permite cobrar mediante pasarela de pagos con modal de verificación o registrar el cobro en efectivo
Qué se usó / modificó / descartó: Se utilizó una estructura de contenedor con scroll, combinando tarjetas informativas, componentes personalizados como CheckoutModal y PaymentStatusPill, y llamadas a servicios de pasarela de pago y registro de efectivo. No se descartó ningún elemento previo
Archivos y commit: src/screens/trip/PaymentSummaryScreen.js hash: ad0cc40e5388d3ab93fa242db104cfbba17029bd
Verificación: Realizar pruebas cobrando en efectivo para verificar el estado de pago en efectivo, y realizar cobros mediante la pasarela de Mercado Pago comprobando la actualización a estado aprobado
Aprendizaje: Comprendí la importancia de sincronizar los estados de pago en tiempo real desde la base de datos para ofrecer una retroalimentación clara al conductor y asegurar un cierre de ciclo sin fricciones en la aplicación

### Entrada #B-4
Fecha: 2026-11-12
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Desarrollar el servicio de direcciones y cálculo de distancias con respaldo sin conexión
Prompt: Necesito obtener y dibujar rutas entre dos puntos en React Native utilizando un servicio gratuito como OSRM. Me puedes orientar sobre cómo consultar la ruta, guardar los resultados en caché para evitar solicitudes repetidas y mostrar una línea recta como alternativa cuando no haya conexión o falle el servicio?
Qué se usó / modificó / descartó: Claude me orientó sobre cómo realizar las consultas de rutas con la API pública de OSRM y cómo implementar un caché en memoria para evitar solicitudes innecesarias. Se tomó como referencia la lógica para transformar las coordenadas y dibujar el recorrido. Además, se ajustó el almacenamiento en caché para limitarlo a 50 elementos, se mantuvo el cálculo de distancia en kilómetros con dos decimales incluyendo fórmula Haversine para el respaldo y se mejoró el manejo de errores de red mediante. Se descartó el bloque de error vacío
Archivos y commit: src/services/directionsService.js hash: 6213d37c44cab1f185202e69400b4e83539014e2
Verificación: Solicitar una ruta conocida para validar distancia y tiempo; desconectar la red o alterar temporalmente la URL base para comprobar que se devuelve la línea recta de respaldo
Aprendizaje: Aprendí que se debe solicitar la ruta únicamente por tramo y no por cada movimiento del vehículo, reduciendo drásticamente las consultas innecesarias para evitar saturar el servidor público y mejorar el rendimiento de la app

### Entrada #B-20
Fecha: 2026-11-12
Integrante: Juan Diego
Herramienta: Claude
Objetivo: Crear el archivo de pruebas para la generación automática de solicitudes de viaje utilizando ubicaciones de Medellín y el servicio de rutas
Prompt: Necesito que me ayudes de tal manera que me guies para crear un archivo de pruebas que incluya una lista de puntos de referencia en Medellín, una función para seleccionar origen y destino diferentes al azar, y la función createDemoRequest para registrar viajes en Firestore consumiendo el servicio de rutas
Qué se usó / modificó / descartó: Se creó el archivo de pruebas estructurado con el arreglo MEDELLIN_PLACES con coordenadas reales de puntos clave como Parque Lleras, Estadio, etc. La función auxiliar pickTwoDifferent para garantizar que el origen y destino no se repitan, y la implementación de createDemoRequest utilizando getRoute y Firebase Firestore (addDoc) con el estado inicial del viaje
Archivos y commit: src/services/demoService.js hash: 
Verificación: Ejecutar la función de prueba para validar que los puntos se seleccionan aleatoriamente, calcula la ruta correctamente y se inserta el documento en la base de datos sin errores
Aprendizaje: Aprendí a estructurar scripts de pruebas locales aislados para simular dinámicamente flujos de viaje completos con coordenadas del entorno real