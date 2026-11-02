import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

export default function Select({ label, value, options, onChange, onBlur, placeholder, error, style }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  const close = () => {
    setOpen(false);
    onBlur?.();
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable onPress={() => setOpen(true)} style={[styles.field, !!error && styles.fieldError]}>
        <Text style={[styles.value, !selected && styles.placeholder]} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <BottomSheet visible={open} onClose={close} title={label}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.map((option) => {
            const active = option.value === value;
            return (
              <Pressable
                key={String(option.value)}
                style={[styles.option, active && styles.optionActive]}
                onPress={() => {
                  onChange(option.value);
                  close();
                }}
              >
                <Text style={[styles.optionText, active && styles.optionTextActive]}>{option.label}</Text>
                {active ? <Ionicons name="checkmark-circle" size={20} color={colors.primary} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </BottomSheet>
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
    flex: 1,
    marginRight: spacing.sm,
  },
  placeholder: {
    color: colors.textMuted,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs + 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  optionActive: {
    backgroundColor: colors.surfaceAlt,
  },
  optionText: {
    ...typography.subtitle,
    color: colors.text,
  },
  optionTextActive: {
    color: colors.primary,
  },
});
