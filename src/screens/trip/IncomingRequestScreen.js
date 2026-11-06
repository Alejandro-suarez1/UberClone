import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import CountdownRing from '../../components/trip/CountdownRing';
import TripRequestCard from '../../components/trip/TripRequestCard';
import { useI18n } from '../../context/I18nContext';
import { useActiveTrip } from '../../context/ActiveTripContext';
import useDriverLocation from '../../hooks/useDriverLocation';
import { REQUEST_TIMEOUT_SECONDS } from '../../config/env';
import { resetToHome } from '../../contracts/navigationRef';
import { ROUTES } from '../../contracts/routes';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function IncomingRequestScreen({ navigation }) {
  const { t } = useI18n();
  const { incoming, trip, startTrip } = useActiveTrip();
  const { request, secondsLeft, accept, reject } = incoming;
  const [accepting, setAccepting] = useState(false);
  const [errorKey, setErrorKey] = useState(null);
  const leaving = useRef(false);

  useDriverLocation({ enabled: true });

  useEffect(() => {
    if (!request && !trip && !leaving.current) {
      if (navigation.canGoBack()) navigation.goBack();
      else resetToHome();
    }
  }, [request, trip, navigation]);

  const handleAccept = async () => {
    setAccepting(true);
    setErrorKey(null);
    leaving.current = true;
    try {
      const accepted = await accept();
      if (accepted) {
        await startTrip(accepted);
        navigation.replace(ROUTES.TRIP_IN_PROGRESS);
      } else {
        leaving.current = false;
      }
    } catch (e) {
      leaving.current = false;
      setErrorKey('trip.errorUpdate');
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = () => {
    leaving.current = false;
    reject();
  };

  if (!request) return <ScreenContainer />;

  return (
    <ScreenContainer scroll>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.kicker}>{t('trip.newRequest')}</Text>
          <Text style={styles.seconds}>{t('trip.secondsLeft', { seconds: secondsLeft })}</Text>
        </View>
        <CountdownRing seconds={secondsLeft} total={REQUEST_TIMEOUT_SECONDS} />
      </View>

      <TripRequestCard trip={request} />

      {errorKey ? <Text style={styles.error}>{t(errorKey)}</Text> : null}

      <View style={styles.actions}>
        <Button title={t('trip.reject')} variant="danger" onPress={handleReject} disabled={accepting} style={styles.reject} />
        <Button
          title={accepting ? t('trip.accepting') : t('trip.accept')}
          icon="checkmark"
          onPress={handleAccept}
          loading={accepting}
          style={styles.accept}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  headerText: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    color: colors.primary,
  },
  seconds: {
    ...typography.hero,
    color: colors.text,
    marginTop: spacing.xs,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.xl,
  },
  reject: {
    flex: 1,
    marginRight: spacing.md,
  },
  accept: {
    flex: 1.4,
  },
});
