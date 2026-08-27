import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    const { firstName, lastName, email, phone, password } = formData;
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert('Missing details', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    if (result.success) navigation.navigate('OTP', { email });
    else Alert.alert('Registration Failed', result.message);
  };

  const renderInput = (icon, placeholder, key, secure = false, keyboard = 'default') => (
    <Input
      icon={icon}
      placeholder={placeholder}
      value={formData[key]}
      onChangeText={(text) => setFormData({ ...formData, [key]: text })}
      secure={secure}
      keyboard={keyboard}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join the squad — campus-ready drops await.</Text>

        {renderInput('person-outline', 'First Name', 'firstName')}
        {renderInput('person-outline', 'Last Name', 'lastName')}
        {renderInput('mail-outline', 'Email Address', 'email', false, 'email-address')}
        {renderInput('call-outline', 'Phone Number', 'phone', false, 'phone-pad')}
        {renderInput('lock-closed-outline', 'Password', 'password', true)}

        <Button fullWidth loading={loading} title={loading ? 'Creating...' : 'Create Account'} onPress={handleRegister} style={styles.cta} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.navy, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.textLight, marginBottom: 26 },
  cta: { marginTop: 6 },
});

export default RegisterScreen;
