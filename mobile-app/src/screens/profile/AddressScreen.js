import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    recipientName: '', phone: '', street: '', building: '', landmark: '', campus: ''
  });

  const handleSave = () => {
    if (!formData.recipientName || !formData.phone) {
      Alert.alert('Missing Info', 'Please fill in your name and phone number.');
      return;
    }
    Alert.alert('Saved!', 'Address added successfully.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  const renderInput = (label, placeholder, value, key, multiline = false) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.textDark} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {renderInput('Recipient Name', 'Who is receiving this?', formData.recipientName, 'recipientName')}
        {renderInput('Phone Number', '+234...', formData.phone, 'phone', false, 'phone-pad')}
        {renderInput('Street Address', 'Street name and number', formData.street, 'street')}
        {renderInput('Building / Room', 'e.g. Block B, Room 4', formData.building, 'building')}
        {renderInput('Landmark', 'What is nearby?', formData.landmark, 'landmark', true)}
        
        <Text style={styles.inputLabel}>Select Campus Pickup</Text>
        <TouchableOpacity style={styles.campusPicker}>
          <Text style={styles.campusText}>{formData.campus || 'Choose your campus...'}</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textDark, marginBottom: 8 },
  input: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, fontSize: 16, color: COLORS.textDark, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  multilineInput: { height: 80, textAlignVertical: 'top' },
  campusPicker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 30, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  campusText: { fontSize: 16, color: COLORS.textLight },
  saveBtn: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  saveText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default AddressScreen;
