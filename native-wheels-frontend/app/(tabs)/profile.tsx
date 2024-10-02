import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api'; // Adjust the import path according to your project structure

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CarBanner } from '@/components/cars/CarBanner'; // Adjust the import path according to your project structure

type Booking = {
  _id: string;
  carId: {
    model: string;
    make: string;
    year: number;
    price: number;
    imageUrl: string;
  };
  fromBookingDate: string;
  toBookingDate: string;
};


export default function ProfileScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const headerImage = require('@/assets/images/homepage-header.jpg');

  useFocusEffect(
      useCallback(() => {
        const loadBookings = async () => {
          try {
            const bookingData = await getBookings(); // Use the getBookings function here
            setBookings(bookingData);
          } catch (error: any) {
            console.error('Error fetching bookings:', error);
            setError(error.message); // Use error.message to get a user-friendly message
          }
        };

        loadBookings();
      }, [])
  );

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={<Image source={headerImage} style={styles.headerImage} />} // Use Image component to display the header image
      >

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile Page</ThemedText>
        </ThemedView>

        <ThemedText type="title">Current Bookings</ThemedText>
        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>} {}
        {bookings.length > 0 ? (
            bookings.map((booking) => (
                <CarBanner key={booking._id} car={booking.carId} />
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
