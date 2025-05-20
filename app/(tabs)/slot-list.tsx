import React from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderComponent } from '@/components/HeaderComponent';
import { FooterComponent } from '@/components/FooterComponent';
import { SlotGrid } from '@/components/SlotGrid';

export default function SlotListScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://files.catbox.moe/yt2t9h.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <HeaderComponent variant="slots" />
          <SlotGrid />
          <FooterComponent />
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
});