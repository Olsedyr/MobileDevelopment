import { Car } from "@/axios/cars/types";
import instance from "@/axios/instance";

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await instance.get<Car[]>("/cars");
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred.");
  }
};
