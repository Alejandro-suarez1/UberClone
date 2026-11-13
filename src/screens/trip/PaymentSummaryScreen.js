// AI-assisted: see docs/AI_LOG.md #B-19
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CheckoutModal from '../../components/trip/CheckoutModal';
import PaymentStatusPill from '../../components/trip/PaymentStatusPill';
import { useI18n } from '../../context/I18nContext';
import { useActiveTrip } from '../../context/ActiveTripContext';
import { createPayment } from '../../services/paymentService';
import { markCashReceived } from '../../services/tripService';
import { resetToHome } from '../../contracts/navigationRef';
import { PAYMENT_METHOD, PAYMENT_STATUS, TRIP_STATUS } from '../../contracts/types';
import { formatCOP } from '../../utils/format';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

function Row({ label, value, strong, tone }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, strong && styles.rowStrong, tone && { color: tone }]}>{value}</Text>
    </View>
  );
}

export default function PaymentSummaryScreen() {
  const { t } = useI18n();
  const { trip, clearTrip } = useActiveTrip();
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const [errorKey, setErrorKey] = useState(null);

  if (!trip) return <ScreenContainer />;

  const isCash = trip.paymentMethod === PAYMENT_METHOD.CASH;
  const isPaid = trip.status === TRIP_STATUS.PAID;
  const status = isPaid ? (isCash ? PAYMENT_STATUS.CASH : PAYMENT_STATUS.APPROVED) : trip.paymentStatus || PAYMENT_STATUS.PENDING;
  const rejected = status === PAYMENT_STATUS.REJECTED;
  const ratePercent = Math.round((trip.commissionRate || 0) * 100);

  const collectWithGateway = async () => {
    setBusy(true);
    setErrorKey(null);
    try {
      const { checkoutUrl: url } = await createPayment(trip.id, trip.fare + (trip.tip || 0));
      setCheckoutUrl(url);
      setStarted(true);
    } catch (e) {
      setErrorKey('payment.errorCreate');
    } finally {
      setBusy(false);
    }
  };

  const collectCash = async () => {
    setBusy(true);
    setErrorKey(null);
    try {
      await markCashReceived(trip.id);
    } catch (e) {
      setErrorKey('payment.errorCash');
    } finally {
      setBusy(false);
    }
  };

  const backHome = () => {
    clearTrip();
    resetToHome();
  };

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>{t('payment.title')}</Text>

      <Card variant="glow" style={styles.card}>
        <Text style={styles.netLabel}>{t('payment.net')}</Text>
        <Text style={styles.net}>{formatCOP(trip.driverEarnings)}</Text>
      </Card>

      <Card style={styles.card}>
        <Row label={t('payment.fare')} value={formatCOP(trip.fare)} />
        <Row label={t('payment.commission', { rate: ratePercent })} value={`- ${formatCOP(trip.commission)}`} tone={colors.warning} />
        <Row label={t('payment.tip')} value={formatCOP(trip.tip || 0)} />
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{t('payment.status')}</Text>
          <PaymentStatusPill status={status} />
        </View>
      </Card>

      {isPaid ? (
        <Card style={styles.card}>
          <View style={styles.result}>
            <Ionicons name="checkmark-circle" size={28} color={isCash ? colors.info : colors.success} />
            <View style={styles.resultText}>
              <Text style={styles.resultTitle}>{isCash ? t('payment.cashTitle') : t('payment.paidTitle')}</Text>
              <Text style={styles.resultBody}>{isCash ? t('payment.cashText') : t('payment.paidText')}</Text>
            </View>
          </View>
        </Card>
      ) : null}

      {rejected ? <Text style={styles.rejected}>{t('payment.rejectedText')}</Text> : null}
      {errorKey ? <Text style={styles.rejected}>{t(errorKey)}</Text> : null}

      <View style={styles.actions}>
        {isPaid ? (
          <Button title={t('payment.backHome')} icon="home" onPress={backHome} />
        ) : isCash ? (
          <Button title={t('payment.collectCash')} icon="cash" onPress={collectCash} loading={busy} />
        ) : (
          <>
            <Button
              title={rejected ? t('payment.retry') : t('payment.collectMp')}
              icon="card"
              onPress={collectWithGateway}
              loading={busy}
            />
            {started && !rejected ? <Text style={styles.waiting}>{t('payment.waiting')}</Text> : null}
          </>
        )}
      </View>

      <CheckoutModal visible={checkoutUrl !== null} url={checkoutUrl} onClose={() => setCheckoutUrl(null)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  netLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  net: {
    ...typography.hero,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textMuted,
  },
  rowValue: {
    ...typography.subtitle,
    color: colors.text,
  },
  rowStrong: {
    ...typography.heading,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  resultTitle: {
    ...typography.heading,
    fontSize: 17,
    color: colors.text,
  },
  resultBody: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  rejected: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  actions: {
    marginTop: spacing.lg,
  },
  waiting: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});