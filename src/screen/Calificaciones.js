import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  ImageBackground
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import Constants from "expo-constants";
import {
  getUserToken,
  clearUserId,
  getUserData,
  clearUserData,
} from "../utils/sessionStorage";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "../components/StarRating";
import axios from "axios";
import { colors } from "../styles/colors";

export default function Calificaciones({route}) {
	const { userId } = route.params;
  const baseUrl = Constants.manifest.extra.baseUrl;
  const [ratingUser, setRatingUser] = React.useState();
  const [dataUser, setDataUser] = React.useState({});
  const [calificaciones, setCalificaciones] = React.useState({});
  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        try {
          const token = await getUserToken();

          if (token) {
            const url =
              baseUrl +
              "/api/calificaciones/calificacion-general/" +
              userId;
              console.log(url)
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setRatingUser(response.data);
            console.log(response.data);


            console.log( baseUrl + "/api/usuarios/" + userId)
            const userApiUrl = baseUrl + "/api/usuarios/" + userId;
            const userApiResponse = await axios.get(userApiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setDataUser(userApiResponse.data)
          } else {
            console.log("El token o los datos del usuario están vacíos.");
          }

          if ( token) {
            const url =
              baseUrl + "/api/calificaciones/por-usuario/" + userId;
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setCalificaciones(response.data);
            console.log(response.data);
          } else {
            console.log("El token o los datos del usuario están vacíos.");
          }
        } catch (error) {
          console.error("Error al cargar el perfil:", error);
        }
      };

      loadProfile();

      return () => {
        // aquí puedes cancelar cualquier operación pendiente si es necesario
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.cardCalificacion}>
      <StarRating rating={item.calificacion} />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: item.urlImagenCalificador }}
            style={styles.image3}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text style={{ ...styles.texto, fontSize: 22 }}>
            {item.nombreCalificador}
          </Text>
          <Text style={{ ...styles.texto }}>{item.comentario}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      		<ImageBackground
				source={require('../assets/images/baclregistro.png')}
				style={styles.imageback}
			>
      <CustomHeader />
      <View style={styles.contenedorT}>
        <Text style={styles.titulo}>Calificaciones</Text>
        {dataUser && dataUser.fotoPerfil ? (
          <Image source={{ uri: dataUser.fotoPerfil }} style={styles.image} />
        ) : (
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg",
            }}
            style={styles.image}
          />
        )}

        <Text style={{ ...styles.texto, fontSize: 22 }}>
          {dataUser.nombreCompleto}
        </Text>
        <StarRating rating={ratingUser} />
      </View>

      {ratingUser ? (
        <FlatList
          data={calificaciones}
          renderItem={renderItem}
          keyExtractor={(item) => item.calificacionId} // Assuming you have unique IDs for each item
        />
      ) : (
        <View style={styles.contenedorT}>
          <Text style={styles.textoCalificar}>Nadie te a calificado</Text>
          <Image
            source={require("../../src/assets/images/triste.jpg")}
            style={styles.image}
          />
        </View>
      )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenedorT: {
    flex: 1,
    alignItems: "center",
  },
  cardCalificacion: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 335,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#000",
    borderWidth: 2, // Especifica el ancho del borde

    overflow: "hidden", // Recortar el contenido si se desborda
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: colors.white
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 10,
    marginTop: 10, // Reducir el margen superior para dar espacio al texto
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
    marginBottom: 20,
  },
  image2: {
    width: 250,
    height: 50,
    borderRadius: 40,
    marginTop: 20,
  },
  image3: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginTop: 0,
  },
  image4: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 20,
    marginLeft: 5,
  },
  image5: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 100,
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
  },
});
