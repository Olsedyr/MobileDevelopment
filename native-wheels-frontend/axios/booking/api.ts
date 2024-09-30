import instance from "@/axios/instance"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBookings = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await instance.get("/bookings", {
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

export const createBooking = async (token, carId) => {
    try {
        const response = await instance.post("/bookings", { carId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error creating booking");
    }
};
