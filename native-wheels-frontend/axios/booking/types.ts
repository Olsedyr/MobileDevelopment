// src/axios/booking/type.ts
export type Booking = {
  _id: string;
  carId: {
    model: string;
    make: string;
    year: number;
    price: number;
    image: string;
    imageUrl: string;
  };
  fromBookingDate: string;
  toBookingDate: string;
};
