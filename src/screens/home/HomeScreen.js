// AI-assisted: see docs/AI_LOG.md #B-16
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useI18n } from '../../context/I18nContext';
import { useDriverSession } from '../../context/DriverSessionContext';
import { useActiveTrip } from '../../context/ActiveTripContext';
import useDriverLocation from '../../hooks/useDriverLocation';
import { getCurrentPlace, requestLocationPermission } from '../../services/locationService';
import { createDemoRequest } from '../../services/demoService';
import { APPROVAL, PAYMENT_METHOD } from '../../contracts/types';
import { darkMapStyle } from '../../theme/mapStyle';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, radius, shadows, spacing } from '../../theme/spacing';

export default function HomeScreen({ navigation }) {
  const { t } = useI18n();
  const { driver, driverId, approval, isAvailable, setAvailable } = useDriverSession();
  const { trip } = useActiveTrip();
  const isFocused = useIsFocused();
  const mapRef = useRef(null);

  const [initialPlace, setInitialPlace] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const { location, error } = useDriverLocation({ enabled: isAvailable && isFocused && !trip });
  const place = location || initialPlace;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (await requestLocationPermission()) {
          const current = await getCurrentPlace();
          if (active) setInitialPlace(current);
        } else if (active) {
          setPermissionDenied(true);
        }
      } catch (e) {
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!place) return;
    mapRef.current?.animateToRegion(
      { latitude: place.lat, longitude: place.lng, latitudeDelta: 0.012, longitudeDelta: 0.012 },
      600,
    );
  }, [place?.lat, place?.lng]);

  const approved = approval === APPROVAL.APPROVED;

  const toggleAvailable = async (value) => {
    if (!value) {
      setAvailable(false);
      return;
    }
    if (!approved) return;
    const granted = await requestLocationPermission();
    if (!granted) {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);
    setAvailable(true);
  };

  const simulate = async (paymentMethod) => {
    if (!place || !driver) return;
    try {
      await createDemoRequest({ driverId, origin: place, category: driver.vehicle.category, paymentMethod });
    } catch (e) {
      Alert.alert(t('home.demoFailed'));
    }
  };

  const firstName = (driver?.personal?.fullName || '').split(' ')[0];
  const showPermissionWarning = permissionDenied || error === 'permission';

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        customMapStyle={darkMapStyle}
        userInterfaceStyle="dark"
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
        initialRegion={{ latitude: 6.2518, longitude: -75.5636, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
      />

      <SafeAreaView edges={['top']} style={styles.top} pointerEvents="box-none">
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={[styles.menu, shadows.card]}
          accessibilityLabel={t('home.menu')}
        >
          <Ionicons name="menu" size={24} color={colors.text} />
        </Pressable>
        <View style={[styles.hello, shadows.card]}>
          <Text style={styles.helloText} numberOfLines={1}>
            {t('home.greeting', { name: firstName })}
          </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} style={styles.bottom} pointerEvents="box-none">
        {!approved ? (
          <Card style={styles.banner}>
            <View style={styles.bannerRow}>
              <Ionicons
                name={approval === APPROVAL.REJECTED ? 'close-circle' : 'time'}
                size={22}
                color={approval === APPROVAL.REJECTED ? colors.danger : colors.warning}
              />
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>
                  {approval === APPROVAL.REJECTED ? t('home.rejectedTitle') : t('home.pendingTitle')}
                </Text>
                <Text style={styles.bannerBody}>
                  {approval === APPROVAL.REJECTED ? t('home.rejectedText') : t('home.pendingText')}
                </Text>
              </View>
            </View>
          </Card>
        ) : null}

        {showPermissionWarning ? <Text style={styles.warning}>{t('home.permissionDenied')}</Text> : null}

        <Card variant={isAvailable ? 'glow' : 'default'}>
          <View style={styles.switchRow}>
            <View style={styles.switchText}>
              <Text style={[styles.status, isAvailable && styles.statusOn]}>
                {isAvailable ? t('home.available') : t('home.unavailable')}
              </Text>
              <Text style={styles.statusHint}>
                {!place && isAvailable ? t('home.locating') : isAvailable ? t('home.online') : t('home.goOnline')}
              </Text>
            </View>
            <Switch
              value={isAvailable}
              onValueChange={toggleAvailable}
              disabled={!approved}
              trackColor={{ false: colors.border, true: colors.primaryDark }}
              thumbColor={isAvailable ? colors.primary : colors.textMuted}
            />
          </View>
        </Card>

        {__DEV__ && isAvailable && place ? (
          <View style={styles.demoRow}>
            <Button
              size="sm"
              variant="secondary"
              icon="flask-outline"
              title={`${t('home.demoRequest')} · MP`}
              onPress={() => simulate(PAYMENT_METHOD.MERCADOPAGO)}
              style={styles.demoButton}
            />
            <Button
              size="sm"
              variant="secondary"
              icon="flask-outline"
              title={`${t('home.demoRequest')} · ${t('status.method.cash')}`}
              onPress={() => simulate(PAYMENT_METHOD.CASH)}
              style={styles.demoButton}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
  },
  menu: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    marginLeft: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    height: 46,
    justifyContent: 'center',
    flexShrink: 1,
  },
  helloText: {
    ...typography.heading,
    fontSize: 16,
    color: colors.text,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md,
  },
  banner: {
    marginBottom: spacing.md,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bannerText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  bannerTitle: {
    ...typography.heading,
    fontSize: 16,
    color: colors.text,
  },
  bannerBody: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  warning: {
    ...typography.caption,
    color: colors.warning,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    flex: 1,
  },
  status: {
    ...typography.title,
    fontSize: 24,
    color: colors.textMuted,
  },
  statusOn: {
    color: colors.primary,
  },
  statusHint: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  demoRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  demoButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
});