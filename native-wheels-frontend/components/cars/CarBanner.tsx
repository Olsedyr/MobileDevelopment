import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Car } from '@/axios/cars/types';

interface CarBannerProps {
  car: Car;
  clickable?: boolean;
}

export const CarBanner: React.FC<CarBannerProps> = ({
  car,
  booking,
  clickable = true,
}) => {
  const navigation = useNavigation();
  console.log(car);

  const Content = (
    <>
      <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{`${car.make} ${car.model}`}</Text>
        <Text style={styles.carDetails}>{`Year: ${car.year}`}</Text>
        <Text style={styles.carDetails}>{`Price: ${car.price}`}</Text>
      </View>
    </>
  );

  return clickable ? (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => navigation.navigate('car-details', { carId: car._id })}
    >
      {Content}
    </TouchableOpacity>
  ) : (
    <View style={styles.carCard}>{Content}</View>
  );
};

const styles = StyleSheet.create({
  carCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
    marginVertical: 8,
    padding: 10,
    width: '100%',
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
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
});
