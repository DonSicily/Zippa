import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes, Log Out', onPress: logout, style: 'destructive' }
    ]);
  };

  const SettingRow = ({ icon, label, value, onPress, isToggle, toggleValue, onToggle, isDestructive }) => (
    <TouchableOpacity 
      style={styles.row} 
      onPress={onPress} 
      disabled={isToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, isDestructive && { backgroundColor: '#FFE5E5' }]}>
        <Ionicons name={icon} size={20} color={isDestructive ? COLORS.error : COLORS.textDark} />
      </View>
      <Text style={[styles.label, isDestructive && { color: COLORS.error }]}>{label}</Text>
      {isToggle ? (
        <Switch 
          value={toggleValue} 
          onValueChange={onToggle} 
          trackColor={{ false: '#E2E8F0', true: COLORS.accent }}
          thumbColor="#FFF"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow icon="notifications-outline" label="Push Notifications" isToggle toggleValue={notifications} onToggle={setNotifications} />
          <SettingRow icon="finger-print-outline" label="Biometric Login" isToggle toggleValue={biometric} onToggle={setBiometric} />
          <SettingRow icon="language-outline" label="Language" value="English" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.card}>
          <SettingRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
          <SettingRow icon="chatbubble-ellipses-outline" label="Contact Support" onPress={() => {}} />
          <SettingRow icon="document-text-outline" label="Terms & Privacy" onPress={() => {}} />
        </View>

        <View style={{ marginTop: 20 }}>
          <SettingRow icon="log-out-outline" label="Log Out" onPress={handleLogout} isDestructive />
        </View>
        
        <Text style={styles.versionText}>Bestiez App v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textLight, marginLeft: 20, marginTop: 24, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 20, padding: 8, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  iconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  label: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textDark },
  versionText: { textAlign: 'center', color: COLORS.textLight, fontSize: 12, marginTop: 30 },
});

export default SettingsScreen;
