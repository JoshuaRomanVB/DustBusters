import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import ServiciosCard from "./ServiciosCard";
import CustomButton from "../components/CustomButton";
import { getUserToken } from "../utils/sessionStorage";

export default function ServiciosList(props) {
  const { servicios, navigation } = props;
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
    };

    loadToken();
  }, []);

  function irACrearServicio() {
    navigation.navigate("CrearServicio");
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Mis Solicitudes</Text>
        <CustomButton title={"Crear Solicitud"} onPress={irACrearServicio} />
   
      <FlatList
        data={servicios}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.serviceId)}
        renderItem={({ item }) => <ServiciosCard servicios={item} />}
      />
         </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom:300
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    alignSelf: "center",
  },
});
