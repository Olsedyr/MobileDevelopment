import { Car } from "../cars/types"

export type BookingHistory = {
  _id: string
  carId: Car
  fromBookingDate: string
  toBookingDate: string
  completedAt: string
}
