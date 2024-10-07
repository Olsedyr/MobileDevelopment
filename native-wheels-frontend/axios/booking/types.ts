import { Car } from "../cars/types"

export type Booking = {
  _id: string
  carId: Car
  fromBookingDate: string
  toBookingDate: string
}
