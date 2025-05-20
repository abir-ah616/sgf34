import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table2, List, Settings, Facebook, Instagram, Globe } from 'lucide-react-native';
import { GlassButton } from '@/components/GlassButton';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/mroppy69', color: '#1877F2' },
    { icon: Instagram, url: 'https://instagram.com/mroppy21', color: '#E4405F' },
    { icon: Globe, url: 'https://mroppy.xyz', color: '#40E0FF' },
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://files.catbox.moe/yt2t9h.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Animated.View 
            entering={FadeInDown.delay(200).springify()}
            style={styles.header}
          >
            <LinearGradient
              colors={['rgba(64, 224, 255, 0.2)', 'rgba(78, 84, 200, 0.2)']}
              style={styles.titleGradient}
            >
              <Text style={styles.title}>Point Table Maker</Text>
            </LinearGradient>
            <Text style={styles.subtitle}>Create Beautiful Tournament Tables</Text>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInUp.delay(400).springify()}
            style={styles.buttonContainer}
          >
            <GlassButton
              title="Point Table"
              onPress={() => router.push('/point-table')}
              icon={<Table2 color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
              style={styles.button}
            />
            
            <GlassButton
              title="Slot List"
              onPress={() => router.push('/slot-list')}
              icon={<List color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
              style={styles.button}
            />
            
            <GlassButton
              title="Editor Dashboard"
              onPress={() => router.push('/editor')}
              icon={<Settings color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
              style={styles.button}
            />
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(600).springify()}
            style={styles.socialContainer}
          >
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialButton}
                onPress={() => Linking.openURL(link.url)}
              >
                <LinearGradient
                  colors={[link.color, `${link.color}80`]}
                  style={styles.socialGradient}
                >
                  <link.icon color="#ffffff" size={24} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(800).springify()}
            style={styles.footer}
          >
            <Text style={styles.footerText}>Made with ❤️ by </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://mroppy.xyz')}>
              <Text style={styles.footerLink}>MR. OPPY</Text>
            </TouchableOpacity>
          </Animated.View>
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
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 36,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(64, 224, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: 'Exo-Medium',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    maxWidth: 400,
  },
  buttonIcon: {
    marginRight: 8,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
  },
  socialButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  socialGradient: {
    padding: 15,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontFamily: 'Exo-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
  footerLink: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    color: '#40E0FF',
    textDecorationLine: 'underline',
  },
});