// AI-assisted: see docs/AI_LOG.md #A-48
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import DrawerContent from './DrawerContent';
import HomeScreen from '../screens/home/HomeScreen'; 
import EarningsScreen from '../screens/earnings/EarningsScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import { useI18n } from '../context/I18nContext';
import { ROUTES } from '../contracts/routes';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

const Drawer = createDrawerNavigator();

const icon = (name) => ({ color, size }) => <Ionicons name={name} size={size} color={color} />;

export default function DrawerNavigator() {
  const { t } = useI18n();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: colors.text,
        headerTitleStyle: { fontFamily: fonts.heading, fontSize: 18 },
        sceneStyle: { backgroundColor: colors.bg },
        drawerStyle: { backgroundColor: colors.bg, width: 300 },
        drawerActiveTintColor: colors.textOnPrimary,
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerLabelStyle: { fontFamily: fonts.heading, fontSize: 15, marginLeft: -8 },
        drawerItemStyle: { borderRadius: 16, marginHorizontal: 16, marginVertical: 2 },
      }}
    >
      {/* Inicio dibuja su propio encabezado sobre el mapa */}
      <Drawer.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: t('nav.home'), headerShown: false, drawerIcon: icon('navigate-outline') }}
      />
      <Drawer.Screen
        name={ROUTES.EARNINGS}
        component={EarningsScreen}
        options={{ title: t('nav.earnings'), drawerIcon: icon('wallet-outline') }}
      />
      <Drawer.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{ title: t('nav.history'), drawerIcon: icon('time-outline') }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: t('nav.profile'), drawerIcon: icon('person-outline') }}
      />
      <Drawer.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: t('nav.settings'), drawerIcon: icon('settings-outline') }}
      />
    </Drawer.Navigator>
  );
}
