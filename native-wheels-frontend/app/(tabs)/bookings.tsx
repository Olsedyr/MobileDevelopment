import { StyleSheet, Image, Alert, View, Text } from "react-native"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { getBookings } from "@/axios/booking/api"
import { getBookingHistory } from "@/axios/bookingHistory/api"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { Booking } from "@/axios/booking/types"
import { BookingHistory } from "@/axios/bookingHistory/types"
import { CarBanner } from "@/components/cars/CarBanner"

export default function BookingScreen() {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([])
  const [completedBookings, setCompletedBookings] = useState<BookingHistory[]>(
    []
  )

  const headerImage = require("@/assets/images/homepage-header.jpg")

  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        try {
          const bookingData = await getBookings()
          setCurrentBookings(bookingData)
        } catch (error: any) {
          console.error("Error fetching bookings:", error)
        }
      }

      const loadBookingHistory = async () => {
        try {
          const historyData = await getBookingHistory()
          setCompletedBookings(historyData)
        } catch (error: any) {
          console.error("Error fetching booking history:", error)
        }
      }

      const fetchBookings = async () => {
        await loadBookings()
        setTimeout(() => {
          loadBookingHistory()
        }, 1000) // Delay fetching booking history in order for the backend to take care of potential expired bookings
      }

      fetchBookings()
    }, [])
  )

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Image source={headerImage} style={styles.headerImage} />}
    >
      <Text style={styles.title}>Active Bookings</Text>

      {currentBookings.length > 0 ? (
        currentBookings.map((booking) => (
          <CarBanner
            key={booking._id}
            car={booking.carId}
            booking={booking}
            clickable={false}
          />
        ))
      ) : (
        <Text>No active bookings.</Text>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Previous Bookings</Text>
      </View>

      {completedBookings.length > 0 ? (
        completedBookings.map((bookingHistory) => (
          <CarBanner
            key={bookingHistory._id}
            car={bookingHistory.carId}
            bookingHistory={bookingHistory}
            clickable={false}
          />
        ))
      ) : (
        <Text>No previous bookings.</Text>
      )}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bookingItem: {
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
})
