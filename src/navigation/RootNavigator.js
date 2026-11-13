// AI-assisted: see docs/AI_LOG.md #A-49
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TripDetailScreen from '../screens/history/TripDetailScreen';
import IncomingRequestScreen from '../screens/trip/IncomingRequestScreen'; // B
import TripInProgressScreen from '../screens/trip/TripInProgressScreen'; // B
import PaymentSummaryScreen from '../screens/trip/PaymentSummaryScreen'; // B
import { useDriverSession } from '../context/DriverSessionContext';
import { useI18n } from '../context/I18nContext';
import { ROUTES } from '../contracts/routes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const Stack = createNativeStackNavigator();

const detailHeader = {
  headerStyle: { backgroundColor: colors.bg },
  headerTintColor: colors.text,
  headerTitleStyle: { fontFamily: fonts.heading, fontSize: 18 },
  contentStyle: { backgroundColor: colors.bg },
};

export default function RootNavigator() {
  const { driverId, ready } = useDriverSession();
  const { t } = useI18n();

  if (!ready) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!driverId) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <Stack.Screen name={ROUTES.MAIN} component={DrawerNavigator} />
      <Stack.Screen
        name={ROUTES.INCOMING_REQUEST}
        component={IncomingRequestScreen}
        options={{ presentation: 'modal', gestureEnabled: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name={ROUTES.TRIP_IN_PROGRESS} component={TripInProgressScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ROUTES.PAYMENT_SUMMARY} component={PaymentSummaryScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen
        name={ROUTES.TRIP_DETAIL}
        component={TripDetailScreen}
        options={{ ...detailHeader, headerShown: true, title: t('history.detailTitle'), headerBackTitle: '' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
