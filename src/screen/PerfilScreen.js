import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import ButtonPrymary from "../components/ButtonPrymary";
import {
  getUserToken,
  clearUserId,
  getUserData,
  clearUserData,
} from "../utils/sessionStorage";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "../components/StarRating";
import axios from 'axios';
import Constants from 'expo-constants';

export default function PerfilScreen({ navigation }) {
  const [dataUser, setDataUser] = React.useState({});
  const [ratingUser, setRatingUser] = React.useState();
  const baseUrl = Constants.manifest.extra.baseUrl;
  function irATarjetas() {
    navigation.navigate("Tarjetas");
  }

  function irACalificaciones() {
    navigation.navigate("Calificaciones",{userId: dataUser.userId});
  }

  function irAEditar() {
    navigation.navigate("EditarUsuario");
  }

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        try {
          setDataUser(await getUserData());
          const userData = await getUserData();
          const token = await getUserToken();
  
          if (userData && token) {
            const url = baseUrl + '/api/calificaciones/calificacion-general/' + userData.userId;
            const response = await axios.get(
              url,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            setRatingUser(response.data);
            console.log(response.data);
          } else {
            console.log('El token o los datos del usuario están vacíos.');
          }
        } catch (error) {
          console.error('Error al cargar el perfil:', error);
        }
      };
  
      loadProfile();
  
      return () => {
        // aquí puedes cancelar cualquier operación pendiente si es necesario
      };
    }, [])
  );
  

  const handleLogout = async () => {
    await clearUserId();
    await clearUserData();
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Perfil</Text>
        {dataUser && dataUser.fotoPerfil ? (
          <Image
            source={{ uri: dataUser.fotoPerfil }}
            style={styles.image}
          />
        ) : (
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg",
            }}
            style={styles.image}
          />
        )}

        <CustomButton title={"Cerrar sesión"} onPress={handleLogout} />
        <Text style={{ ...styles.texto, fontSize: 22 }}>
    
          {dataUser.nombreCompleto}
        </Text>
        <View></View>
        <StarRating rating={ratingUser} />
        <TouchableOpacity onPress={irACalificaciones}>
          <Text style={{ ...styles.texto, color: "#dd0000", fontSize: 20 }}>
            Ver calificaciones
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardCalificacion}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 5,
            }}
          >
            <Text style={{ ...styles.texto, fontSize: 20 }}>
              {dataUser.correo}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <View style={styles.cardCalificacion}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 5,
            }}
          >
            <Text style={{ ...styles.texto, fontSize: 20 }}>
              {" "}
              {dataUser.numeroTelefono}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <View style={styles.cardCalificacion}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 5,
            }}
          >
            <Text style={{ ...styles.texto, fontSize: 20 }}>***********</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <CustomButton title="Editar" onPress={irAEditar} />
      <ButtonPrymary text={"Ver tarjetas"} onPress={irATarjetas} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  cardCalificacion: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden", // Recortar el contenido si se desborda
    elevation: 4,
  },
	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30,
		alignSelf: 'center',
	},
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 10, // Reducir el margen superior para dar espacio al texto
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
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 10,
    marginBottom:20
  },
  image2: {
    width: 120,
    height: 20,
    borderRadius: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
