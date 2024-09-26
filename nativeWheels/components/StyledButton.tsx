import { Colors } from "@/constants/Colors";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "outline";
}

export default function StyledButton({
  title,
  onPress,
  type = "primary",
  ...props
}: StyledButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "outline" && styles.outlineButton,
        type === "secondary" && styles.secondaryButton,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          type === "outline" && styles.outlineButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.light.tabIconSelected,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  outlineButtonText: {
    color: "#555",
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondaryTint,
  },
});
