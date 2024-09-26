import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton";
import { showErrorToast, showSuccessToast } from "../toast";
import { AxiosError } from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AuthenticationScreen() {
  const { login, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const validateInputs = () => {
    if (!username || !password) {
      showErrorToast("Validation Error", "Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

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
    if (!validateInputs()) return;

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
        Native Wheels
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
        <StyledButton
          title="Register"
          onPress={handleRegister}
          type="secondary"
          icon={<AntDesign name="form" />}
        />
      ) : (
        <StyledButton
          title="Login"
          onPress={handleLogin}
          icon={<MaterialIcons name="login" />}
        />
      )}
      <View style={{ marginTop: 16 }}>
        <StyledButton
          title={isRegister ? "Back to Login" : "Sign Up"}
          onPress={() => setIsRegister(!isRegister)}
          type="outline"
          icon={
            isRegister ? (
              <MaterialIcons name="arrow-back" />
            ) : (
              <AntDesign name="form" />
            )
          }
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
  },
});
