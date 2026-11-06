import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useI18n } from '../context/I18nContext';
import { useDriverSession } from '../context/DriverSessionContext';
import { APP_NAME } from '../config/options';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

const APPROVAL_TONE = { approved: 'success', pending: 'warning', rejected: 'danger' };

export default function DrawerContent(props) {
  const { t } = useI18n();
  const { driver, isAvailable, signOut } = useDriverSession();

  const confirmLogout = () => {
    Alert.alert(t('settings.logoutTitle'), t('settings.logoutMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('nav.logout'), style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <LinearGradient colors={colors.gradients.hero} style={styles.root}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.brand}>{APP_NAME}</Text>
          <View style={styles.profile}>
            {driver?.personal?.photoUrl ? (
              <Image source={{ uri: driver.personal.photoUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarEmpty]}>
                <Ionicons name="person" size={28} color={colors.textMuted} />
              </View>
            )}
            <View style={styles.profileText}>
              <Text style={styles.name} numberOfLines={1}>
                {driver?.personal?.fullName || ''}
              </Text>
              <Text style={styles.plate}>{driver?.vehicle?.plate || ''}</Text>
            </View>
          </View>
          <View style={styles.badges}>
            <Badge
              label={t(`status.approval.${driver?.approval || 'pending'}`)}
              tone={APPROVAL_TONE[driver?.approval] || 'neutral'}
            />
            <Badge
              label={isAvailable ? t('nav.available') : t('nav.unavailable')}
              tone={isAvailable ? 'brand' : 'neutral'}
              style={styles.badgeGap}
            />
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Button title={t('nav.logout')} variant="secondary" icon="log-out-outline" onPress={confirmLogout} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingTop: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brand: {
    ...typography.label,
    color: colors.primary,
    letterSpacing: 4,
    marginBottom: spacing.lg,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarEmpty: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
  },
  profileText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  plate: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 2,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  badgeGap: {
    marginLeft: spacing.sm,
  },
  footer: {
    padding: spacing.xl,
    borderTopLeftRadius: radius.xl,
  },
});
