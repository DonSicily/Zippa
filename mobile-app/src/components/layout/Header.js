import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

const Header = ({ title, showBack = true, rightAction, rightIcon }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      
      <View style={styles.right}>
        {rightAction && (
          <TouchableOpacity onPress={rightAction} style={styles.iconBtn}>
            <Ionicons name={rightIcon || 'ellipsis-horizontal'} size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15,
    backgroundColor: COLORS.background,
  },
  left: { width: 40 },
  right: { width: 40, alignItems: 'flex-end' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  title: { flex: 1, fontSize: 20, fontWeight: '800', color: COLORS.textDark, textAlign: 'center' },
});

export default Header;
