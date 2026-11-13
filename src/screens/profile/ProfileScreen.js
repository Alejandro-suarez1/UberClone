// AI-assisted: see docs/AI_LOG.md #A-45
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/common/ScreenContainer';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import DateField from '../../components/common/DateField';
import ImagePickerField from '../../components/common/ImagePickerField';
import { useI18n } from '../../context/I18nContext';
import { useDriverSession } from '../../context/DriverSessionContext';
import { updateDriver, uploadImage } from '../../services/driverService';
import { COLOR_VALUES } from '../../config/options';
import { APPROVAL } from '../../contracts/types';
import { email as validateEmail, expiryDate, fullName as validateName, phone as validatePhone, seats as validateSeats } from '../../utils/validators';
import { onlyDigits } from '../../utils/validators';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const APPROVAL_TONE = { [APPROVAL.APPROVED]: 'success', [APPROVAL.PENDING]: 'warning', [APPROVAL.REJECTED]: 'danger' };

export default function ProfileScreen() {
  const { t } = useI18n();
  const { driver, driverId } = useDriverSession();

  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Copia editable de los datos del conductor
  useEffect(() => {
    if (!driver) return;
    setForm((prev) =>
      prev || {
        photoUri: driver.personal.photoUrl,
        fullName: driver.personal.fullName,
        phone: driver.personal.phone,
        mpEmail: driver.documents.mpEmail,
        color: driver.vehicle.color,
        seats: String(driver.vehicle.seats),
        licenseExpiry: driver.documents.licenseExpiry,
        soatExpiry: driver.documents.soatExpiry,
      },
    );
  }, [driver]);

  if (!driver || !form) return <ScreenContainer />;

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    setSaved(false);
  };

  const validate = () => {
    const found = {
      fullName: validateName(form.fullName),
      phone: validatePhone(form.phone),
      mpEmail: validateEmail(form.mpEmail),
      seats: validateSeats(form.seats, driver.vehicle.category),
      licenseExpiry: expiryDate(form.licenseExpiry),
      soatExpiry: expiryDate(form.soatExpiry),
    };
    Object.keys(found).forEach((k) => !found[k] && delete found[k]);
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const patch = {
        'personal.fullName': form.fullName.trim(),
        'personal.phone': form.phone,
        'documents.mpEmail': form.mpEmail.trim().toLowerCase(),
        'vehicle.color': form.color,
        'vehicle.seats': Number(form.seats),
        'documents.licenseExpiry': form.licenseExpiry,
        'documents.soatExpiry': form.soatExpiry,
      };
      if (form.photoUri && form.photoUri !== driver.personal.photoUrl) {
        patch['personal.photoUrl'] = await uploadImage(form.photoUri);
      }
      await updateDriver(driverId, patch);
      setSaved(true);
    } catch (e) {
      setErrors({ general: 'errors.submitFailed' });
    } finally {
      setSaving(false);
    }
  };

  const err = (field) => (errors[field] ? t(errors[field]) : null);
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <ScreenContainer scroll edges={[]}>
      <Card variant="glow" style={styles.summary}>
        <Text style={styles.name}>{driver.personal.fullName}</Text>
        <Text style={styles.sub}>
          {driver.vehicle.brand} {driver.vehicle.model} · {driver.vehicle.plate}
        </Text>
        <Badge
          label={t(`status.approval.${driver.approval}`)}
          tone={APPROVAL_TONE[driver.approval] || 'neutral'}
          style={styles.approval}
        />
      </Card>

      <Text style={styles.section}>{t('profile.personal')}</Text>
      <ImagePickerField
        label={t('fields.photo')}
        uri={form.photoUri}
        round
        aspect={[1, 1]}
        onChange={(uri) => setField('photoUri', uri)}
        cameraLabel={t('common.camera')}
        galleryLabel={t('common.gallery')}
        permissionMessage={t('errors.permission')}
      />
      <Input
        label={t('fields.fullName')}
        value={form.fullName}
        maxLength={50}
        autoCapitalize="words"
        onChangeText={(v) => setField('fullName', v)}
        error={err('fullName')}
      />
      <Input
        label={t('fields.phone')}
        value={form.phone}
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(v) => setField('phone', onlyDigits(v))}
        error={err('phone')}
      />
      <Input label={t('fields.email')} value={driver.personal.email} editable={false} helper={t('profile.emailLocked')} />

      <Text style={styles.section}>{t('profile.vehicle')}</Text>
      <Select
        label={t('fields.color')}
        value={form.color}
        options={COLOR_VALUES.map((c) => ({ value: c, label: t(`status.color.${c}`) }))}
        onChange={(v) => setField('color', v)}
      />
      <Input
        label={t('fields.seats')}
        value={form.seats}
        keyboardType="number-pad"
        maxLength={2}
        onChangeText={(v) => setField('seats', onlyDigits(v))}
        error={err('seats')}
      />

      <Text style={styles.section}>{t('profile.documents')}</Text>
      <DateField
        label={t('fields.licenseExpiry')}
        doneLabel={t('common.done')}
        value={form.licenseExpiry}
        minimumDate={tomorrow}
        onChange={(v) => setField('licenseExpiry', v)}
        error={err('licenseExpiry')}
      />
      <DateField
        label={t('fields.soatExpiry')}
        doneLabel={t('common.done')}
        value={form.soatExpiry}
        minimumDate={tomorrow}
        onChange={(v) => setField('soatExpiry', v)}
        error={err('soatExpiry')}
      />
      <Input
        label={t('fields.mpEmail')}
        value={form.mpEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(v) => setField('mpEmail', v)}
        error={err('mpEmail')}
      />

      {errors.general ? <Text style={styles.generalError}>{t(errors.general)}</Text> : null}
      {saved ? <Text style={styles.savedText}>{t('profile.saved')}</Text> : null}
      <View style={styles.save}>
        <Button title={t('common.save')} onPress={save} loading={saving} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginBottom: spacing.xl,
  },
  name: {
    ...typography.title,
    color: colors.text,
  },
  sub: {
    ...typography.subtitle,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  approval: {
    marginTop: spacing.md,
  },
  section: {
    ...typography.heading,
    color: colors.primary,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  generalError: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  savedText: {
    ...typography.caption,
    color: colors.success,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  save: {
    marginTop: spacing.sm,
  },
});
