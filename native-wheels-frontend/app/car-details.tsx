import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { fetchCar } from "@/axios/cars/api"
import { createBooking } from "@/axios/booking/api"
import CarDetailsInfo from "@/components/booking/CarDetails"
import DateTimePickerComp from "@/components/booking/DateTimePickerComp"
import { Car } from "@/axios/cars/types"
import StyledButton from "@/components/StyledButton"
import { Ionicons } from "@expo/vector-icons"
import { showErrorToast, showSuccessToast } from "@/components/toast"

export default function CarDetails() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  )
  const route = useRoute()
  const navigation = useNavigation()
  const { carId } = route.params

  const [car, setCar] = useState<Car | null>(null)

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        const car = await fetchCar(carId)
        setCar(car)
      } catch (err) {
        console.error("Error fetching car details:", err)
      }
    }

    loadCarDetails()
  }, [carId, startDate, endDate])

  useEffect(() => {
    navigation.setOptions({
      title: ` `,
      headerBackTitle: "Back",
    })
  }, [navigation])

  const handleBooking = async () => {
    try {
      await createBooking(carId, startDate, endDate)
      navigation.navigate("available-cars")
      showSuccessToast("Booking confirmed", "Your booking has been confirmed!")
    } catch (error) {
      console.error("Error confirming booking:", error)
    }
  }

  if (!car) {
    return
  }

  return (
    <View style={styles.container}>
      <CarDetailsInfo car={car} />
      <DateTimePickerComp setStartDate={setStartDate} setEndDate={setEndDate} />

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Place Booking"
          icon={<Ionicons name="calendar" />}
          onPress={async () => {
            await handleBooking()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: -15,
    marginRight: 10,
    marginLeft: 10,
  },
})
