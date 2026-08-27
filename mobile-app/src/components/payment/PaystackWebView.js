import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../../utils/colors';

const PaystackWebView = ({ visible, amount, email, reference, onSuccess, onClose }) => {
  // In production, replace this with your actual Paystack inline checkout URL
  const paystackUrl = `https://checkout.paystack.com/?amount=${(amount || 0) * 100}&email=${email}&reference=${reference}`;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        <WebView
          source={{ uri: paystackUrl }}
          onLoadEnd={() => {
            // Mocking success callback for UI flow testing
            setTimeout(() => onSuccess({ reference }), 2500);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
});

export default PaystackWebView;
