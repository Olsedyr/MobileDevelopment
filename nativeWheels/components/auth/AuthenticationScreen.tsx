import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Toast from "react-native-toast-message";
import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton";

export default function AuthenticationScreen() {
  const { login, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      await login({ username, password });
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
        position: "top",
        topOffset: 60,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Please check your username and password.",
        position: "bottom",
      });
    }
  };

  const handleRegister = async () => {
    try {
      await signup({ username, password });
      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "You can now login.",
        position: "bottom",
      });
      setIsRegister(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: "Please check your details and try again.",
        position: "bottom",
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {isRegister ? "Register" : "Login"}
      </ThemedText>
      <StyledInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <StyledInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isRegister ? (
        <StyledButton title="Register" onPress={handleRegister} />
      ) : (
        <StyledButton title="Login" onPress={handleLogin} />
      )}
      <View style={{ marginTop: 16 }}>
        <StyledButton
          title={isRegister ? "Back to Login" : "Sign Up"}
          onPress={() => setIsRegister(!isRegister)}
          type="secondary"
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
