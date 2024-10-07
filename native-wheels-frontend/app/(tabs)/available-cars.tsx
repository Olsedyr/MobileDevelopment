import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { Car } from "@/axios/cars/types"
import { fetchCars } from "@/axios/cars/api"
import { CarBanner } from "@/components/cars/CarBanner"
import { useFocusEffect } from "@react-navigation/native"

export default function AvailableCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string | null>(null)

  useFocusEffect(
    useCallback(() => {
      const loadCars = async () => {
        try {
          const carData = await fetchCars()
          const availableCars = carData.filter((car) => car.available)
          setCars(availableCars)
        } catch (err) {
          console.error("Error fetching cars:", err)
        }
      }

      loadCars()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cars</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView contentContainerStyle={styles.carList}>
        {cars.length === 0 && <Text>No cars currently available.</Text>}
        {cars.map((car) => (
          <View key={car._id} style={styles.carBannerContainer}>
            <CarBanner car={car} clickable={true} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  carList: {
    alignItems: "center",
  },
  carBannerContainer: {
    marginBottom: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
})
