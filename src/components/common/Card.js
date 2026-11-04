import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { radius, shadows, spacing } from '../../theme/spacing';

export default function Card({ children, variant = 'default', padded = true, style }) {
  return (
    <View style={[styles.shadow, variant === 'glow' && shadows.glow, style]}>
      <LinearGradient
        colors={colors.gradients.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, variant === 'glow' && styles.cardGlow, padded && styles.padded]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: radius.lg,
    ...shadows.card,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardGlow: {
    borderColor: 'rgba(198, 255, 61, 0.55)',
  },
  padded: {
    padding: spacing.lg,
  },
});
