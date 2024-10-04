import { StyleSheet, Image, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api';
import { getBookingHistory } from '@/axios/bookingHistory/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Booking } from '@/axios/booking/types';
import { BookingHistory } from '@/axios/bookingHistory/types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<BookingHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const headerImage = require('@/assets/images/homepage-header.jpg');

  useFocusEffect(
      useCallback(() => {
        const loadBookings = async () => {
          try {
            const bookingData = await getBookings();
            setCurrentBookings(bookingData);

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

        const loadBookingHistory = async () => {
          try {
            const historyData = await getBookingHistory();
            setCompletedBookings(historyData);
          } catch (error: any) {
            console.error('Error fetching booking history:', error);
            setError(error.message);
          }
        };

        loadBookings();
        loadBookingHistory();
      }, [])
  );

  // Function to complete a booking with Authorization Header
  const completeBooking = async (bookingId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', token);

      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.post(
          'http://localhost:8080/api/booking-history/complete-booking',
          { bookingId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      // Move booking from currentBookings to completedBookings
      setCurrentBookings(prev => prev.filter(booking => booking._id !== bookingId));
      const completedBooking = currentBookings.find(booking => booking._id === bookingId);
      if (completedBooking) {
        setCompletedBookings(prev => [...prev, { ...completedBooking, status: 'completed' }]);
      }

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

        {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
                <ThemedView key={booking._id} style={styles.bookingItem}>
                  <ThemedText>Car: {booking.carId.make} {booking.carId.model}</ThemedText>
                  <ThemedText>From: {new Date(booking.fromBookingDate).toLocaleDateString()}</ThemedText>
                  <ThemedText>To: {new Date(booking.toBookingDate).toLocaleDateString()}</ThemedText>
                </ThemedView>
            ))
        ) : (
            <ThemedText>No current bookings available</ThemedText>
        )}

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Booking History</ThemedText>
        </ThemedView>
        {completedBookings.length > 0 ? (
            completedBookings.map((bookingHistory) => (
                <ThemedView key={bookingHistory._id} style={styles.bookingItem}>
                  <ThemedText>Car: {bookingHistory.carId.make} {bookingHistory.carId.model}</ThemedText>
                  <ThemedText>Completed On: {new Date(bookingHistory.toBookingDate).toLocaleDateString()}</ThemedText>
                </ThemedView>
            ))
        ) : (
            <ThemedText>No booking history available</ThemedText>
        )}
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
