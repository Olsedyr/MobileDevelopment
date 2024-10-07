import { Car } from "@/axios/cars/types"
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const CarDetailsInfo: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
      <Text style={styles.title}>{`${car.make} ${car.model} ${car.year}`}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{`DKK ${car.price}`}</Text>
        <Text style={styles.pricePerDay}>per day</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="speedometer" size={24} color="black" />
        <Text style={styles.details}>{`${car.horsePower} HP`}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialCommunityIcons name="engine" size={24} color="black" />
        <Text style={styles.details}>{`${car.cylinders} cylinders`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",

    borderRadius: 10,
    elevation: 3,
  },
  carImage: {
    width: 400,
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  pricePerDay: {
    fontSize: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  details: {
    fontSize: 18,
    marginLeft: 8,
    textAlign: "center",
  },
})

export default CarDetailsInfo
