import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function StatCard({ label, value, icon, accent = colors.primary, style }) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        {icon ? <Ionicons name={icon} size={16} color={accent} style={styles.icon} /> : null}
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={[styles.value, { color: accent }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    marginRight: spacing.xs + 2,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    flexShrink: 1,
  },
  value: {
    ...typography.money,
    fontSize: 24,
    lineHeight: 30,
  },
});
