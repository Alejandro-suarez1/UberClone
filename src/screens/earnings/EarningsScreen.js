// AI-assisted: see docs/AI_LOG.md #A-42
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import Chips from '../../components/common/Chips';
import StatCard from '../../components/common/StatCard';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import useEarnings from '../../hooks/useEarnings';
import useTripHistory from '../../hooks/useTripHistory';
import { useI18n } from '../../context/I18nContext';
import { formatCOP } from '../../utils/format';
import { COMMISSION_RATE } from '../../config/pricing';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function EarningsScreen() {
  const { t } = useI18n();
  const [period, setPeriod] = useState('today');

  // Se traen todos los viajes: el saldo necesita el historial completo
  const { trips, loading, error, refresh } = useTripHistory({ loadAll: true, pageSize: 100 });
  const earnings = useEarnings(trips);
  const stats = earnings[period];

  const periods = [
    { value: 'today', label: t('common.today') },
    { value: 'week', label: t('common.week') },
    { value: 'month', label: t('common.month') },
  ];

  return (
    <ScreenContainer
      scroll
      edges={[]}
      refreshControl={<RefreshControl refreshing={loading && trips.length > 0} onRefresh={refresh} tintColor={colors.primary} />}
    >
      {loading && trips.length === 0 ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : error ? (
        <View>
          <EmptyState icon="cloud-offline-outline" title={t('errors.generic')} />
          <Button title={t('common.retry')} variant="secondary" onPress={refresh} />
        </View>
      ) : (
        <>
          <Card variant="glow" style={styles.balance}>
            <Text style={styles.balanceLabel}>{t('earnings.balance')}</Text>
            <Text style={[styles.balanceValue, earnings.balance < 0 && styles.negative]}>
              {formatCOP(earnings.balance)}
            </Text>
            <Text style={styles.balanceHint}>
              {t('earnings.balanceHint', { rate: Math.round(COMMISSION_RATE * 100) })}
            </Text>
          </Card>

          <Chips options={periods} value={period} onChange={setPeriod} style={styles.chips} />

          {stats.count === 0 ? (
            <EmptyState icon="stats-chart-outline" title={t('earnings.empty')} subtitle={t('earnings.emptyHint')} />
          ) : (
            <>
              <View style={styles.row}>
                <StatCard label={t('earnings.trips')} value={String(stats.count)} icon="car-outline" accent={colors.text} />
                <View style={styles.gap} />
                <StatCard label={t('earnings.average')} value={formatCOP(stats.average)} icon="analytics-outline" accent={colors.info} />
              </View>
              <View style={styles.row}>
                <StatCard label={t('earnings.billed')} value={formatCOP(stats.billed)} icon="receipt-outline" accent={colors.text} />
                <View style={styles.gap} />
                <StatCard label={t('earnings.commissions')} value={formatCOP(stats.commissions)} icon="pie-chart-outline" accent={colors.warning} />
              </View>
              <View style={styles.row}>
                <StatCard label={t('earnings.tips')} value={formatCOP(stats.tips)} icon="heart-outline" accent={colors.violet} />
                <View style={styles.gap} />
                <StatCard label={t('earnings.net')} value={formatCOP(stats.net)} icon="wallet-outline" accent={colors.primary} />
              </View>
            </>
          )}
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: spacing.huge,
  },
  balance: {
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  balanceValue: {
    ...typography.hero,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  negative: {
    color: colors.danger,
  },
  balanceHint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  chips: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  gap: {
    width: spacing.md,
  },
});
