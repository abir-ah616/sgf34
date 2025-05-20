import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament, Team } from '@/context/TournamentContext';
import { GlassButton } from './GlassButton';
import { Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export const EditTeam: React.FC = () => {
  const { teams, updateTeam } = useTournament();
  
  const validateNumber = (text: string): number => {
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    return isNaN(number) ? 0 : number;
  };
  
  const handleTeamUpdate = (teamId: string, field: keyof Team, value: string | number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;
    
    let updatedValue = value;
    
    if (field === 'wins' || field === 'pp' || field === 'kp') {
      updatedValue = validateNumber(value.toString());
    }
    
    updateTeam({
      ...team,
      [field]: updatedValue,
    });
  };

  const pickImage = async (teamId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      handleTeamUpdate(teamId, 'logo', result.assets[0].uri);
    }
  };
  
  return (
    <GlassContainer style={styles.container} intensity={60}>
      <Text style={styles.title}>Point Table Editor</Text>
      
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.logoCell]}>Logo</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>Team Name</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>Wins</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>PP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>KP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>Total</Text>
      </View>
      
      <ScrollView style={styles.tableBody}>
        {teams.map((team) => (
          <View key={team.id} style={styles.teamRow}>
            <View style={[styles.cell, styles.logoCell]}>
              <TouchableOpacity 
                style={styles.logoPlaceholder}
                onPress={() => pickImage(team.id)}
              >
                {team.logo ? (
                  <Image source={{ uri: team.logo }} style={styles.logo} />
                ) : (
                  <View style={styles.uploadBox}>
                    <Upload color="#ffffff" size={16} />
                    <Text style={styles.uploadText}>Upload</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={[styles.cell, styles.nameCell]}>
              <TextInput
                style={styles.input}
                value={team.name}
                onChangeText={(text) => handleTeamUpdate(team.id, 'name', text)}
                placeholder="Team Name"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.wins.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'wins', text)}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.pp.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'pp', text)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.kp.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'kp', text)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <Text style={styles.totalText}>{team.total}</Text>
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
    fontSize: Platform.OS === 'web' ? 'min(20px, 3.5vw)' : 20,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerCell: {
    fontFamily: 'Orbitron-Medium',
    color: '#ffffff',
    fontSize: Platform.OS === 'web' ? 'min(14px, 2.5vw)' : 14,
  },
  tableBody: {
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  cell: {
    padding: 4,
  },
  logoCell: {
    width: '15%',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  uploadBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'Exo-Regular',
    fontSize: 8,
    color: '#ffffff',
    marginTop: 2,
  },
  nameCell: {
    width: '35%',
  },
  dataCell: {
    width: '12.5%',
    alignItems: 'center',
  },
  input: {
    color: '#ffffff',
    fontFamily: 'Exo-Medium',
    fontSize: Platform.OS === 'web' ? 'min(14px, 2.5vw)' : 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    textAlign: 'center',
  },
  totalText: {
    color: '#ffffff',
    fontFamily: 'Exo-SemiBold',
    fontSize: Platform.OS === 'web' ? 'min(14px, 2.5vw)' : 14,
    textAlign: 'center',
    padding: 4,
    backgroundColor: 'rgba(78, 84, 200, 0.3)',
    borderRadius: 8,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  },
});