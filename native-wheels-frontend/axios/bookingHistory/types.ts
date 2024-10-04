// src/axios/bookingHistory/types.ts
export type BookingHistory = {
    _id: string;
    carId: {
        make: string;
        model: string;
        year: number;
        price: number;
        imageUrl: string;
    };
    fromBookingDate: string;
    toBookingDate: string;
    completedAt: string;
};
