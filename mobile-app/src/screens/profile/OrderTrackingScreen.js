import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CARD, SHADOW } from '../../utils/colors';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';

const STEPS = [
  { label: 'Placed', state: 'done' },
  { label: 'China Hub', state: 'done' },
  { label: 'In Transit', state: 'done' },
  { label: 'In Nigeria', state: 'current', sub: 'Customs cleared' },
  { label: 'Campus Pickup', state: 'next' },
];

const ITEMS = [
  { name: 'Bestiez Branded Hoodie', price: 55000, icon: 'shirt-outline' },
  { name: 'Premium Campus Sneakers', price: 89000, icon: 'footsteps-outline' },
  { name: 'University Textbook: Advanced Econ', price: 120000, icon: 'book-outline' },
];

const OrderTrackingScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Order #BSTZ-8X92A" rightLabel="Help" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Status */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View style={styles.statusIcon}>
              <Ionicons name="cube-outline" size={22} color={COLORS.orange} />
            </View>
            <View>
              <Text style={styles.statusTitle}>Arriving Tuesday, Aug 20</Text>
              <Text style={styles.statusSub}>Order confirmed Aug 12</Text>
            </View>
          </View>

          {/* Stepper */}
          <View style={styles.stepper}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.label}>
                <View style={styles.stepCol}>
                  <View style={[
                    styles.node,
                    s.state === 'done' && styles.nodeDone,
                    s.state === 'current' && styles.nodeCurrent,
                  ]}>
                    {s.state === 'done' && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>
                  <Text style={[styles.stepLabel, s.state === 'current' && styles.stepLabelCurrent]}>{s.label}</Text>
                  {s.sub ? <Text style={styles.stepSub}>{s.sub}</Text> : null}
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[styles.line, s.state === 'done' ? styles.lineDone : null]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Map */}
        <Text style={styles.sectionTitle}>Tracking details</Text>
        <View style={styles.mapCard}>
          <View style={styles.mapDot} />
          <View style={styles.mapLine} />
          <View style={styles.mapChip}><Text style={styles.mapChipText}>Lagos Customs</Text></View>
        </View>
        <Text style={styles.mapSub}>Last update: Lagos Customs · 2h ago</Text>

        {/* Contents */}
        <Text style={styles.sectionTitle}>Package contents</Text>
        <View style={styles.card}>
          {ITEMS.map((it, i) => (
            <View key={it.name} style={[styles.lineRow, i === ITEMS.length - 1 && { marginBottom: 0 }]}>
              <View style={styles.lineThumb}>
                <Ionicons name={it.icon} size={18} color={COLORS.navy} />
              </View>
              <Text style={styles.lineName} numberOfLines={1}>{it.name}</Text>
              <Text style={styles.linePrice}>₦{it.price.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Courier */}
        <Text style={styles.sectionTitle}>Courier</Text>
        <View style={styles.card}>
          <View style={styles.courierRow}>
            <View style={styles.courierLogo}><Text style={styles.courierLogoText}>SPEEDAF</Text></View>
            <Text style={styles.courierName}>SPEEDAF Express</Text>
            <Text style={styles.courierId}>SPD-9921</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button variant="outline" title="Contact Courier" style={styles.barBtn} onPress={() => {}} />
        <Button variant="navy" title="Track on Map" style={styles.barBtn} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: { ...CARD, marginHorizontal: 20, marginBottom: 14, padding: 16 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  statusIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.orangeSoft, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  statusTitle: { fontSize: 17, fontWeight: '800', color: COLORS.navy },
  statusSub: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'flex-start' },
  stepCol: { alignItems: 'center', width: 62 },
  node: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.surface, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  nodeDone: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  nodeCurrent: { backgroundColor: COLORS.gold, borderColor: COLORS.gold, ...SHADOW.glowGold },
  line: { flex: 1, height: 2, backgroundColor: COLORS.border, marginTop: 12, marginHorizontal: -8 },
  lineDone: { backgroundColor: COLORS.navy },
  stepLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textLight, marginTop: 8, textAlign: 'center' },
  stepLabelCurrent: { color: COLORS.gold, fontWeight: '800', textTransform: 'uppercase' },
  stepSub: { fontSize: 9, color: COLORS.textMuted, marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy, paddingHorizontal: 20, marginTop: 10, marginBottom: 10 },
  mapCard: { marginHorizontal: 20, height: 150, borderRadius: 16, backgroundColor: '#5C7186', justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  mapDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#5C7186' },
  mapLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.8)', marginHorizontal: 6 },
  mapChip: { backgroundColor: COLORS.surface, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  mapChipText: { fontSize: 10, fontWeight: '700', color: COLORS.navy },
  mapSub: { fontSize: 12, color: COLORS.textLight, paddingHorizontal: 20, marginTop: 8 },
  lineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  lineThumb: { width: 44, height: 44, borderRadius: 10, backgroundColor: COLORS.imageBg, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  lineName: { flex: 1, fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  linePrice: { fontSize: 13, fontWeight: '700', color: COLORS.navy },
  courierRow: { flexDirection: 'row', alignItems: 'center' },
  courierLogo: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, marginRight: 10 },
  courierLogoText: { fontSize: 9, fontWeight: '900', color: '#E4322B' },
  courierName: { flex: 1, fontSize: 14, fontWeight: '700', color: COLORS.navy },
  courierId: { fontSize: 12, color: COLORS.textLight },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  barBtn: { flex: 1, marginHorizontal: 6 },
});

export default OrderTrackingScreen;
