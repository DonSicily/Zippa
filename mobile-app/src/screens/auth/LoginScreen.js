import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) Alert.alert('Login Failed', result.message);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.monogram}><Text style={styles.monogramText}>B</Text></View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in for campus-ready drops.</Text>

        <Input icon="mail-outline" placeholder="Email address" value={email} onChangeText={setEmail} keyboard="email-address" />
        <Input icon="lock-closed-outline" placeholder="Password" value={password} onChangeText={setPassword} secure />

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <Button fullWidth loading={loading} title={loading ? 'Logging in...' : 'Log In'} onPress={handleLogin} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Bestiez? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingTop: 90 },
  monogram: { width: 46, height: 46, borderRadius: 14, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  monogramText: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.navy, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.textLight, marginBottom: 28 },
  forgot: { alignSelf: 'flex-end', marginTop: -6, marginBottom: 18 },
  forgotText: { color: COLORS.orange, fontWeight: '700', fontSize: 13 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: COLORS.textLight, fontSize: 14 },
  footerLink: { color: COLORS.orange, fontWeight: '700', fontSize: 14 },
});

export default LoginScreen;
