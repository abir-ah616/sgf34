import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table2, List, Settings } from 'lucide-react-native';
import { GlassContainer } from '@/components/GlassContainer';
import { EditTeam } from '@/components/EditTeam';
import { EditSlots } from '@/components/EditSlots';
import { EditSettings } from '@/components/EditSettings';

export default function EditorScreen() {
  const [activeTab, setActiveTab] = useState<'points' | 'slots' | 'settings'>('points');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'points':
        return <EditTeam />;
      case 'slots':
        return <EditSlots />;
      case 'settings':
        return <EditSettings />;
      default:
        return null;
    }
  };
  
  return (
    <ImageBackground
      source={{ uri: 'https://files.catbox.moe/yt2t9h.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Editor Dashboard</Text>
          
          <GlassContainer style={styles.tabContainer} intensity={40}>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'points' && styles.activeTab]}
                onPress={() => setActiveTab('points')}
              >
                <Table2 color="#ffffff" size={20} style={styles.tabIcon} />
                <Text style={styles.tabText}>Points</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, activeTab === 'slots' && styles.activeTab]}
                onPress={() => setActiveTab('slots')}
              >
                <List color="#ffffff" size={20} style={styles.tabIcon} />
                <Text style={styles.tabText}>Slots</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
                onPress={() => setActiveTab('settings')}
              >
                <Settings color="#ffffff" size={20} style={styles.tabIcon} />
                <Text style={styles.tabText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </GlassContainer>
          
          {renderTabContent()}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(78, 84, 200, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tabContainer: {
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4e54c8',
    backgroundColor: 'rgba(78, 84, 200, 0.2)',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontFamily: 'Exo-Medium',
    color: '#ffffff',
    fontSize: 14,
  },
});