import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Badge, { paymentTone } from './Badge';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { formatCOP, formatDateTime, placeLabel } from '../../utils/format';

export default function TripListItem({ trip, categoryLabel, paymentLabel, netLabel, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Card>
        <View style={styles.top}>
          <Text style={styles.date}>{formatDateTime(trip.createdAt)}</Text>
          <Badge label={paymentLabel} tone={paymentTone(trip.paymentStatus)} />
        </View>

        <View style={styles.route}>
          <Text style={styles.place} numberOfLines={1}>
            {placeLabel(trip.origin)}
          </Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} style={styles.arrow} />
          <Text style={styles.place} numberOfLines={1}>
            {placeLabel(trip.destination)}
          </Text>
        </View>

        <View style={styles.bottom}>
          <View>
            <Text style={styles.category}>{categoryLabel}</Text>
            <Text style={styles.fare}>{formatCOP(trip.fare)}</Text>
          </View>
          <View style={styles.netBox}>
            <Text style={styles.netLabel}>{netLabel}</Text>
            <Text style={styles.net}>{formatCOP(trip.driverEarnings)}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: spacing.md,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  place: {
    ...typography.subtitle,
    color: colors.text,
    flex: 1,
  },
  arrow: {
    marginHorizontal: spacing.sm,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  category: {
    ...typography.label,
    color: colors.textMuted,
  },
  fare: {
    ...typography.heading,
    color: colors.text,
    marginTop: 2,
  },
  netBox: {
    alignItems: 'flex-end',
  },
  netLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  net: {
    ...typography.heading,
    color: colors.primary,
    marginTop: 2,
  },
});
