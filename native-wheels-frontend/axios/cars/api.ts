import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Car } from "@/axios/cars/types";

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get<Car[]>("http://localhost:8080/api/cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred.");
  }
};
