import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../utils/colors';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('Bestiez App Error:', error, errorInfo); }
  handleReset = () => { this.setState({ hasError: false, error: null }); };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle-outline" size={50} color={COLORS.error} />
          </View>
          <Text style={styles.title}>Oops! Something broke.</Text>
          <Text style={styles.subtitle}>Our devs have been notified. Try refreshing the app.</Text>
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
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.errorSoft, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.navy, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, color: COLORS.textLight, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  resetBtn: { backgroundColor: COLORS.orange, paddingHorizontal: 40, paddingVertical: 16, borderRadius: RADIUS.md, shadowColor: COLORS.orange, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 },
  resetText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

export default ErrorBoundary;
