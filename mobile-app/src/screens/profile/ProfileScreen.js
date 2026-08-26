import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';

const MENU_ITEMS = [
  { id: 'Orders', title: 'My Orders', icon: 'bag-handle-outline', color: '#E0D4FC' },
  { id: 'Addresses', title: 'Delivery Addresses', icon: 'location-outline', color: '#D4FCEF' },
  { id: 'Ambassador', title: 'Campus Ambassador', icon: 'star-outline', color: '#FCF4D4' },
  { id: 'Settings', title: 'Settings', icon: 'settings-outline', color: '#F0F0F0' },
];

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes, log out', onPress: logout, style: 'destructive' }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' }} style={styles.avatar} />
          <Text style={styles.name}>{user?.firstName || 'Bestie'} {user?.lastName || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'bestie@bestiez.com'}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color={COLORS.primary} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color={COLORS.textDark} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.iconBox, { backgroundColor: '#FFE5E5' }]}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            </View>
            <Text style={[styles.menuText, { color: COLORS.error }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.accent, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: '900', color: COLORS.textDark },
  email: { fontSize: 14, color: COLORS.textLight, marginBottom: 15 },
  editBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0D4FC', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  editText: { color: COLORS.primary, fontWeight: '600', marginLeft: 5, fontSize: 14 },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.textDark },
});

export default ProfileScreen;
