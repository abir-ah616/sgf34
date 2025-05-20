import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlassContainer } from './GlassContainer';

interface HeaderComponentProps {
  variant?: 'home' | 'points' | 'slots';
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ variant = 'home' }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Point Table Maker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 28,
    color: '#40E0FF',
    textAlign: 'center',
    textShadowColor: 'rgba(64, 224, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});