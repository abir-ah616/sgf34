import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { GlassContainer } from './GlassContainer';

export const FooterComponent: React.FC = () => {
  return (
    <GlassContainer style={styles.footer} intensity={30}>
      <View style={styles.content}>
        <Text style={styles.text}>Developed by </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://mroppy.xyz')}>
          <Text style={styles.link}>MR. OPPY</Text>
        </TouchableOpacity>
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Exo-Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  link: {
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    color: '#40E0FF',
    textDecorationLine: 'underline',
  },
});