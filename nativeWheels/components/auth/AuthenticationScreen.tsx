import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton";
import { showErrorToast, showSuccessToast } from "../toast";
import { AxiosError } from "axios";

export default function AuthenticationScreen() {
  const { login, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      await login({ username, password });
      showSuccessToast("Login successful", "Welcome back!");
    } catch (error) {
      showErrorToast(
        "Login failed",
        "Please check your username and password."
      );
    }
  };

  const handleRegister = async () => {
    try {
      await signup({ username, password });
      showSuccessToast("Registration successful", "You can now login.");
      setIsRegister(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        showErrorToast("Registration failed", "Username is already taken.");
      } else {
        showErrorToast(
          "Registration failed",
          "Please check your details and try again."
        );
      }
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
