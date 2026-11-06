// AI-assisted: see docs/AI_LOG.md #A-20
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';
import Button from './Button';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';
import { formatISODate, parseISODate, toISODate } from '../../utils/format';

export default function DateField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  doneLabel = 'OK',
  error,
  minimumDate,
  maximumDate,
  initialDate,
  style,
}) {
  const [open, setOpen] = useState(false);
  const current = parseISODate(value) || initialDate || new Date();
  const [draft, setDraft] = useState(current);

  const handleChange = (event, selected) => {
    if (Platform.OS === 'android') {
      setOpen(false);
      if (event.type === 'set' && selected) onChange(toISODate(selected));
      onBlur?.();
    } else if (selected) {
      setDraft(selected);
    }
  };

  const openPicker = () => {
    setDraft(current);
    setOpen(true);
  };

  const confirmIOS = () => {
    onChange(toISODate(draft));
    setOpen(false);
    onBlur?.();
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable onPress={openPicker} style={[styles.field, !!error && styles.fieldError]}>
        <Text style={[styles.value, !value && styles.placeholder]}>{value ? formatISODate(value) : placeholder}</Text>
        <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {Platform.OS === 'android' && open ? (
        <DateTimePicker
          value={current}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleChange}
        />
      ) : null}

      {Platform.OS === 'ios' ? (
        <BottomSheet
          visible={open}
          onClose={() => {
            setOpen(false);
            onBlur?.();
          }}
          title={label}
        >
          <DateTimePicker
            value={draft}
            mode="date"
            display="spinner"
            themeVariant="dark"
            textColor={colors.text}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={handleChange}
          />
          <Button title={doneLabel} onPress={confirmIOS} />
        </BottomSheet>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  value: {
    ...typography.subtitle,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs + 2,
  },
});
