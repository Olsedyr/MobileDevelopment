import React from "react"
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Car } from "@/axios/cars/types"
import { Booking } from "@/axios/booking/types"
import { BookingHistory } from "@/axios/bookingHistory/types"
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons"

interface CarBannerProps {
  car?: Car
  booking?: Booking
  bookingHistory?: BookingHistory
  clickable?: boolean
}

export const CarBanner: React.FC<CarBannerProps> = ({
  car,
  booking,
  bookingHistory,
  clickable = true,
}) => {
  const navigation = useNavigation()

  const item = car || booking?.carId || bookingHistory?.carId
  const fromBookingDate =
    booking?.fromBookingDate || bookingHistory?.fromBookingDate
  const toBookingDate = booking?.toBookingDate || bookingHistory?.toBookingDate

  if (!item) {
    return null
  }

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const Content = (
    <>
      <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{`${item.make} ${item.model}`}</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="pricetag" size={16} color="black" />
          <Text style={styles.iconText}>{`${item.price} DKK per day`}</Text>
        </View>
        {!fromBookingDate && !toBookingDate && (
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={16} color="black" />
            <Text style={styles.iconText}>{`${item.year}`}</Text>
          </View>
        )}
        {fromBookingDate && toBookingDate && (
          <View>
            <View style={styles.iconContainer}>
              <MaterialIcons name="date-range" size={16} color="black" />
              <Text style={styles.iconText}>{`${formatDateTime(
                fromBookingDate
              )}`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialIcons name="date-range" size={16} color="black" />
              <Text style={styles.iconText}>{`${formatDateTime(
                toBookingDate
              )}`}</Text>
            </View>
          </View>
        )}
      </View>
    </>
  )

  return clickable ? (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => navigation.navigate("car-details", { carId: item._id })}
    >
      {Content}
    </TouchableOpacity>
  ) : (
    <View style={styles.carCard}>{Content}</View>
  )
}

const styles = StyleSheet.create({
  carCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 5,
    marginVertical: 8,
    padding: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  iconText: {
    fontSize: 14,
    marginLeft: 4,
  },
})
