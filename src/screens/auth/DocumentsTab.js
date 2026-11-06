import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Input from '../../components/common/Input';
import DateField from '../../components/common/DateField';
import ImagePickerField from '../../components/common/ImagePickerField';
import Checkbox from '../../components/common/Checkbox';
import { useI18n } from '../../context/I18nContext';
import { useRegistration } from '../../context/RegistrationContext';
import { COMMISSION_RATE } from '../../config/pricing';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function DocumentsTab() {
  const { t } = useI18n();
  const { values, setField, touch, fieldError, needsTechnicalReview } = useRegistration();
  const d = values.documents;
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const err = (field) => {
    const key = fieldError('documents', field);
    return key ? t(key) : null;
  };

  const imageProps = (field, label, hint) => ({
    label,
    hint,
    uri: d[field],
    onChange: (uri) => setField('documents', field, uri),
    onBlur: () => touch('documents', field),
    error: err(field),
    cameraLabel: t('common.camera'),
    galleryLabel: t('common.gallery'),
    permissionMessage: t('errors.permission'),
  });

  const dateProps = (field, label) => ({
    label,
    placeholder: t('placeholders.date'),
    doneLabel: t('common.done'),
    value: d[field],
    minimumDate: tomorrow,
    initialDate: tomorrow,
    onChange: (v) => setField('documents', field, v),
    onBlur: () => touch('documents', field),
    error: err(field),
  });

  return (
    <ScreenContainer scroll edges={[]}>
      <Section title={t('auth.register.license')}>
        <Input
          label={t('fields.licenseNumber')}
          placeholder={t('placeholders.licenseNumber')}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={15}
          value={d.licenseNumber}
          onChangeText={(v) => setField('documents', 'licenseNumber', v)}
          onBlur={() => touch('documents', 'licenseNumber')}
          error={err('licenseNumber')}
        />
        <ImagePickerField {...imageProps('licensePhotoUri', t('fields.licensePhoto'), t('placeholders.document'))} />
        <DateField {...dateProps('licenseExpiry', t('fields.licenseExpiry'))} />
      </Section>

      <Section title={t('auth.register.soat')}>
        <ImagePickerField {...imageProps('soatPhotoUri', t('fields.soatPhoto'), t('placeholders.document'))} />
        <DateField {...dateProps('soatExpiry', t('fields.soatExpiry'))} />
      </Section>

      {needsTechnicalReview ? (
        <Section title={t('auth.register.tech')}>
          <ImagePickerField {...imageProps('techPhotoUri', t('fields.techPhoto'), t('placeholders.document'))} />
          <DateField {...dateProps('techExpiry', t('fields.techExpiry'))} />
        </Section>
      ) : null}

      <Section title={t('auth.register.payments')}>
        <Input
          label={t('fields.mpEmail')}
          placeholder={t('placeholders.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          helper={t('auth.register.paymentNote')}
          value={d.mpEmail}
          onChangeText={(v) => setField('documents', 'mpEmail', v)}
          onBlur={() => touch('documents', 'mpEmail')}
          error={err('mpEmail')}
        />
        <Checkbox
          checked={d.terms}
          onChange={(v) => {
            setField('documents', 'terms', v);
            touch('documents', 'terms');
          }}
          label={t('auth.register.terms', { rate: Math.round(COMMISSION_RATE * 100) })}
          error={err('terms')}
        />
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
});
