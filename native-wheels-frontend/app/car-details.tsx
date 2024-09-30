import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchCars } from "@/axios/cars/api";
import DateTimePicker from '@react-native-community/datetimepicker';


const CarDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { carId } = route.params;

  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        const cars = await fetchCars();
        const selectedCar = cars.find((car) => car._id === carId);
        setCar(selectedCar);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message);
      }
    };

    loadCarDetails();
  }, [carId]);

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!car) {
    return <Text>Loading...</Text>;
  }

  // Functions to handle date changes
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
      <Text style={styles.title}>{`${car.make} ${car.model}`}</Text>
      <Text style={styles.price}>{`${car.price} DKK per day`}</Text>
      <Text style={styles.details}>{`${car.horsePower} HP`}</Text>
      <Text style={styles.details}>{`${car.cylinders} cylinders`}</Text>
      <Text style={styles.details}>{`${car.year} model`}</Text>

      <Text style={styles.dateLabel}>From:</Text>
      <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{startDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeStart}
        />
      )}

      <Text style={styles.dateLabel}>To:</Text>
      <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{endDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeEnd}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("available-cars")} 
        >
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center", 
  },
  carImage: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "red",
    marginBottom: 8,
    fontWeight: "bold",
  },
  details: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: "center",
  },
  dateLabel: {
    fontSize: 18,
    marginVertical: 8,
  },
  datePicker: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF4B3E",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default CarDetails;
