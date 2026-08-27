import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, CARD } from '../../utils/colors';

const MENU_ITEMS = [
  { id: 'Orders', title: 'My Orders', icon: 'bag-handle-outline', bg: COLORS.goldSoft, fg: COLORS.navy },
  { id: 'Addresses', title: 'Delivery Addresses', icon: 'location-outline', bg: COLORS.successSoft, fg: COLORS.success },
  { id: 'Ambassador', title: 'Campus Ambassador', icon: 'star-outline', bg: COLORS.orangeSoft, fg: COLORS.orange },
  { id: 'Settings', title: 'Settings', icon: 'settings-outline', bg: COLORS.chipBg, fg: COLORS.textLight },
];

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes, log out', onPress: logout, style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <Image source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' }} style={styles.avatar} />
          <Text style={styles.name}>{user?.firstName || 'Bestie'} {user?.lastName || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'bestie@bestiez.com'}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={14} color={COLORS.navy} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => navigation.navigate(item.id)}>
              <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={20} color={item.fg} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.errorSoft }]}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            </View>
            <Text style={[styles.menuText, { color: COLORS.error }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 55 },
  header: { alignItems: 'center', paddingVertical: 26, paddingHorizontal: 20 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: COLORS.gold, marginBottom: 14 },
  name: { fontSize: 22, fontWeight: '800', color: COLORS.navy },
  email: { fontSize: 14, color: COLORS.textLight, marginBottom: 14 },
  editBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999 },
  editText: { color: COLORS.navy, fontWeight: '700', marginLeft: 6, fontSize: 13 },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: { ...CARD, flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuText: { flex: 1, fontSize: 15, fontWeight: '700', color: COLORS.navy },
});

export default ProfileScreen;
