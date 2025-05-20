import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'default' | 'light' | 'dark';
  neonBorder?: boolean;
  neonColor?: string[];
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  style,
  intensity = 60,
  tint = 'dark',
  neonBorder = false,
  neonColor = ['#4776E6', '#8E54E9'],
}) => {
  return (
    <View style={[styles.container, style]}>
      {neonBorder && (
        <LinearGradient
          colors={neonColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.neonBorder}
        />
      )}
      <BlurView intensity={intensity} tint={tint} style={styles.blurView}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
  },
  blurView: {
    padding: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  neonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    margin: -2,
    zIndex: -1,
  },
});