import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Button, View, TouchableOpacity, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "@/axios/auth/api";

export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUsername(userInfo.username);
    };

    fetchUserInfo();
  }, []);

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
                source={require("@/assets/images/homepage-header.jpg")}
                style={styles.header}
            />
          }
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.titleText}>Hello {username}</ThemedText>
          <ThemedText>Welcome to Native Wheels!
            Discover the perfect vehicle for your journey.
            Whether you’re planning a road trip or need a ride for the day,
            we’ve got you covered. Press the button below to get started</ThemedText>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("available-cars")}>
            <Text style={styles.buttonText}>Available cars</Text>
          </TouchableOpacity>
        </ThemedView>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  header: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    elevation: 3,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
