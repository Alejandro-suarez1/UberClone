import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useI18n } from '../../context/I18nContext';
import { useDriverSession } from '../../context/DriverSessionContext';
import { findDriverByEmail } from '../../services/driverService';
import { email as validateEmail } from '../../utils/validators';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function LoginScreen({ navigation }) {
  const { t, setLang } = useI18n();
  const { signIn } = useDriverSession();
  const [email, setEmail] = useState('');
  const [errorKey, setErrorKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const invalid = validateEmail(email);
    if (invalid) {
      setErrorKey(invalid);
      return;
    }
    setLoading(true);
    setErrorKey(null);
    try {
      const found = await findDriverByEmail(email);
      if (!found) {
        setErrorKey('auth.login.notFound');
        return;
      }
      if (found.personal?.language) setLang(found.personal.language);
      await signIn(found.id);
    } catch (e) {
      setErrorKey('errors.generic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scroll>
      <Pressable onPress={() => navigation.goBack()} style={styles.back} hitSlop={12}>
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>{t('auth.login.title')}</Text>
        <Text style={styles.subtitle}>{t('auth.login.subtitle')}</Text>
      </View>

      <Input
        label={t('fields.email')}
        placeholder={t('placeholders.email')}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setErrorKey(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errorKey ? t(errorKey) : null}
      />

      <Button title={t('auth.login.submit')} onPress={submit} loading={loading} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
