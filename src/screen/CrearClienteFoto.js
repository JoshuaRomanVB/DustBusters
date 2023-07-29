import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import ButtonLogin from "../components/ButtonCrear";
import CustomHeader from "../components/CustomHeader";

export default function CrearClienteFoto({navigation}) {
  
  function irACrearCuentaForm() {
    navigation.navigate("CrearCuentaForm");
  }
  
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/images/backtipo.png")}
        style={styles.imageback}
      >
        <View style={styles.overlay}>
        <CustomHeader />
          <View style={styles.imageContainer}>
            <Text style={styles.titleH}>¡BIENVENIDO CLIENTE!</Text>
            <Text style={styles.subTitulo}>
              Esperamos que tu experiencia sea de lo mejor
            </Text>
            <Image
              source={require("../assets/images/logoapp.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/images/plus.png")}
              style={styles.image2}
            />
            <Text style={styles.subTitulo}>
              Agrega una foto para que los DustBusters confien en ti
            </Text>
          </View>
        </View>
        <View style={styles.containerForm}>
          <ButtonLogin
            onPress={irACrearCuentaForm}
            title="Continuar"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  containerSvg: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  fondoLogin: {
    top: 150,
  },
  containerForm: {
    alignItems: "center",
    justifyContent: "center",
    top: -20,
  },
  titulo: {
    fontSize: 70,
    color: "#848484",
    fontWeight: "bold",
    top: -20,
  },
  subTitulo: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    marginTop: 25,
    marginHorizontal:10,
  },
  inputText: {
    height: 60,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    paddingStart: 20,
  },
  text2: {
    fontSize: 15,
    color: "#848484",
    marginTop: 10,
    marginBottom: 10,
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    position: "relative",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40
  },
  image: {
    width: 188,
    height: 210,
  },
  image2: {
    marginTop: -80,
    marginRight: -150,
  },
});
