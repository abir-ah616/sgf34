import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament, SlotEntry } from '@/context/TournamentContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Facebook, Instagram, Youtube } from 'lucide-react-native';

export const SlotGrid: React.FC = () => {
  const { slots, meta, socialTags } = useTournament();

  const rows = [];
  for (let i = 0; i < slots.length; i += 2) {
    rows.push(slots.slice(i, i + 2));
  }

  return (
    <GlassContainer style={styles.container} intensity={20}>
      <View style={styles.header}>
        <View style={styles.weekDayContainer}>
          <Text style={styles.weekDay}>Week {meta.week} Day {meta.day}</Text>
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.hostName}>{meta.hostName}</Text>
          <Text style={styles.subtitle}>{meta.subtitle}</Text>
          <View style={styles.divider} />
          <View style={styles.slotListContainer}>
            <Text style={styles.title}>SLOT LIST</Text>
          </View>
        </View>
        
        {meta.showLogo && meta.logoUrl && (
          <Image source={{ uri: meta.logoUrl }} style={styles.logo} />
        )}
      </View>
      
      <ScrollView style={styles.slotGrid}>
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.slotRow}>
            {row.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </View>
        ))}
      </ScrollView>
      
      {socialTags.showSocial && (
        <View style={styles.socialContainer}>
          <View style={styles.socialContent}>
            {socialTags.facebook && (
              <View style={styles.socialItem}>
                <Facebook color="#ffffff" size={20} />
                <Text style={styles.socialText}>{socialTags.facebook}</Text>
              </View>
            )}
            {socialTags.instagram && (
              <View style={styles.socialItem}>
                <Instagram color="#ffffff" size={20} />
                <Text style={styles.socialText}>{socialTags.instagram}</Text>
              </View>
            )}
            {socialTags.youtube && (
              <View style={styles.socialItem}>
                <Youtube color="#ffffff" size={20} />
                <Text style={styles.socialText}>{socialTags.youtube}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </GlassContainer>
  );
};

const SlotCard: React.FC<{ slot: SlotEntry }> = ({ slot }) => {
  return (
    <Animated.View 
      entering={FadeIn.delay(slot.number * 50).springify()}
      style={styles.slotCard}
    >
      <LinearGradient
        colors={['rgba(64, 224, 255, 0.2)', 'rgba(64, 224, 255, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.slotContent}
      >
        <View style={styles.slotInfo}>
          <View style={styles.slotNumberContainer}>
            <Text style={styles.slotNumber}>#{String(slot.number).padStart(2, '0')}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.teamContainer}>
            {slot.logo ? (
              <Image source={{ uri: slot.logo }} style={styles.teamLogo} />
            ) : (
              <View style={styles.logoPlaceholder} />
            )}
            <Text style={styles.teamName} numberOfLines={1}>
              {slot.name}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 12, 24, 0.4)',
    borderColor: 'rgba(64, 224, 255, 0.1)',
    borderWidth: 1,
  },
  header: {
    padding: 20,
  },
  weekDayContainer: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  weekDay: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 12,
    color: 'rgba(64, 224, 255, 0.7)',
  },
  titleContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  hostName: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 24,
    color: '#40E0FF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 16,
    color: 'rgba(64, 224, 255, 0.7)',
    marginTop: 4,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(64, 224, 255, 0.3)',
    marginVertical: 16,
  },
  slotListContainer: {
    backgroundColor: 'rgba(64, 224, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 20,
    color: '#40E0FF',
    textAlign: 'center',
    textShadowColor: 'rgba(64, 224, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  slotGrid: {
    flex: 1,
    padding: 12,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  slotCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  slotContent: {
    padding: 12,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotNumberContainer: {
    width: 40,
    alignItems: 'center',
  },
  slotNumber: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 12,
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(64, 224, 255, 0.3)',
    marginHorizontal: 8,
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  logoPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(64, 224, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  teamName: {
    fontFamily: 'Orbitron-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  socialContainer: {
    backgroundColor: 'rgba(64, 224, 255, 0.05)',
    borderTopWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
    padding: 16,
    marginTop: 16,
  },
  socialContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  socialText: {
    fontFamily: 'Exo-Regular',
    fontSize: 14,
    color: '#ffffff',
  },
});