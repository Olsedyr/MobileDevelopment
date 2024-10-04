// src/axios/bookingHistory/api.ts
import instance from "@/axios/instance"; // Make sure this path is correct
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBookingHistory = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await instance.get("/bookingHistory", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Assuming this is the structure of your response
    } catch (error) {
        console.error("Error fetching booking history:", error);
        throw error;
    }
};
