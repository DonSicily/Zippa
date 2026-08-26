import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCampuses } from '../../hooks/useCampus';
import { COLORS } from '../../utils/colors';

const CampusSelectorScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { campuses, loading } = useCampuses();

  const filteredCampuses = campuses.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.location?.city?.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedId) {
      // In a real app, update user profile via API
      Alert.alert('Success', 'Campus updated successfully!');
      navigation.goBack();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.campusCard, selectedId === item._id && styles.selectedCard]}
      onPress={() => setSelectedId(item._id)}
    >
      <View style={styles.radioOuter}>
        {selectedId === item._id && <View style={styles.radioInner} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.campusName}>{item.name}</Text>
        <Text style={styles.campusLocation}>{item.location?.city}, {item.location?.state}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={24} color={selectedId === item._id ? COLORS.primary : 'transparent'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Campus</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search university or polytechnic..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredCampuses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {selectedId && (
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm Campus</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 10, padding: 15, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: COLORS.textDark },
  listContent: { padding: 20, paddingBottom: 100 },
  campusCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  selectedCard: { borderWidth: 2, borderColor: COLORS.primary, backgroundColor: '#F0F4FF' },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.textLight, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  campusName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  campusLocation: { fontSize: 13, color: COLORS.textLight },
  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  confirmBtn: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  confirmText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default CampusSelectorScreen;
