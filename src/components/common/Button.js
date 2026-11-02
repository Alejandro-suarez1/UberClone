import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, shadows, spacing } from '../../theme/spacing';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const inactive = disabled || loading;

  const animate = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 6 }).start();

  const textColor =
    variant === 'primary' ? colors.textOnPrimary : variant === 'danger' ? colors.danger : colors.text;

  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={size === 'sm' ? 16 : 20} color={textColor} style={styles.icon} /> : null}
          <Text style={[styles.text, size === 'sm' && styles.textSm, { color: textColor }]}>{title}</Text>
        </>
      )}
    </View>
  );

  return (
    <Animated.View style={[{ transform: [{ scale }] }, inactive && styles.disabled, style]}>
      <Pressable
        onPress={onPress}
        disabled={inactive}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
        accessibilityRole="button"
        accessibilityState={{ disabled: inactive }}
      >
        {variant === 'primary' ? (
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.base, size === 'sm' && styles.baseSm, !inactive && shadows.glow]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.base,
              size === 'sm' && styles.baseSm,
              variant === 'secondary' && styles.secondary,
              variant === 'danger' && styles.danger,
              variant === 'ghost' && styles.ghost,
            ]}
          >
            {content}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseSm: {
    minHeight: 40,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  secondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: 'rgba(255, 84, 112, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 84, 112, 0.45)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    ...typography.button,
  },
  textSm: {
    fontSize: 14,
  },
});
