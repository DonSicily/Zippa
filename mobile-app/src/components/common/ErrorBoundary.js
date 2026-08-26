// Catches JavaScript errors anywhere in the child component tree.
// Prevents the app from crashing entirely and shows a friendly "Oops" screen instead.

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, send this to a service like Sentry or Crashlytics
    console.error('Bestiez App Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle-outline" size={60} color={COLORS.error} />
          </View>
          <Text style={styles.title}>Oops! Something broke.</Text>
          <Text style={styles.subtitle}>
            Our devs have been notified. Try refreshing the app.
          </Text>
          <TouchableOpacity style={styles.resetBtn} onPress={this.handleReset}>
            <Text style={styles.resetText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', padding: 30 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFE5E5', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.textDark, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  resetBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 16, borderRadius: 20, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  resetText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default ErrorBoundary;
