// AI-assisted: see docs/AI_LOG.md #A-21
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from './BottomSheet';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

export default function ImagePickerField({
  label,
  uri,
  onChange,
  onBlur,
  error,
  hint,
  cameraLabel = 'Camera',
  galleryLabel = 'Gallery',
  permissionMessage = 'Permission denied',
  aspect = [4, 3],
  round = false,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState(null);

  const close = () => {
    setOpen(false);
    onBlur?.();
  };

  const pick = async (source) => {
    setOpen(false);
    setLocalError(null);
    try {
      const permission =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setLocalError(permissionMessage);
        return;
      }
      const options = { mediaTypes: ['images'], quality: 0.6, allowsEditing: true, aspect };
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled && result.assets?.length) {
        onChange(result.assets[0].uri);
      }
    } catch (e) {
      setLocalError(permissionMessage);
    } finally {
      onBlur?.();
    }
  };

  const shownError = error || localError;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.box, round && styles.boxRound, !!shownError && styles.boxError]}
      >
        {uri ? (
          <Image source={{ uri }} style={[styles.image, round && styles.imageRound]} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera-outline" size={28} color={colors.primary} />
            {hint ? <Text style={styles.hint}>{hint}</Text> : null}
          </View>
        )}
        {uri ? (
          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={14} color={colors.textOnPrimary} />
          </View>
        ) : null}
      </Pressable>
      {shownError ? <Text style={styles.error}>{shownError}</Text> : null}

      <BottomSheet visible={open} onClose={close} title={label}>
        <Pressable style={styles.option} onPress={() => pick('camera')}>
          <Ionicons name="camera" size={22} color={colors.primary} />
          <Text style={styles.optionText}>{cameraLabel}</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={() => pick('gallery')}>
          <Ionicons name="images" size={22} color={colors.primary} />
          <Text style={styles.optionText}>{galleryLabel}</Text>
        </Pressable>
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
  box: {
    height: 150,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxRound: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
  },
  boxError: {
    borderColor: colors.danger,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageRound: {
    borderRadius: 65,
  },
  placeholder: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs + 2,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.sm,
  },
  optionText: {
    ...typography.subtitle,
    color: colors.text,
    marginLeft: spacing.md,
  },
});
