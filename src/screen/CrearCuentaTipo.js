import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function CrearCuentaTipo({navigation}) {

  function irACrearClienteFoto() {
    navigation.navigate("CrearClienteFoto");
  }

  function irACrearLimpiadorFoto() {
    navigation.navigate("CrearLimpiadorFoto");
  }

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/backtipo.png")}
        style={registerStyles.imageback}
      >
        <View style={registerStyles.container}>
          <CustomHeader />
          <View style={registerStyles.overlay}>
            <Text style={registerStyles.titleH}>TIPO DE USUARIO</Text>
            <Text style={registerStyles.subtitle}>¿Qué deseas hacer?</Text>

            <TouchableOpacity style={registerStyles.buttonContainer} onPress={irACrearClienteFoto}>
              <View style={registerStyles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/cliente.png")}
                  style={registerStyles.buttonImage}
                />
              </View>
              <Text style={registerStyles.buttonText}>Cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={registerStyles.buttonContainer} onPress={irACrearLimpiadorFoto}>
              <View style={registerStyles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/dustbuster.png")}
                  style={registerStyles.buttonImage}
                />
              </View>
              <Text style={registerStyles.buttonText}>Dustbuster</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

// Estilos de CSS
const registerStyles = StyleSheet.create({
  imageback: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container:{
    flex:1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  buttonText: {
    color: "#323232",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
