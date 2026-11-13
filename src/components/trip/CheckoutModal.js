import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../context/I18nContext';
import { isPaymentReturnUrl } from '../../services/paymentService';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function CheckoutModal({ visible, url, onClose }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const handled = useRef(false);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      handled.current = false;
    }
  }, [visible, url]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Ionicons name="lock-closed" size={16} color={colors.success} />
          <Text style={styles.title}>{t('payment.checkoutTitle')}</Text>
          <Pressable onPress={onClose} hitSlop={12} style={styles.close}>
            <Text style={styles.closeText}>{t('payment.close')}</Text>
          </Pressable>
        </View>

        {url ? (
          <WebView
            source={{ uri: url }}
            style={styles.web}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={(navState) => {
              if (isPaymentReturnUrl(navState.url) && !handled.current) {
                handled.current = true;
                onClose();
              }
            }}
          />
        ) : null}

        {loading ? <ActivityIndicator style={styles.loader} color={colors.primary} /> : null}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.heading,
    fontSize: 17,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  close: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
  },
  closeText: {
    ...typography.subtitle,
    color: colors.primary,
  },
  web: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
  },
});