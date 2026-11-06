import React from 'react';
import ScreenContainer from '../../components/common/ScreenContainer';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import DateField from '../../components/common/DateField';
import ImagePickerField from '../../components/common/ImagePickerField';
import { useI18n } from '../../context/I18nContext';
import { useRegistration } from '../../context/RegistrationContext';
import { GENDER_VALUES, LANGUAGE_VALUES } from '../../config/options';

export default function PersonalTab() {
  const { t, setLang } = useI18n();
  const { values, setField, touch, fieldError } = useRegistration();
  const p = values.personal;

  const err = (field) => {
    const key = fieldError('personal', field);
    return key ? t(key) : null;
  };
  const bind = (field) => ({
    value: p[field],
    onChangeText: (v) => setField('personal', field, v),
    onBlur: () => touch('personal', field),
    error: err(field),
  });

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  return (
    <ScreenContainer scroll edges={[]}>
      <ImagePickerField
        label={t('fields.photo')}
        hint={t('placeholders.photo')}
        uri={p.photoUri}
        round
        aspect={[1, 1]}
        onChange={(uri) => setField('personal', 'photoUri', uri)}
        onBlur={() => touch('personal', 'photoUri')}
        error={err('photoUri')}
        cameraLabel={t('common.camera')}
        galleryLabel={t('common.gallery')}
        permissionMessage={t('errors.permission')}
      />

      <Input
        label={t('fields.fullName')}
        placeholder={t('placeholders.fullName')}
        maxLength={50}
        autoCapitalize="words"
        {...bind('fullName')}
      />
      <Input
        label={t('fields.documentId')}
        placeholder={t('placeholders.documentId')}
        keyboardType="number-pad"
        maxLength={10}
        {...bind('documentId')}
      />
      <Input
        label={t('fields.phone')}
        placeholder={t('placeholders.phone')}
        keyboardType="phone-pad"
        maxLength={10}
        {...bind('phone')}
      />

      <DateField
        label={t('fields.birthDate')}
        placeholder={t('placeholders.date')}
        doneLabel={t('common.done')}
        value={p.birthDate}
        maximumDate={eighteenYearsAgo}
        initialDate={eighteenYearsAgo}
        onChange={(v) => setField('personal', 'birthDate', v)}
        onBlur={() => touch('personal', 'birthDate')}
        error={err('birthDate')}
      />

      <Select
        label={t('fields.gender')}
        placeholder={t('common.select')}
        value={p.gender}
        options={GENDER_VALUES.map((v) => ({ value: v, label: t(`status.gender.${v}`) }))}
        onChange={(v) => setField('personal', 'gender', v)}
        onBlur={() => touch('personal', 'gender')}
        error={err('gender')}
      />

      <Input
        label={t('fields.email')}
        placeholder={t('placeholders.email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        {...bind('email')}
      />

      <Select
        label={t('fields.language')}
        placeholder={t('common.select')}
        value={p.language}
        options={LANGUAGE_VALUES.map((v) => ({ value: v, label: t(`status.language.${v}`) }))}
        onChange={(v) => {
          setField('personal', 'language', v);
          setLang(v);
        }}
        onBlur={() => touch('personal', 'language')}
        error={err('language')}
      />
    </ScreenContainer>
  );
}
