import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament, SlotEntry } from '@/context/TournamentContext';
import { GlassButton } from './GlassButton';
import { Upload } from 'lucide-react-native';

export const EditSlots: React.FC = () => {
  const { slots, updateSlot } = useTournament();

  const handleSlotUpdate = (slotId: string, field: keyof SlotEntry, value: string | number) => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot) return;
    
    updateSlot({
      ...slot,
      [field]: value,
    });
  };
  
  return (
    <GlassContainer style={styles.container} intensity={60}>
      <Text style={styles.title}>Slot List Editor</Text>
      
      <ScrollView style={styles.slotList}>
        {slots.map((slot) => (
          <View key={slot.id} style={styles.slotRow}>
            <View style={styles.slotNumber}>
              <Text style={styles.slotNumberText}>Slot #{slot.number}</Text>
            </View>
            
            <View style={styles.slotDetails}>
              <View style={styles.logoContainer}>
                <TouchableOpacity style={styles.logoPlaceholder}>
                  {slot.logo ? (
                    <Image source={{ uri: slot.logo }} style={styles.logo} />
                  ) : (
                    <View style={styles.uploadBox}>
                      <Upload color="#ffffff" size={16} />
                      <Text style={styles.uploadText}>Upload</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              
              <View style={styles.nameContainer}>
                <TextInput
                  style={styles.input}
                  value={slot.name}
                  onChangeText={(text) => handleSlotUpdate(slot.id, 'name', text)}
                  placeholder="Team Name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <GlassButton
          title="Save Changes"
          onPress={() => {}}
          gradientColors={['#4e54c8', '#8f94fb']}
        />
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Orbitron-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  slotList: {
    flex: 1,
  },
  slotRow: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  slotNumber: {
    backgroundColor: 'rgba(78, 84, 200, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  slotNumberText: {
    fontFamily: 'Orbitron-Medium',
    fontSize: 14,
    color: '#ffffff',
  },
  slotDetails: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 10,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  uploadBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'Exo-Regular',
    fontSize: 10,
    color: '#ffffff',
    marginTop: 2,
  },
  nameContainer: {
    flex: 1,
  },
  input: {
    color: '#ffffff',
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonContainer: {
    marginTop: 16,
  },
});