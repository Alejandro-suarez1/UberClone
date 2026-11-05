// AI-assisted: see docs/AI_LOG.md #A-0
/**
 * Nombres de rutas de navegación (contrato compartido).
 * A define la navegación; B navega usando estos nombres.
 */
export const ROUTES = Object.freeze({
  // Autenticación (A)
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  REG_PERSONAL: 'RegPersonal',
  REG_VEHICLE: 'RegVehicle',
  REG_DOCUMENTS: 'RegDocuments',

  // App principal
  MAIN: 'Main', // Drawer (A)
  HOME: 'Home', // (B)
  EARNINGS: 'Earnings', // (A)
  HISTORY: 'History', // (A)
  PROFILE: 'Profile', // (A)
  SETTINGS: 'Settings', // (A)

  // Flujo del viaje, Stack (B)
  INCOMING_REQUEST: 'IncomingRequest',
  TRIP_IN_PROGRESS: 'TripInProgress',
  PAYMENT_SUMMARY: 'PaymentSummary',

  // Detalle de un viaje del historial (A)
  TRIP_DETAIL: 'TripDetail',
});
