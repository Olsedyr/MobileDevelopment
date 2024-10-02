import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchCar } from "@/axios/cars/api";
import { createBooking } from "@/axios/booking/api";
import CarDetailsInfo from "@/components/booking/CarDetails";
import DateTimePickerComp from "@/components/booking/DateTimePickerComp";
import { Car } from "@/axios/cars/types";
import StyledButton from "@/components/StyledButton";
import { Ionicons } from "@expo/vector-icons";

const CarDetails = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const route = useRoute();
    const navigation = useNavigation();
    const { carId } = route.params;

    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCarDetails = async () => {
            try {
                const car = await fetchCar(carId);
                setCar(car);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError(err.message);
            }
        };

        loadCarDetails();
    }, [carId, startDate, endDate]);

    const handleBooking = async () => {
        try {
            const bookingData = await createBooking(carId, startDate, endDate);
            navigation.navigate("available-cars");
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };
    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!car) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <CarDetailsInfo car={car} />
            <DateTimePickerComp setStartDate={setStartDate} setEndDate={setEndDate} />

            <View style={styles.buttonContainer}>
            <StyledButton
                title={"Confirm Booking"}
                icon={<Ionicons name="checkmark" />}
                onPress={async () => {
                    await handleBooking();
                }}
            />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginTop: -15
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginVertical: -10,
    },
});

export default CarDetails;
