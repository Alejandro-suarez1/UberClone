// AI-assisted: see docs/AI_LOG.md #A-43
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Chips from '../../components/common/Chips';
import DateField from '../../components/common/DateField';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import TripListItem from '../../components/common/TripListItem';
import useTripHistory from '../../hooks/useTripHistory';
import { useI18n } from '../../context/I18nContext';
import { ROUTES } from '../../contracts/routes';
import { parseISODate } from '../../utils/format';
import { getRange } from '../../utils/dateRanges';
import { colors } from '../../theme/colors';
import { layout, spacing } from '../../theme/spacing';

export default function HistoryScreen({ navigation }) {
  const { t } = useI18n();
  const [period, setPeriod] = useState('month');
  const [method, setMethod] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { since, until } = useMemo(
    () => getRange(period, parseISODate(from), parseISODate(to)),
    [period, from, to],
  );

  const { trips, loading, loadingMore, error, loadMore, refresh } = useTripHistory({
    since,
    until,
    paymentMethod: method === 'all' ? undefined : method,
  });

  const periods = [
    { value: 'today', label: t('common.today') },
    { value: 'week', label: t('common.week') },
    { value: 'month', label: t('common.month') },
    { value: 'range', label: t('common.range') },
  ];
  const methods = [
    { value: 'all', label: t('common.all') },
    { value: 'mercadopago', label: t('status.method.mercadopago') },
    { value: 'stripe', label: t('status.method.stripe') },
    { value: 'cash', label: t('status.method.cash') },
  ];

  const header = (
    <View style={styles.filters}>
      <Chips options={periods} value={period} onChange={setPeriod} />
      {period === 'range' ? (
        <View style={styles.dates}>
          <DateField
            style={styles.dateField}
            label={t('common.from')}
            placeholder={t('placeholders.date')}
            doneLabel={t('common.done')}
            value={from}
            maximumDate={new Date()}
            onChange={setFrom}
          />
          <DateField
            style={styles.dateField}
            label={t('common.to')}
            placeholder={t('placeholders.date')}
            doneLabel={t('common.done')}
            value={to}
            maximumDate={new Date()}
            onChange={setTo}
          />
        </View>
      ) : null}
      <Chips options={methods} value={method} onChange={setMethod} />
    </View>
  );

  return (
    <ScreenContainer padded={false} edges={[]}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <TripListItem
            trip={item}
            categoryLabel={t(`status.category.${item.category}`)}
            paymentLabel={t(`status.payment.${item.paymentStatus || 'pending'}`)}
            netLabel={t('history.net')}
            onPress={() => navigation.navigate(ROUTES.TRIP_DETAIL, { trip: item })}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : error ? (
            <View>
              <EmptyState icon="cloud-offline-outline" title={t('errors.generic')} />
              <Button title={t('common.retry')} variant="secondary" onPress={refresh} />
            </View>
          ) : (
            <EmptyState icon="time-outline" title={t('history.empty')} subtitle={t('history.emptyHint')} />
          )
        }
        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={loading && trips.length > 0} onRefresh={refresh} tintColor={colors.primary} />
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  filters: {
    marginBottom: spacing.md,
  },
  dates: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  dateField: {
    flex: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  loader: {
    marginVertical: spacing.xl,
  },
});
