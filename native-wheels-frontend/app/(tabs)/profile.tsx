import { StyleSheet, Image, Alert, View, Text } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api';
import { getBookingHistory } from '@/axios/bookingHistory/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Booking } from '@/axios/booking/types';
import { BookingHistory } from '@/axios/bookingHistory/types';
import { CarBanner } from '@/components/cars/CarBanner';
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

            bookingData.forEach(async (booking) => {
              const currentDate = new Date();
              const toBookingDate = new Date(booking.toBookingDate);

              if (currentDate >= toBookingDate && booking.status !== 'completed') {
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

  const completeBooking = async (bookingId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.get('http://localhost:8080/api/booking-history');

      setCurrentBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      const completedBooking = currentBookings.find((booking) => booking._id === bookingId);
      if (completedBooking) {
        setCompletedBookings((prev) => [...prev, { ...completedBooking, status: 'completed' }]);
      }

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile Page</Text>
        </View>

        <Text style={styles.title}>Current Bookings</Text>

        {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
                <CarBanner key={booking._id} car={booking.carId} clickable={false} />
            ))
        ) : (
            <Text>No current bookings available</Text>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Booking History</Text>
        </View>

        {completedBookings.length > 0 ? (
            completedBookings.map((bookingHistory) => (
                bookingHistory.carId && typeof bookingHistory.carId === 'object' ? (
                    <CarBanner key={bookingHistory._id} car={bookingHistory.carId} clickable={false} />
                ) : (
                    <Text key={bookingHistory._id}>Car details not available</Text>
                )
            ))
        ) : (
            <Text>No booking history available</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
