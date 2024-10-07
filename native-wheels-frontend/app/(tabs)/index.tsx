import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { getUserInfo } from '@/axios/auth/api';
import StyledButton from '@/components/StyledButton';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUsername(userInfo.username);
    };

    fetchUserInfo();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/homepage-header.jpg')}
          style={styles.header}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleText}>
          Welcome {username}! <HelloWave />
        </ThemedText>
        <ThemedText>
          This is Native Wheels! Discover the perfect vehicle for your journey.
          Whether you’re planning a road trip or need a ride for the day, we’ve
          got you covered.
        </ThemedText>

        <View style={{ marginTop: 16 }}>
          <StyledButton
            title="Show Available Cars"
            onPress={() => navigation.navigate('available-cars')}
            icon={<Ionicons name="car" />}
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 50,
  },
  header: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
});
