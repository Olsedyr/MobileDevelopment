import { StyleSheet, Image, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Booking } from '@/axios/booking/types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

            // Automatically complete bookings where the toBookingDate has passed
            bookingData.forEach(async (booking) => {
              const currentDate = new Date();
              const toBookingDate = new Date(booking.toBookingDate);

              if (currentDate >= toBookingDate && booking.status !== 'completed') {
                // Complete the booking if the toBookingDate has passed
                await completeBooking(booking._id);
              }
            });
          } catch (error: any) {
            console.error('Error fetching bookings:', error);
            setError(error.message);
          }
        };

        loadBookings();
      }, [])
  );

  // Function to complete a booking with Authorization Header
  const completeBooking = async (bookingId: string) => {
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token'); // Changed from 'authToken' to 'token'
      console.log('Retrieved token:', token); // Debug log

      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make the request to complete the booking, with the token in the Authorization header
      await axios.post(
          'http://localhost:8080/api/booking-history/complete-booking',
          { bookingId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
      );

      // Notify the user of success
      Alert.alert('Success', 'Booking completed successfully!');
    } catch (error) {
      console.error('Error completing booking:', error.response ? error.response.data : error);
      Alert.alert('Error', 'Failed to complete booking.');
    }
  };


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
                  <ThemedText>Car: {booking.carId}</ThemedText>
                  <ThemedText>From: {new Date(booking.fromBookingDate).toLocaleDateString()}</ThemedText>
                  <ThemedText>To: {new Date(booking.toBookingDate).toLocaleDateString()}</ThemedText>

                  {/* Display the booking status */}
                  {booking.status === 'completed' ? (
                      <ThemedText>Status: Completed</ThemedText>
                  ) : (
                      <ThemedText>Status: Active</ThemedText>
                  )}
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
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
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
