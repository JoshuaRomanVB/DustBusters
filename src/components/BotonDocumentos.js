import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function BotonDocumentos({ onPress, title }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center", // Alinea el contenido horizontalmente al centro
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    textAlign: "left", // Alinea el texto a la izquierda
    paddingLeft: 20, // Agrega un relleno izquierdo para separar el texto del borde izquierdo del botón
  },
});
