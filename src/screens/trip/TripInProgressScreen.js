// AI-assisted: see docs/AI_LOG.md #B-18
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import RouteMap from '../../components/trip/RouteMap';
import TipSelector from '../../components/trip/TipSelector';
import { useI18n } from '../../context/I18nContext';
import { useActiveTrip } from '../../context/ActiveTripContext';
import useDriverLocation from '../../hooks/useDriverLocation';
import { getRoute, navigationUrl } from '../../services/directionsService';
import { ROUTES } from '../../contracts/routes';
import { TRIP_STATUS } from '../../contracts/types';
import { formatKm, placeLabel } from '../../utils/format';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';

const MAX_SAVED_POINTS = 120;

function simplify(coordinates) {
  if (coordinates.length <= MAX_SAVED_POINTS) return coordinates.map((c) => ({ lat: c.latitude, lng: c.longitude }));
  const step = Math.ceil(coordinates.length / MAX_SAVED_POINTS);
  const picked = coordinates.filter((_, i) => i % step === 0);
  const last = coordinates[coordinates.length - 1];
  picked.push(last);
  return picked.map((c) => ({ lat: c.latitude, lng: c.longitude }));
}

export default function TripInProgressScreen({ navigation }) {
  const { t } = useI18n();
  const { trip, setStatus, completeTrip, cancelTrip } = useActiveTrip();
  const { location } = useDriverLocation({ enabled: true });

  const [route, setRoute] = useState(null);
  const [tip, setTip] = useState(0);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState(null);

  const onBoard = trip?.status === TRIP_STATUS.IN_PROGRESS;
  const leg = onBoard ? 'toDestination' : 'toPickup';
  const target = trip ? (onBoard ? trip.destination : trip.origin) : null;

  const locationRef = useRef(null);
  locationRef.current = location;
  const hasLocation = Boolean(location);

  useEffect(() => {
    if (!trip) return undefined;
    let active = true;
    const from = onBoard ? trip.origin : locationRef.current;
    if (!from) return undefined;
    setRoute(null);
    getRoute(from, onBoard ? trip.destination : trip.origin).then((result) => {
      if (active) setRoute(result);
    });
    return () => {
      active = false;
    };
  }, [trip?.id, leg, hasLocation]);

  if (!trip) return <View style={styles.root} />;

  const run = async (action) => {
    setBusy(true);
    setErrorKey(null);
    try {
      await action();
    } catch (e) {
      setErrorKey('trip.errorUpdate');
    } finally {
      setBusy(false);
    }
  };

  const passengerOnBoard = () => run(() => setStatus(TRIP_STATUS.IN_PROGRESS, { startedAt: Date.now() }));

  const finish = () =>
    run(async () => {
      const saved = route && !route.approximate && leg === 'toDestination' ? simplify(route.coordinates) : undefined;
      await completeTrip({ tip, route: saved });
      navigation.replace(ROUTES.PAYMENT_SUMMARY);
    });

  const confirmCancel = () => {
    Alert.alert(t('trip.cancelTitle'), t('trip.cancelMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('trip.cancelTrip'), style: 'destructive', onPress: () => run(cancelTrip) },
    ]);
  };

  return (
    <View style={styles.root}>
      <RouteMap
        coordinates={route?.coordinates}
        driver={location}
        target={target}
        targetColor={onBoard ? colors.danger : colors.success}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottom} pointerEvents="box-none">
        <Card variant="glow">
          <View style={styles.titleRow}>
            <Badge label={t(`status.trip.${onBoard ? 'in_progress' : 'driver_arriving'}`)} tone="brand" />
            {route?.durationMin ? (
              <Text style={styles.eta}>
                {t('trip.eta', { minutes: route.durationMin, km: formatKm(route.distanceKm) })}
              </Text>
            ) : null}
          </View>

          <Text style={styles.heading}>{onBoard ? t('trip.headingToDestination') : t('trip.headingToPickup')}</Text>
          <View style={styles.placeRow}>
            <Ionicons name="location" size={18} color={onBoard ? colors.danger : colors.success} />
            <Text style={styles.place} numberOfLines={2}>
              {placeLabel(target)}
            </Text>
          </View>
          {route?.approximate ? <Text style={styles.approx}>{t('trip.routeApproximate')}</Text> : null}

          {onBoard ? <TipSelector value={tip} onChange={setTip} /> : null}
          {errorKey ? <Text style={styles.error}>{t(errorKey)}</Text> : null}

          <View style={styles.actions}>
            <Button
              size="sm"
              variant="secondary"
              icon="navigate"
              title={t('trip.openMaps')}
              onPress={() => Linking.openURL(navigationUrl(target))}
            />
          </View>

          {onBoard ? (
            <Button title={t('trip.finishTrip')} icon="flag" onPress={finish} loading={busy} style={styles.main} />
          ) : (
            <>
              <Button title={t('trip.passengerOnBoard')} icon="person" onPress={passengerOnBoard} loading={busy} style={styles.main} />
              <Button
                title={t('trip.cancelTrip')}
                variant="ghost"
                onPress={confirmCancel}
                disabled={busy}
                style={styles.cancel}
              />
            </>
          )}
        </Card>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  eta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  heading: {
    ...typography.heading,
    color: colors.text,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  place: {
    ...typography.body,
    color: colors.textMuted,
    marginLeft: spacing.sm,
    flex: 1,
  },
  approx: {
    ...typography.caption,
    color: colors.warning,
    marginTop: spacing.sm,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  main: {
    marginTop: spacing.md,
  },
  cancel: {
    marginTop: spacing.xs,
  },
});