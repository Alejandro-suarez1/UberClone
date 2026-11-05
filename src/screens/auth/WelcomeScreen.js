import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import { useI18n } from '../../context/I18nContext';
import { ROUTES } from '../../contracts/routes';
import { APP_NAME } from '../../config/options';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, shadows, spacing } from '../../theme/spacing';

export default function WelcomeScreen({ navigation }) {
  const { t } = useI18n();

  return (
    <ScreenContainer>
      <View pointerEvents="none" style={styles.orbLime} />
      <View pointerEvents="none" style={styles.orbViolet} />

      <View style={styles.hero}>
        <LinearGradient colors={colors.gradients.primary} style={[styles.logo, shadows.glow]}>
          <Ionicons name="navigate" size={34} color={colors.textOnPrimary} />
        </LinearGradient>
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.badge}>{t('auth.welcome.badge')}</Text>
        <Text style={styles.title}>{t('auth.welcome.title')}</Text>
        <Text style={styles.subtitle}>{t('auth.welcome.subtitle')}</Text>
      </View>

      <View style={styles.actions}>
        <Button title={t('auth.welcome.register')} icon="person-add" onPress={() => navigation.navigate(ROUTES.REGISTER)} />
        <Button
          title={t('auth.welcome.login')}
          variant="secondary"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          style={styles.second}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  orbLime: {
    position: 'absolute',
    top: -90,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(198, 255, 61, 0.1)',
  },
  orbViolet: {
    position: 'absolute',
    bottom: 120,
    left: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  brand: {
    ...typography.label,
    color: colors.primary,
    fontSize: 13,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  badge: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.hero,
    color: colors.text,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
  actions: {
    paddingBottom: spacing.lg,
  },
  second: {
    marginTop: spacing.md,
  },
});
