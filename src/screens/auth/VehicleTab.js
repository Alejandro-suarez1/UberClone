import React from 'react';
import ScreenContainer from '../../components/common/ScreenContainer';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import ImagePickerField from '../../components/common/ImagePickerField';
import { useI18n } from '../../context/I18nContext';
import { useRegistration } from '../../context/RegistrationContext';
import { CATEGORY_VALUES, COLOR_VALUES } from '../../config/options';

export default function VehicleTab() {
  const { t } = useI18n();
  const { values, setField, touch, fieldError } = useRegistration();
  const v = values.vehicle;

  const err = (field) => {
    const key = fieldError('vehicle', field);
    return key ? t(key) : null;
  };
  const bind = (field) => ({
    value: v[field],
    onChangeText: (value) => setField('vehicle', field, value),
    onBlur: () => touch('vehicle', field),
    error: err(field),
  });

  return (
    <ScreenContainer scroll edges={[]}>
      <Select
        label={t('fields.category')}
        placeholder={t('common.select')}
        value={v.category}
        options={CATEGORY_VALUES.map((c) => ({ value: c, label: t(`status.category.${c}`) }))}
        onChange={(c) => {
          setField('vehicle', 'category', c);
          touch('vehicle', 'seats'); 
        }}
        onBlur={() => touch('vehicle', 'category')}
        error={err('category')}
      />

      <Input
        label={t('fields.plate')}
        placeholder={t('placeholders.plate')}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={6}
        {...bind('plate')}
      />
      <Input label={t('fields.brand')} placeholder={t('placeholders.brand')} maxLength={30} {...bind('brand')} />
      <Input label={t('fields.model')} placeholder={t('placeholders.model')} maxLength={30} {...bind('model')} />
      <Input
        label={t('fields.year')}
        placeholder={t('placeholders.year')}
        keyboardType="number-pad"
        maxLength={4}
        {...bind('year')}
      />

      <Select
        label={t('fields.color')}
        placeholder={t('common.select')}
        value={v.color}
        options={COLOR_VALUES.map((c) => ({ value: c, label: t(`status.color.${c}`) }))}
        onChange={(c) => setField('vehicle', 'color', c)}
        onBlur={() => touch('vehicle', 'color')}
        error={err('color')}
      />

      <Input
        label={t('fields.seats')}
        placeholder={t('placeholders.seats')}
        keyboardType="number-pad"
        maxLength={2}
        helper={v.category === 'xl' ? t('auth.register.xlHint') : undefined}
        {...bind('seats')}
      />

      <ImagePickerField
        label={t('fields.vehiclePhoto')}
        hint={t('placeholders.vehiclePhoto')}
        uri={v.photoUri}
        onChange={(uri) => setField('vehicle', 'photoUri', uri)}
        onBlur={() => touch('vehicle', 'photoUri')}
        error={err('photoUri')}
        cameraLabel={t('common.camera')}
        galleryLabel={t('common.gallery')}
        permissionMessage={t('errors.permission')}
      />
    </ScreenContainer>
  );
}
