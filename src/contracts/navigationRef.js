// AI-assisted: see docs/AI_LOG.md #A-0
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { ROUTES } from './routes';

/**
 * Referencia global de navegación (contrato compartido).
 * A la conecta en <NavigationContainer ref={navigationRef}>.
 * B la usa desde ActiveTripContext, que vive fuera de las pantallas.
 */
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/** Vuelve al Inicio del conductor cerrando todo el flujo del viaje. */
export function resetToHome() {
  if (!navigationRef.isReady()) return;
  try {
    navigationRef.dispatch(StackActions.popToTop());
  } catch (e) {
    // si ya estamos en la raíz no pasa nada
  }
  navigationRef.navigate(ROUTES.MAIN, { screen: ROUTES.HOME });
}
