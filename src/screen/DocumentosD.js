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
import BotonIne from "../components/BotonIne";
import BotonCarta from "../components/BotonCarta";
import BotonComprobante from "../components/BotonComprobante";
import BotonCurp from "../components/BotonCurp";

export default function Documentos(props) {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/images/backtipo.png")}
        style={styles.imageback}
      >
        <View style={styles.overlay}>
          <View style={styles.imageContainer}>
            <Text style={styles.titleH}>DOCUMENTACÍON</Text>
            <Text style={styles.subTitulo}>
              Para poderte registrar como DustBuster sube tu carta de
              antescedentes no penales
            </Text>
          </View>
        </View>
        <View style={styles.botonI}>
          <BotonIne
            onPress={() => props.navigation.navigate("Documentos")}
            title="Ine"
          />
        </View>
        <View style={styles.botonC}>
          <BotonCarta
            onPress={() => props.navigation.navigate("Documentos")}
            title="Carta de antecedentes no penales"
          />
        </View>
        <View style={styles.botonC2}>
          <BotonCurp
            onPress={() => props.navigation.navigate("Documentos")}
            title="Curp"
          />
        </View>
        <View style={styles.botonC3}>
          <BotonComprobante
            onPress={() => props.navigation.navigate("Documentos")}
            title="Comprobante de domicilio"
          />
        </View>
        <View style={styles.containerForm}>
          <ButtonLogin
            onPress={() => props.navigation.navigate("Documentos")}
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
  botonI: {
    alignItems: "center",
    justifyContent: "center",
    top: -50,
  },
  botonC: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
  },
  botonC2: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
  },
  botonC3: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
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
    fontSize: 35,
    marginTop: 40,
  },
  image: {
    width: 188,
    height: 210,
    marginTop: 40,
    marginBottom: 40,
  },
  image2: {
    marginTop: -80,
    marginRight: -170,
  },
});
