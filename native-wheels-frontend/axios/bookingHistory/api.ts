import instance from "@/axios/instance"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BookingHistory } from "@/axios/bookingHistory/types"

export const getBookingHistory = async (): Promise<BookingHistory[]> => {
  try {
    const response = await instance.get<BookingHistory[]>("/booking-history")
    return response.data
  } catch (error) {
    console.error("Error fetching booking history:", error)
    throw error
  }
}
