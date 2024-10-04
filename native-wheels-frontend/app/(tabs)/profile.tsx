import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBookings } from '@/axios/booking/api';
import { getBookingHistory } from '@/axios/bookingHistory/api'; // Import your new API function
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CarBanner } from '@/components/cars/CarBanner';
import { Booking } from '@/axios/booking/types';
import { BookingHistory } from '@/axios/bookingHistory/types'; // Import your BookingHistory type

export default function ProfileScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]); // State for booking history
  const [error, setError] = useState<string | null>(null);

  const headerImage = require('@/assets/images/homepage-header.jpg');

  useFocusEffect(
      useCallback(() => {
        const loadBookingsAndHistory = async () => {
          try {
            const bookingData = await getBookings();
            setBookings(bookingData);

            const historyData = await getBookingHistory(); // Fetch booking history
            setBookingHistory(historyData); // Set booking history data
          } catch (error: any) {
            console.error('Error fetching bookings:', error);
            setError(error.message);
          }
        };

        loadBookingsAndHistory();
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
                  <CarBanner car={booking.carId} /> {/* CarBanner component */}
                </ThemedView>
            ))
        ) : (
            <ThemedText>No current bookings available</ThemedText>
        )}

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Booking History</ThemedText>
        </ThemedView>
        {bookingHistory.length > 0 ? (
            bookingHistory.map((history) => (
                <ThemedView key={history._id} style={styles.bookingItem}>
                  <CarBanner car={history.carId} /> {/* CarBanner component */}
                  <ThemedText>From: {history.fromBookingDate}</ThemedText>
                  <ThemedText>To: {history.toBookingDate}</ThemedText>
                  <ThemedText>Completed At: {history.completedAt}</ThemedText>
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
    height: "100%",
    width: "100%",
    resizeMode: "cover",
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
