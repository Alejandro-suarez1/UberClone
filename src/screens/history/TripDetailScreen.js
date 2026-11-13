// AI-assisted: see docs/AI_LOG.md #A-44
import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import Badge, { paymentTone } from '../../components/common/Badge';
import { useI18n } from '../../context/I18nContext';
import { formatCOP, formatDateTime, formatKm, placeLabel } from '../../utils/format';
import { darkMapStyle } from '../../theme/mapStyle';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

function Row({ label, value, strong }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, strong && styles.rowStrong]}>{value}</Text>
    </View>
  );
}

export default function TripDetailScreen({ route }) {
  const { t } = useI18n();
  const { trip } = route.params;
  const mapRef = useRef(null);

  // Se dibuja la ruta guardada; si el viaje no la trae, una línea entre origen y destino
  const path = useMemo(() => {
    const saved = Array.isArray(trip.route) && trip.route.length > 1 ? trip.route : [trip.origin, trip.destination];
    return saved.map((p) => ({ latitude: p.lat, longitude: p.lng }));
  }, [trip]);

  const fit = () => {
    mapRef.current?.fitToCoordinates(path, {
      edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
      animated: false,
    });
  };

  return (
    <ScreenContainer scroll edges={[]} padded={false}>
      <View style={styles.mapBox}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          customMapStyle={darkMapStyle}
          userInterfaceStyle="dark"
          initialRegion={{ latitude: path[0].latitude, longitude: path[0].longitude, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
          onMapReady={fit}
          onLayout={fit}
          toolbarEnabled={false}
        >
          <Polyline coordinates={path} strokeColor={colors.primary} strokeWidth={5} />
          <Marker coordinate={path[0]} pinColor={colors.success} title={placeLabel(trip.origin)} />
          <Marker coordinate={path[path.length - 1]} pinColor={colors.danger} title={placeLabel(trip.destination)} />
        </MapView>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.date}>{formatDateTime(trip.createdAt)}</Text>
          <Badge label={t(`status.payment.${trip.paymentStatus || 'pending'}`)} tone={paymentTone(trip.paymentStatus)} />
        </View>

        <Card style={styles.card}>
          <View style={styles.place}>
            <Ionicons name="radio-button-on" size={16} color={colors.success} />
            <Text style={styles.placeText}>{placeLabel(trip.origin)}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.place}>
            <Ionicons name="location" size={16} color={colors.danger} />
            <Text style={styles.placeText}>{placeLabel(trip.destination)}</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Row label={t('history.category')} value={t(`status.category.${trip.category}`)} />
          <Row label={t('history.method')} value={t(`status.method.${trip.paymentMethod}`)} />
          <Row label={t('history.distance')} value={formatKm(trip.distanceKm)} />
          <Row label={t('history.duration')} value={`${trip.durationMin} min`} />
          <Row label={t('history.fare')} value={formatCOP(trip.fare)} />
          <Row label={t('history.commission')} value={`- ${formatCOP(trip.commission)}`} />
          <Row label={t('history.tip')} value={formatCOP(trip.tip || 0)} />
          <Row label={t('history.net')} value={formatCOP(trip.driverEarnings)} strong />
          <Row label={t('history.rating')} value={trip.rating ? `${trip.rating} / 5` : t('history.noRating')} />
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  mapBox: {
    height: 260,
    margin: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  date: {
    ...typography.subtitle,
    color: colors.text,
  },
  card: {
    marginBottom: spacing.md,
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeText: {
    ...typography.subtitle,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
  },
  line: {
    width: 2,
    height: 18,
    backgroundColor: colors.border,
    marginLeft: 7,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
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
    color: colors.primary,
  },
});
