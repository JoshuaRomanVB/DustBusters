import { TouchableWithoutFeedback } from "react-native";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function ServiciosCard(props) {
  const navigation = useNavigation();
  const { servicios } = props;
  //console.log(servicios);

  function irACrearServicio() {
    navigation.navigate("CrearServicio");
  }

  function irAServicio() {
    navigation.navigate("Servicio", { servicios: servicios });
  }

  console.log(servicios.fechaServicio)
  return (
    <TouchableOpacity onPress={irAServicio}>
      <View style={styles.card}>
        <Image
          source={{
            uri: servicios.urlImagenServicio,
          }}
          style={styles.image}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.texto, fontSize: 20 }}>
              {servicios.direccion}
            </Text>
            <Text style={styles.texto}>{servicios.descripcionServicio}</Text>
            <Text style={styles.texto}>{servicios.plantas} planta(s) </Text>
          </View>
		  <View style={{ flex: 1, marginTop:5 }}>
		  <Text style={styles.texto}>{servicios.fechaServicio}</Text>
          </View>
		
          <View style={{ flex: 0.5, marginTop: 0}}>
            <Text style={styles.textoPagado}>${servicios.ofertaCliente}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical:5,
	marginHorizontal:5,
	paddingBottom:5,
    backgroundColor: "#fff",
    overflow: "hidden", // Recortar el contenido si se desborda
	elevation:4,
	borderRadius:30
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    alignSelf: "center",
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 4, // Reducir el margen superior para dar espacio al texto
  },
  textoCalificar: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#F5AE03",
    marginTop: 30, // Reducir el margen superior para dar espacio al texto
  },
  textoPagado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007d00",
    marginTop: 30,
  },
  image: {
    width: 350,
    height: 150,
    borderRadius: 10,
    resizeMode: "stretch",
  },
});
