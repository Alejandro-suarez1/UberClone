# Rumbo · UberClone (versión conductor)

App móvil multiplataforma (iOS y Android) hecha con **React Native + Expo (JavaScript)**.
El conductor se registra, se pone disponible, recibe solicitudes en tiempo real, lleva el viaje,
cobra con Mercado Pago (modo de prueba) o en efectivo y consulta sus ganancias netas.

## Funciones

- Registro en 3 pestañas (personal, vehículo, documentos) con validaciones debajo de cada campo.
- Cuenta en estado **Pendiente de aprobación** hasta que se cambia `approval` a `approved` en Firestore.
- Disponible / No disponible con ubicación en tiempo real (se detiene al apagarlo o al salir de la pantalla).
- Solicitud entrante con cuenta regresiva de 15 s (si llega a 0 se rechaza sola).
- Viaje en curso con ruta (Google Directions): hacia la recogida y luego hacia el destino.
- Cobro con Mercado Pago Checkout Pro (backend propio) o efectivo.
- Tarifa, comisión (20 %) y ganancia neta con una sola función pura: `src/utils/calculateFare.js`.
- Ganancias (hoy, semana, mes y saldo) e historial con filtros y paginación.
- Español / inglés.

## Requisitos

- Node 18 o superior y la app **Expo Go** en el celular.
- Un proyecto de Firebase con **Firestore** (modo de prueba).
- Una cuenta de Cloudinary con un *upload preset* sin firma (opcional: sin ella se guarda la ruta local de las fotos).
- Llave de Google Maps con **Directions API** activada (opcional: sin ella la ruta es una línea recta).
- Cuentas de prueba de Mercado Pago para el cobro (ver `backend/README.md`).

## Instalación

```bash
npm install
cp .env.example .env     
npx expo start
```

### Variables de entorno (`.env.example`)

| Variable | Para qué sirve |
|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` / `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Conexión a Firestore |
| `EXPO_PUBLIC_GOOGLE_MAPS_KEY` | Google Directions API |
| `EXPO_PUBLIC_CLOUDINARY_CLOUD` / `EXPO_PUBLIC_CLOUDINARY_PRESET` | Subida de fotos |
| `EXPO_PUBLIC_BACKEND_URL` | Backend de pagos, con la IP local, por ejemplo `http://192.168.1.20:3000` |
| `EXPO_PUBLIC_USE_MOCKS` | `true` usa viajes de ejemplo en Historial y Ganancias |

El `.env` nunca se sube a Git.

### Firestore

1. Crea la base de datos en modo de prueba.
2. La primera vez que abras el **Historial**, la consola mostrará un enlace para crear el índice
   `trips (driverId asc, createdAt desc)`. Ábrelo y crea el índice con un clic.
3. Para aprobar a un conductor: en la colección `drivers`, cambia `approval` de `pending` a `approved`.

### Backend de pagos

Ver [`backend/README.md`](backend/README.md).

## Cómo probar sin la app del pasajero

Con la cuenta aprobada y estando **Disponible**, en modo desarrollo aparecen en Inicio los botones
**Simular solicitud** (Mercado Pago o efectivo). Crean una solicitud como si la enviara un pasajero.

## Trabajo en equipo

| Integrante | Rama | Responsabilidad |
|---|---|---|
| A | `develop-A` | Tema, configuración, utilidades, registro, ganancias, historial, perfil, navegación |
| B | `develop-B` | Servicios de datos, ubicación, solicitudes, viaje en curso, cobro y backend |

Cada archivo tiene un solo dueño para evitar conflictos. Los cambios llegan a `main` por Pull Request revisado por el otro integrante.

## Uso de IA

Se usó Claude como apoyo para diseñar la arquitectura y escribir código. Todo el uso está
registrado en [`docs/AI_LOG.md`](docs/AI_LOG.md) (y exportado a PDF para la entrega).
Los archivos asistidos llevan un comentario `// AI-assisted: see docs/AI_LOG.md #<entrada>`.
