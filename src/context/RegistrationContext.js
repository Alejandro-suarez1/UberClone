// AI-assisted: see docs/AI_LOG.md #A-31
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useI18n } from './I18nContext';
import { useDriverSession } from './DriverSessionContext';
import { createDriver, uploadImage } from '../services/driverService';
import { COMMISSION_RATE } from '../config/pricing';
import {
  hasErrors,
  normalizePlate,
  onlyDigits,
  requiresTechnicalReview,
  validateDocuments,
  validatePersonal,
  validateVehicle,
} from '../utils/validators';

const RegistrationContext = createContext(null);

const TABS = ['personal', 'vehicle', 'documents'];

// Limpieza de lo que escribe el usuario, campo por campo
const SANITIZERS = {
  documentId: onlyDigits,
  phone: onlyDigits,
  year: onlyDigits,
  seats: onlyDigits,
  plate: normalizePlate, 
};

export function RegistrationProvider({ children }) {
  const { lang } = useI18n();
  const { signIn } = useDriverSession();

  const [values, setValues] = useState(() => ({
    personal: {
      photoUri: '',
      fullName: '',
      documentId: '',
      phone: '',
      birthDate: '',
      gender: '',
      email: '',
      language: lang,
    },
    vehicle: { category: '', plate: '', brand: '', model: '', year: '', color: '', seats: '', photoUri: '' },
    documents: {
      licenseNumber: '',
      licensePhotoUri: '',
      licenseExpiry: '',
      soatPhotoUri: '',
      soatExpiry: '',
      techPhotoUri: '',
      techExpiry: '',
      mpEmail: '',
      terms: false,
    },
  }));
  const [touched, setTouched] = useState({ personal: {}, vehicle: {}, documents: {} });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null); // clave de traducción

  const setField = useCallback((tab, field, value) => {
    const clean = SANITIZERS[field] ? SANITIZERS[field](value) : value;
    setValues((prev) => ({ ...prev, [tab]: { ...prev[tab], [field]: clean } }));
    setSubmitError(null);
  }, []);

  const touch = useCallback((tab, field) => {
    setTouched((prev) => (prev[tab][field] ? prev : { ...prev, [tab]: { ...prev[tab], [field]: true } }));
  }, []);

  // Errores reales de cada pestaña (siempre calculados)
  const errors = useMemo(
    () => ({
      personal: validatePersonal(values.personal),
      vehicle: validateVehicle(values.vehicle),
      documents: validateDocuments(values.documents, values.vehicle.year),
    }),
    [values],
  );

  /** Clave de error para mostrar debajo del campo (solo si ya lo tocó) */
  const fieldError = useCallback(
    (tab, field) => (touched[tab][field] ? errors[tab][field] || null : null),
    [touched, errors],
  );

  const tabErrorCount = useMemo(
    () => Object.fromEntries(TABS.map((tab) => [tab, Object.keys(errors[tab]).length])),
    [errors],
  );

  const isFormValid = TABS.every((tab) => !hasErrors(errors[tab]));
  const needsTechnicalReview = requiresTechnicalReview(values.vehicle.year);

  const submit = useCallback(async () => {
    if (!isFormValid) {
      // muestra todos los errores pendientes
      setTouched({
        personal: Object.fromEntries(Object.keys(errors.personal).map((k) => [k, true])),
        vehicle: Object.fromEntries(Object.keys(errors.vehicle).map((k) => [k, true])),
        documents: Object.fromEntries(Object.keys(errors.documents).map((k) => [k, true])),
      });
      return false;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { personal: p, vehicle: v, documents: d } = values;
      const withTech = requiresTechnicalReview(v.year);

      const [photoUrl, vehiclePhotoUrl, licensePhotoUrl, soatPhotoUrl, techPhotoUrl] = await Promise.all([
        uploadImage(p.photoUri),
        uploadImage(v.photoUri),
        uploadImage(d.licensePhotoUri),
        uploadImage(d.soatPhotoUri),
        withTech ? uploadImage(d.techPhotoUri) : Promise.resolve(null),
      ]);

      const documents = {
        licenseNumber: d.licenseNumber.trim().toUpperCase(),
        licensePhotoUrl,
        licenseExpiry: d.licenseExpiry,
        soatPhotoUrl,
        soatExpiry: d.soatExpiry,
        mpEmail: d.mpEmail.trim().toLowerCase(),
        termsAcceptedAt: Date.now(),
        acceptedCommissionRate: COMMISSION_RATE,
      };
      if (withTech) {
        documents.techPhotoUrl = techPhotoUrl;
        documents.techExpiry = d.techExpiry;
      }

      const id = await createDriver({
        personal: {
          photoUrl,
          fullName: p.fullName.trim(),
          documentId: p.documentId,
          phone: p.phone,
          birthDate: p.birthDate,
          gender: p.gender,
          email: p.email.trim().toLowerCase(),
          language: p.language,
        },
        vehicle: {
          category: v.category,
          plate: normalizePlate(v.plate),
          brand: v.brand.trim(),
          model: v.model.trim(),
          year: Number(v.year),
          color: v.color,
          seats: Number(v.seats),
          photoUrl: vehiclePhotoUrl,
        },
        documents,
      });
      await signIn(id); 
      return true;
    } catch (e) {
      setSubmitError(e?.message === 'EMAIL_EXISTS' ? 'errors.emailExists' : 'errors.submitFailed');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [errors, isFormValid, signIn, values]);

  const value = useMemo(
    () => ({
      values,
      setField,
      touch,
      fieldError,
      tabErrorCount,
      isFormValid,
      needsTechnicalReview,
      submitting,
      submitError,
      submit,
    }),
    [values, setField, touch, fieldError, tabErrorCount, isFormValid, needsTechnicalReview, submitting, submitError, submit],
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration debe usarse dentro de <RegistrationProvider>');
  return ctx;
}
