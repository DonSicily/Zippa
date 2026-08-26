// Wrapper component for Paystack Inline Payment.
// Handles the WebView lifecycle, success callbacks, and graceful closures.
// Requires: npm install react-native-paystack-webview (or similar package)

import React, { useRef } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import { PAYSTACK_PUBLIC_KEY } from '../../utils/constants';
import { COLORS } from '../../utils/colors';

const PaystackWebView = ({ 
  amount, 
  email, 
  reference, 
  onSuccess, 
  onClose, 
  visible 
}) => {
  const paystackRef = useRef();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Secure Checkout</Text>
        </View>
        
        <Paystack
          paystackRef={paystackRef}
          publicKey={PAYSTACK_PUBLIC_KEY}
          email={email}
          amount={amount * 100} // Paystack expects amount in kobo
          reference={reference}
          channels={['card', 'bank', 'ussd', 'qr', 'mobile_money']}
          currency="NGN"
          onSuccess={(res) => {
            onSuccess(res);
          }}
          onClose={() => {
            onClose();
          }}
          autoStart={true}
          activityIndicatorColor={COLORS.primary}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 50 },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
});

export default PaystackWebView;
