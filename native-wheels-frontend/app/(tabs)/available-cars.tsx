import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  available: boolean;
  image: string;
  cylinders: number;
  horsePower: number;
  imageUrl: string;
}

export default function AvailableCars() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get<Car[]>(
          "http://localhost:8080/api/cars",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err instanceof Error ? err.message : "An error occurred.");
      }
    };

    fetchCars();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cars</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}{" "}
      <ScrollView contentContainerStyle={styles.carList}>
        {cars.map((car) => (
          <TouchableOpacity
            key={car._id}
            style={styles.carCard}
            onPress={() =>
              navigation.navigate("CarDetails", { carId: car._id })
            }
          >
            <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{`${car.make} ${car.model}`}</Text>
              <Text style={styles.carDetails}>{`Year: ${car.year}`}</Text>
              <Text style={styles.carDetails}>{`Price: 400 DKK`}</Text>{" "}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  carList: {
    alignItems: "center",
  },
  carCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
    marginVertical: 8,
    padding: 10,
    width: "100%",
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
});
