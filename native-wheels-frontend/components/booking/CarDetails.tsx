import { Car } from '@/axios/cars/types';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CarDetailsInfo: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
      <Text style={styles.title}>{`${car.make} ${car.model}`}</Text>
      <Text style={styles.price}>{`${car.price} DKK per day`}</Text>
      <Text style={styles.details}>{`${car.horsePower} HP`}</Text>
      <Text style={styles.details}>{`${car.cylinders} cylinders`}</Text>
      <Text style={styles.details}>{`${car.year} model`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  carImage: {
    width: 400,
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'red',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: 'center',
  },
});

export default CarDetailsInfo;
