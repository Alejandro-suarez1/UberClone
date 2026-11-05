import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import Chips from '../../components/common/Chips';
import Button from '../../components/common/Button';
import { useI18n } from '../../context/I18nContext';
import { useDriverSession } from '../../context/DriverSessionContext';
import { updateDriver } from '../../services/driverService';
import { LANGUAGE_VALUES } from '../../config/options';
import { PRICING } from '../../config/pricing';
import { formatCOP } from '../../utils/format';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function SettingsScreen() {
  const { t, lang, setLang } = useI18n();
  const { driverId, signOut } = useDriverSession();

  const changeLanguage = (next) => {
    setLang(next);
    if (driverId) updateDriver(driverId, { 'personal.language': next }).catch(() => {});
  };

  const confirmLogout = () => {
    Alert.alert(t('settings.logoutTitle'), t('settings.logoutMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('nav.logout'), style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <ScreenContainer scroll edges={[]}>
      <Text style={styles.section}>{t('settings.language')}</Text>
      <Card style={styles.card}>
        <Chips
          options={LANGUAGE_VALUES.map((v) => ({ value: v, label: t(`status.language.${v}`) }))}
          value={lang}
          onChange={changeLanguage}
        />
      </Card>

      <Text style={styles.section}>{t('settings.commission')}</Text>
      <Card style={styles.card}>
        <Text style={styles.big}>{Math.round(PRICING.commissionRate * 100)} %</Text>
        <Text style={styles.body}>{t('settings.commissionHint')}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>
          {t('settings.baseFare')}: {formatCOP(PRICING.baseFare)} · {t('settings.perKm')}: {formatCOP(PRICING.perKm)} ·{' '}
          {t('settings.perMin')}: {formatCOP(PRICING.perMinute)}
        </Text>
      </Card>

      <Text style={styles.section}>{t('settings.about')}</Text>
      <Card style={styles.card}>
        <Text style={styles.body}>{t('settings.aboutText')}</Text>
      </Card>

      <Button title={t('nav.logout')} variant="danger" icon="log-out-outline" onPress={confirmLogout} style={styles.logout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  big: {
    ...typography.hero,
    color: colors.primary,
  },
  body: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  logout: {
    marginTop: spacing.xl,
  },
});
