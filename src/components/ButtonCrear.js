import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function ButtonCre({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Continuar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 225,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6303C",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
  },
});
