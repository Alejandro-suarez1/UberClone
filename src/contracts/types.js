// AI-assisted: see docs/AI_LOG.md #A-0
/**
 * CONTRATOS COMPARTIDOS (A y B)
 * ---------------------------------------------------------------
 * Este archivo NO se edita en develop-A ni en develop-B.
 * Si hay que cambiarlo, se hace en una rama aparte con PR a main
 * revisado por los dos integrantes.
 */

// ---------- Constantes ----------
export const TRIP_STATUS = Object.freeze({
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  DRIVER_ARRIVING: 'driver_arriving',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
});

export const CATEGORY = Object.freeze({ ECONOMY: 'economy', XL: 'xl', PREMIUM: 'premium' });
export const PAYMENT_METHOD = Object.freeze({ MERCADOPAGO: 'mercadopago', STRIPE: 'stripe', CASH: 'cash' });
export const PAYMENT_STATUS = Object.freeze({ APPROVED: 'approved', PENDING: 'pending', REJECTED: 'rejected', CASH: 'cash' });
export const APPROVAL = Object.freeze({ PENDING: 'pending', APPROVED: 'approved', REJECTED: 'rejected' });

// Nombres de colecciones de Firestore
export const COLLECTIONS = Object.freeze({
  DRIVERS: 'drivers',
  TRIPS: 'trips',
  DRIVER_LOCATIONS: 'driverLocations',
});

// ---------- Tipos ----------
/** @typedef {'requested'|'accepted'|'driver_arriving'|'in_progress'|'completed'|'paid'|'cancelled'|'rejected'} TripStatus */
/** @typedef {'economy'|'xl'|'premium'} Category */
/** @typedef {'mercadopago'|'stripe'|'cash'} PaymentMethod */
/** @typedef {'pending'|'approved'|'rejected'} DriverApproval */
/** @typedef {{lat:number,lng:number,address?:string}} Place */

/**
 * @typedef {Object} Trip
 * @property {string} id
 * @property {string} driverId
 * @property {string} passengerId
 * @property {Place} origin
 * @property {Place} destination
 * @property {Array<{lat:number,lng:number}>} [route]   ruta guardada al completar (la dibuja el historial)
 * @property {number} distanceKm
 * @property {number} durationMin
 * @property {Category} category
 * @property {number} fare            COP enteros
 * @property {number} commission
 * @property {number} tip
 * @property {number} driverEarnings  fare - commission + tip
 * @property {number} commissionRate  ej. 0.20 (se guarda en cada viaje)
 * @property {PaymentMethod} paymentMethod
 * @property {'approved'|'pending'|'rejected'|'cash'} [paymentStatus]
 * @property {string} [paymentId]
 * @property {TripStatus} status
 * @property {number} [rating]        1 a 5
 * @property {number} createdAt       ms epoch
 * @property {number} [completedAt]   ms epoch
 */

/**
 * @typedef {Object} Driver
 * @property {string} id
 * @property {DriverApproval} approval
 * @property {boolean} isAvailable
 * @property {number} commissionRate
 * @property {{photoUrl:string, fullName:string, documentId:string, phone:string, birthDate:string, gender:string, email:string, language:'es'|'en'}} personal
 * @property {{category:Category, plate:string, brand:string, model:string, year:number, color:string, seats:number, photoUrl:string}} vehicle
 * @property {{licenseNumber:string, licensePhotoUrl:string, licenseExpiry:string, soatPhotoUrl:string, soatExpiry:string, techPhotoUrl?:string, techExpiry?:string, mpEmail:string, termsAcceptedAt:number}} documents
 * @property {number} createdAt
 */

/*
 * ======================== FUNCIONES PURAS (dueño: A) ========================
 * calculateFare({ distanceKm, durationMin, category, tip }) => { fare, commission, driverEarnings }
 *
 * ============================ HOOKS ============================
 * useEarnings(trips: Trip[])  (A)
 *    => { today, week, month, balance }
 *       cada periodo: { count, billed, commissions, tips, net, average }
 * useTripHistory(opts)        (A)  usa tripService.getDriverTrips (B)
 * useDriverLocation({ enabled })                       (B) => { location: Place|null, error: string|null }
 * useTripRequests({ driverId, enabled })               (B) => { request: Trip|null, secondsLeft, accept(), reject() }
 *
 * ========================== CONTEXTOS ==========================
 * useDriverSession()  (A) => { driver, driverId, approval, isAvailable, setAvailable(bool) => boolean,
 *                              signIn(driverId), signOut(), ready }
 * useActiveTrip()     (B) => { trip, incoming, startTrip(trip), setStatus(status, extra?),
 *                              completeTrip({ tip, route? }), cancelTrip(), clearTrip() }
 * useI18n()           (A) => { t(key, params?), lang, setLang(lang) }
 *
 * ========================== SERVICIOS ==========================
 * driverService (A): createDriver(data) | getDriver(id) | updateDriver(id, patch) | subscribeToDriver(id, cb)
 *                    findDriverByEmail(email) | uploadImage(uri) => url
 * tripService   (B): subscribeToRequests(driverId, cb) => unsubscribe
 *                    subscribeToTrip(tripId, cb) => unsubscribe
 *                    updateTripStatus(tripId, status, extra?) => Promise<void>
 *                    completeTrip(trip, { tip, route? }) => Promise<Trip>
 *                    markCashReceived(tripId) => Promise<void>
 *                    updateDriverLocation(driverId, Place) => Promise<void>
 *                    getDriverTrips(driverId, { since?, until?, paymentMethod?, cursor?, limit=20 })
 *                        => Promise<{ trips: Trip[], nextCursor: number|null }>
 * paymentService(B): createPayment(tripId, amount) => Promise<{ checkoutUrl, paymentId }>
 *
 * ============================ TEMA (A) =============================
 * theme/colors, theme/typography, theme/spacing, theme/mapStyle  (B puede importarlos, no editarlos)
 * components/common/*  (A)  (B puede importarlos, no editarlos)
 *
 * ========================= TRADUCCIONES ============================
 * i18n/es.js y i18n/en.js          (A)  namespaces: common, nav, status, fields, placeholders,
 *                                       errors, auth, earnings, history, profile, settings
 * i18n/trip.es.js y i18n/trip.en.js (B)  namespaces: home, trip, payment
 */
