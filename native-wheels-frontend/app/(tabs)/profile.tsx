import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CarBanner } from '@/components/cars/CarBanner';
import { Booking } from '@/axios/booking/types';




export default function ProfileScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const headerImage = require('@/assets/images/homepage-header.jpg');

  useFocusEffect(
      useCallback(() => {
        const loadBookings = async () => {
          try {
            const bookingData = await getBookings();
            setBookings(bookingData);
          } catch (error: any) {
            console.error('Error fetching bookings:', error);
            setError(error.message);
          }
        };

        loadBookings();
      }, [])
  );

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={<Image source={headerImage} style={styles.headerImage} />}
      >

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile Page</ThemedText>
        </ThemedView>

        <ThemedText type="title">Current Bookings</ThemedText>
        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        {bookings.length > 0 ? (
            bookings.map((booking) => (
                <ThemedView key={booking._id} style={styles.bookingItem}>
                  <CarBanner car={booking.carId} />  {/* CarBanner component */}
                </ThemedView>
            ))
        ) : (
            <ThemedText>No current bookings available</ThemedText>
        )}

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Booking History</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
    width: "105%"
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  bookingItem: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
