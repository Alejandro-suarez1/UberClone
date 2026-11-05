// AI-assisted: see docs/AI_LOG.md #B-11
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import { useI18n } from '../../context/I18nContext';
import { calculateFare } from '../../utils/calculateFare';
import { formatCOP, formatKm, placeLabel } from '../../utils/format';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

function Stat({ icon, label, value }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={16} color={colors.textMuted} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export default function TripRequestCard({ trip }) {
  const { t } = useI18n();

  const { fare, driverEarnings } = useMemo(() => calculateFare({
    distanceKm: trip?.distanceKm,
    durationMin: trip?.durationMin,
    category: trip?.category,
  }), [trip?.distanceKm, trip?.durationMin, trip?.category]);

  return (
    <Card variant="glow">
      <View style={styles.place}>
        <Ionicons name="radio-button-on" size={18} color={colors.success} />
        <View style={styles.placeText}>
          <Text style={styles.placeLabel}>{t('trip.origin')}</Text>
          <Text style={styles.placeName} numberOfLines={2}>
            {placeLabel(trip?.origin)}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.place}>
        <Ionicons name="location" size={18} color={colors.danger} />
        <View style={styles.placeText}>
          <Text style={styles.placeLabel}>{t('trip.destination')}</Text>
          <Text style={styles.placeName} numberOfLines={2}>
            {placeLabel(trip?.destination)}
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat icon="speedometer-outline" label={t('trip.distance')} value={formatKm(trip?.distanceKm)} />
        <Stat icon="time-outline" label={t('trip.duration')} value={`${trip?.durationMin} min`} />
      </View>
      <View style={styles.stats}>
        <Stat icon="car-sport-outline" label={t('trip.category')} value={t(`status.category.${trip?.category}`)} />
        <Stat icon="card-outline" label={t('trip.paymentMethod')} value={t(`status.method.${trip?.paymentMethod}`)} />
      </View>

      <View style={styles.money}>
        <View>
          <Text style={styles.moneyLabel}>{t('trip.estimatedFare')}</Text>
          <Text style={styles.fare}>{formatCOP(fare)}</Text>
        </View>
        <View style={styles.netBox}>
          <Text style={styles.moneyLabel}>{t('trip.estimatedNet')}</Text>
          <Text style={styles.net}>{formatCOP(driverEarnings)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  place: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  placeText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  placeLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  placeName: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: 2,
  },
  line: {
    width: 2,
    height: 16,
    backgroundColor: colors.border,
    marginLeft: 8,
    marginVertical: 4,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
  },
  statLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statValue: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: 2,
  },
  money: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  moneyLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  fare: {
    ...typography.money,
    fontSize: 26,
    color: colors.text,
    marginTop: 2,
  },
  netBox: {
    alignItems: 'flex-end',
  },
  net: {
    ...typography.money,
    fontSize: 26,
    color: colors.primary,
    marginTop: 2,
  },
});