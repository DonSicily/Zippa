import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

// v2 Header — bare navy chevron, centered navy title, contextual orange text action
const Header = ({ title, showBack = true, rightLabel, onRightPress, rightIcon, onRightIconPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color={COLORS.navy} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={[styles.side, styles.sideRight]}>
        {rightLabel && (
          <TouchableOpacity onPress={onRightPress}>
            <Text style={styles.rightLabel}>{rightLabel}</Text>
          </TouchableOpacity>
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={22} color={COLORS.navy} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12,
  },
  side: { width: 60 },
  sideRight: { alignItems: 'flex-end' },
  backBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  title: { flex: 1, fontSize: 17, fontWeight: '800', color: COLORS.navy, textAlign: 'center' },
  rightLabel: { fontSize: 14, fontWeight: '700', color: COLORS.orange },
});

export default Header;
