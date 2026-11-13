import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chips from '../common/Chips';
import { useI18n } from '../../context/I18nContext';
import { formatCOP } from '../../utils/format';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const TIP_OPTIONS = [0, 1000, 2000, 5000, 10000];

export default function TipSelector({ value, onChange }) {
  const { t } = useI18n();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('trip.tipTitle')}</Text>
      <Chips
        options={TIP_OPTIONS.map((amount) => ({ value: amount, label: amount === 0 ? '$0' : formatCOP(amount) }))}
        value={value}
        onChange={onChange}
      />
      <Text style={styles.hint}>{t('trip.tipHint')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.md,
  },
  title: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});