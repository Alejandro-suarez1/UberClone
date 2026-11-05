// AI-assisted: see docs/AI_LOG.md #A-37
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PersonalTab from './PersonalTab';
import VehicleTab from './VehicleTab';
import DocumentsTab from './DocumentsTab';
import Button from '../../components/common/Button';
import { RegistrationProvider, useRegistration } from '../../context/RegistrationContext';
import { useI18n } from '../../context/I18nContext';
import { ROUTES } from '../../contracts/routes';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, radius, spacing } from '../../theme/spacing';

const Tab = createBottomTabNavigator();

const TAB_META = {
  [ROUTES.REG_PERSONAL]: { key: 'personal', icon: 'person-outline', label: 'auth.register.tabPersonal' },
  [ROUTES.REG_VEHICLE]: { key: 'vehicle', icon: 'car-sport-outline', label: 'auth.register.tabVehicle' },
  [ROUTES.REG_DOCUMENTS]: { key: 'documents', icon: 'document-text-outline', label: 'auth.register.tabDocuments' },
};

function RegisterTabBar({ state, navigation }) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { isFormValid, submitting, submitError, submit, tabErrorCount } = useRegistration();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {submitError ? <Text style={styles.submitError}>{t(submitError)}</Text> : null}
      <Button
        title={submitting ? t('auth.register.submitting') : t('auth.register.submit')}
        onPress={submit}
        disabled={!isFormValid}
        loading={submitting}
      />

      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const meta = TAB_META[route.name];
          const focused = state.index === index;
          const pending = tabErrorCount[meta.key];
          return (
            <Pressable
              key={route.key}
              style={styles.tab}
              onPress={() => {
                if (!focused) navigation.navigate(route.name);
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
            >
              <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                <Ionicons
                  name={meta.icon}
                  size={20}
                  color={focused ? colors.textOnPrimary : colors.textMuted}
                />
                <View style={[styles.status, { backgroundColor: pending === 0 ? colors.success : colors.warning }]}>
                  {pending === 0 ? (
                    <Ionicons name="checkmark" size={10} color={colors.textOnPrimary} />
                  ) : (
                    <Text style={styles.statusText}>{pending}</Text>
                  )}
                </View>
              </View>
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
                {t(meta.label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function RegisterTabs() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.REG_PERSONAL}
      tabBar={(props) => <RegisterTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={ROUTES.REG_PERSONAL} component={PersonalTab} />
      <Tab.Screen name={ROUTES.REG_VEHICLE} component={VehicleTab} />
      <Tab.Screen name={ROUTES.REG_DOCUMENTS} component={DocumentsTab} />
    </Tab.Navigator>
  );
}

export default function RegisterScreen({ navigation }) {
  const { t } = useI18n();

  return (
    <RegistrationProvider>
      <LinearGradient colors={colors.gradients.hero} style={styles.root}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back} hitSlop={12}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>{t('auth.register.title')}</Text>
            <Text style={styles.subtitle}>{t('auth.register.subtitle')}</Text>
          </View>
        </SafeAreaView>
        <View style={styles.body}>
          <RegisterTabs />
        </View>
      </LinearGradient>
    </RegistrationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  body: {
    flex: 1,
  },
  bar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
  },
  submitError: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 44,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  tabIconActive: {
    backgroundColor: colors.primary,
  },
  status: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  statusText: {
    ...typography.caption,
    fontSize: 10,
    lineHeight: 12,
    color: colors.textOnPrimary,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
