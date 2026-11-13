import React from 'react';
import Badge, { paymentTone } from '../common/Badge';
import { useI18n } from '../../context/I18nContext';

export default function PaymentStatusPill({ status, style }) {
  const { t } = useI18n();
  const safe = status || 'pending';
  return <Badge label={t(`status.payment.${safe}`)} tone={paymentTone(safe)} style={style} />;
}