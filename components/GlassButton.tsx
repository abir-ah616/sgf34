import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  title, 
  onPress, 
  icon, 
  style, 
  textStyle,
  gradientColors = ['#4e54c8', '#8f94fb']
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.9);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const gradientStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    opacity.value = withTiming(1, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    opacity.value = withTiming(0.9, { duration: 200 });
  };
  
  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.buttonContainer, style, animatedStyles]}
    >
      <AnimatedLinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, gradientStyles]}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.button}
      >
        {icon}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20, 20, 40, 0.5)',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Exo-SemiBold',
    fontSize: 16,
    marginLeft: 8,
    textAlign: 'center',
  },
});