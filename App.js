import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { I18nProvider } from './src/context/I18nContext';
import { DriverSessionProvider } from './src/context/DriverSessionContext';
import { ActiveTripProvider } from './src/context/ActiveTripContext'; 
import RootNavigator from './src/navigation/RootNavigator';
import { navigationRef } from './src/contracts/navigationRef';
import { colors } from './src/theme/colors';
import { fontAssets } from './src/theme/typography';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.accent,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <I18nProvider>
        <DriverSessionProvider>
          <ActiveTripProvider>
            <NavigationContainer ref={navigationRef} theme={navigationTheme}>
              <StatusBar style="light" />
              <RootNavigator />
            </NavigationContainer>
          </ActiveTripProvider>
        </DriverSessionProvider>
      </I18nProvider>
    </SafeAreaProvider>
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
