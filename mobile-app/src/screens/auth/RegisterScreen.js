import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    const { firstName, lastName, email, phone, password } = formData;
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert('Oops!', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    if (result.success) {
      navigation.navigate('OTP', { email });
    } else {
      Alert.alert('Registration Failed', result.message);
    }
  };

  const renderInput = (icon, placeholder, value, key, secure = false, keyboard = 'default') => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color={COLORS.textLight} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        secureTextEntry={secure}
        keyboardType={keyboard}
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Join the squad! 🎉</Text>
        <Text style={styles.subtitle}>Create your Bestiez account.</Text>

        {renderInput('person-outline', 'First Name', formData.firstName, 'firstName')}
        {renderInput('person-outline', 'Last Name', formData.lastName, 'lastName')}
        {renderInput('mail-outline', 'Email Address', formData.email, 'email', false, 'email-address')}
        {renderInput('call-outline', 'Phone Number', formData.phone, 'phone', false, 'phone-pad')}
        {renderInput('lock-closed-outline', 'Password', formData.password, 'password', true)}

        <TouchableOpacity 
          style={[styles.registerBtn, loading && styles.disabledBtn]} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerBtnText}>{loading ? 'Creating...' : 'Create Account'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 60 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.textDark, marginBottom: 5 },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 15, marginBottom: 15, height: 55, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: COLORS.textDark },
  registerBtn: { backgroundColor: COLORS.primary, height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  disabledBtn: { opacity: 0.7 },
  registerBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default RegisterScreen;
