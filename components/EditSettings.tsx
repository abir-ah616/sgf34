import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch, ScrollView } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament } from '@/context/TournamentContext';
import { GlassButton } from './GlassButton';

export const EditSettings: React.FC = () => {
  const { meta, socialTags, updateMeta, updateSocialTags } = useTournament();
  
  const handleMetaChange = (field: string, value: any) => {
    updateMeta({ [field]: value });
  };
  
  const handleSocialChange = (field: string, value: any) => {
    updateSocialTags({ [field]: value });
  };
  
  return (
    <GlassContainer style={styles.container} intensity={60}>
      <Text style={styles.title}>General Settings</Text>
      
      <ScrollView style={styles.settingsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tournament Information</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Week</Text>
            <TextInput
              style={styles.input}
              value={meta.week.toString()}
              onChangeText={(text) => {
                const week = parseInt(text.replace(/[^0-9]/g, ''));
                handleMetaChange('week', isNaN(week) ? 1 : week);
              }}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Day</Text>
            <TextInput
              style={styles.input}
              value={meta.day.toString()}
              onChangeText={(text) => {
                const day = parseInt(text.replace(/[^0-9]/g, ''));
                handleMetaChange('day', isNaN(day) ? 1 : day);
              }}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Host Name</Text>
            <TextInput
              style={styles.input}
              value={meta.hostName}
              onChangeText={(text) => handleMetaChange('hostName', text)}
              placeholder="Host Name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Subtitle</Text>
            <TextInput
              style={styles.input}
              value={meta.subtitle}
              onChangeText={(text) => handleMetaChange('subtitle', text)}
              placeholder="Subtitle"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show Host Info</Text>
            <Switch
              value={meta.showHostInfo}
              onValueChange={(value) => handleMetaChange('showHostInfo', value)}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(78, 84, 200, 0.7)' }}
              thumbColor={meta.showHostInfo ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show Logo</Text>
            <Switch
              value={meta.showLogo}
              onValueChange={(value) => handleMetaChange('showLogo', value)}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(78, 84, 200, 0.7)' }}
              thumbColor={meta.showLogo ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Logo URL</Text>
            <TextInput
              style={styles.input}
              value={meta.logoUrl || ''}
              onChangeText={(text) => handleMetaChange('logoUrl', text)}
              placeholder="Logo URL"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show Social Tags</Text>
            <Switch
              value={socialTags.showSocial}
              onValueChange={(value) => handleSocialChange('showSocial', value)}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(78, 84, 200, 0.7)' }}
              thumbColor={socialTags.showSocial ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Facebook</Text>
            <TextInput
              style={styles.input}
              value={socialTags.facebook}
              onChangeText={(text) => handleSocialChange('facebook', text)}
              placeholder="Facebook"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={socialTags.instagram}
              onChangeText={(text) => handleSocialChange('instagram', text)}
              placeholder="Instagram"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>YouTube</Text>
            <TextInput
              style={styles.input}
              value={socialTags.youtube}
              onChangeText={(text) => handleSocialChange('youtube', text)}
              placeholder="YouTube"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <GlassButton
          title="Save Settings"
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
  settingsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Orbitron-Medium',
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    backgroundColor: 'rgba(78, 84, 200, 0.3)',
    padding: 8,
    borderRadius: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  settingLabel: {
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    color: '#ffffff',
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
    flex: 2,
  },
  buttonContainer: {
    marginTop: 16,
  },
});