import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function ButtonLogin({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>CARTA ANTECEDENTES NO PENALES</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 70,
    borderRadius: 20,
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    left: 20,
  },
});
