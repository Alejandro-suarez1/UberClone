import { PRICING } from '../config/pricing';
import { parseISODate, toISODate } from './format';

const E = {
  required: 'errors.required',
  nameLetters: 'errors.nameLetters',
  nameMax: 'errors.nameMax',
  documentFormat: 'errors.documentFormat',
  phoneFormat: 'errors.phoneFormat',
  underage: 'errors.underage',
  dateInvalid: 'errors.dateInvalid',
  emailFormat: 'errors.emailFormat',
  plateFormat: 'errors.plateFormat',
  max30: 'errors.max30',
  yearFormat: 'errors.yearFormat',
  yearFuture: 'errors.yearFuture',
  seatsNumber: 'errors.seatsNumber',
  seatsMin: 'errors.seatsMin',
  expired: 'errors.expired',
  imageRequired: 'errors.imageRequired',
  termsRequired: 'errors.termsRequired',
  licenseFormat: 'errors.licenseFormat',
};

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

export const normalizePlate = (v) => String(v || '').toUpperCase().replace(/[\s-]/g, '');
export const onlyDigits = (v) => String(v || '').replace(/\D/g, '');

export const required = (v) => (isBlank(v) ? E.required : null);

export function fullName(v) {
  if (isBlank(v)) return E.required;
  const name = String(v).trim();
  if (name.length > 50) return E.nameMax;
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(name)) return E.nameLetters;
  return null;
}

export function documentId(v) {
  if (isBlank(v)) return E.required;
  return /^\d{6,10}$/.test(String(v)) ? null : E.documentFormat;
}

export function phone(v) {
  if (isBlank(v)) return E.required;
  return /^\d{10}$/.test(String(v)) ? null : E.phoneFormat;
}

export function email(v) {
  if (isBlank(v)) return E.required;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) ? null : E.emailFormat;
}

export function birthDate(v, now = new Date()) {
  if (isBlank(v)) return E.required;
  const date = parseISODate(v);
  if (!date) return E.dateInvalid;
  const adultSince = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return date <= adultSince ? null : E.underage;
}

export function plate(v) {
  if (isBlank(v)) return E.required;
  return /^[A-Z]{3}\d{3}$/.test(normalizePlate(v)) ? null : E.plateFormat;
}

export function shortText(v) {
  if (isBlank(v)) return E.required;
  return String(v).trim().length <= 30 ? null : E.max30;
}

export function vehicleYear(v, now = new Date()) {
  if (isBlank(v)) return E.required;
  if (!/^\d{4}$/.test(String(v))) return E.yearFormat;
  return Number(v) <= now.getFullYear() ? null : E.yearFuture;
}

export function seats(v, category) {
  if (isBlank(v)) return E.required;
  if (!/^\d{1,2}$/.test(String(v)) || Number(v) < 1) return E.seatsNumber;
  const min = PRICING.minSeats[category] || 1;
  return Number(v) >= min ? null : E.seatsMin;
}

export function licenseNumber(v) {
  if (isBlank(v)) return E.required;
  return /^[A-Za-z0-9]{5,15}$/.test(String(v).trim()) ? null : E.licenseFormat;
}

export function expiryDate(v, now = new Date()) {
  if (isBlank(v)) return E.required;
  const date = parseISODate(v);
  if (!date) return E.dateInvalid;
  const today = parseISODate(toISODate(now));
  return date > today ? null : E.expired;
}

export function image(uri) {
  return isBlank(uri) ? E.imageRequired : null;
}

export function terms(accepted) {
  return accepted === true ? null : E.termsRequired;
}

export function requiresTechnicalReview(year, now = new Date()) {
  const y = Number(year);
  if (!y) return false;
  return now.getFullYear() - y >= PRICING.technicalReviewFromAge;
}

const compact = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v));

export function validatePersonal(p, now = new Date()) {
  return compact({
    photoUri: image(p.photoUri),
    fullName: fullName(p.fullName),
    documentId: documentId(p.documentId),
    phone: phone(p.phone),
    birthDate: birthDate(p.birthDate, now),
    gender: required(p.gender),
    email: email(p.email),
    language: required(p.language),
  });
}

export function validateVehicle(v, now = new Date()) {
  return compact({
    category: required(v.category),
    plate: plate(v.plate),
    brand: shortText(v.brand),
    model: shortText(v.model),
    year: vehicleYear(v.year, now),
    color: required(v.color),
    seats: seats(v.seats, v.category),
    photoUri: image(v.photoUri),
  });
}

export function validateDocuments(d, vehicleYearValue, now = new Date()) {
  const needsTech = requiresTechnicalReview(vehicleYearValue, now);
  return compact({
    licenseNumber: licenseNumber(d.licenseNumber),
    licensePhotoUri: image(d.licensePhotoUri),
    licenseExpiry: expiryDate(d.licenseExpiry, now),
    soatPhotoUri: image(d.soatPhotoUri),
    soatExpiry: expiryDate(d.soatExpiry, now),
    techPhotoUri: needsTech ? image(d.techPhotoUri) : null,
    techExpiry: needsTech ? expiryDate(d.techExpiry, now) : null,
    mpEmail: email(d.mpEmail),
    terms: terms(d.terms),
  });
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;
