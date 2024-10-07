import instance from "@/axios/instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Booking } from "@/axios/booking/types";


export const getBookings = async (): Promise<Booking[]> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await instance.get<Booking[]>("/bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};


export const createBooking = async (carId: string, fromBookingDate: Date, toBookingDate: Date): Promise<Booking> => {
    try {
        const response = await instance.post<Booking>("/bookings", { carId, fromBookingDate, toBookingDate });
        await instance.post(`/cars/${carId}/book`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error creating booking");
    }
};
