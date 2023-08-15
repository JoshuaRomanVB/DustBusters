import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import Constants from "expo-constants";
import { getUserToken } from "../utils/sessionStorage";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "../components/StarRating";
import axios from "axios";
import { colors } from "../styles/colors";

export default function Calificaciones({ route }) {
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
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setRatingUser(response.data);

            const userApiUrl = baseUrl + "/api/usuarios/" + userId;
            const userApiResponse = await axios.get(userApiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setDataUser(userApiResponse.data);
          } else {
            console.log("El token o los datos del usuario están vacíos.");
          }

          if (token) {
            const url =
              baseUrl + "/api/calificaciones/por-usuario/" + userId;
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setCalificaciones(response.data);
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
        <View style={styles.header}>
          <Text style={styles.titulo}>Calificaciones</Text>
          <Image
            source={{ uri: dataUser.fotoPerfil || "https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg" }}
            style={styles.image}
          />
          <Text style={{ ...styles.titulo, fontSize: 22 }}>
            {dataUser.nombreCompleto}
          </Text>
          <StarRating rating={ratingUser} />
        </View>

        {ratingUser ? (
          <FlatList
            data={calificaciones}
            renderItem={renderItem}
            keyExtractor={(item) => item.calificacionId}
            style={styles.flatList}
          />
        ) : (
          <View style={styles.noCalificaciones}>
            <Text style={styles.textoCalificar}>Nadie te ha calificado</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorT: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  cardCalificacion: {
    width: '100%',
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: colors.white,
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.black,
    marginLeft: 10,
    marginTop: 10,
  },
  textoCalificar: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#F5AE03",
    marginTop: 30,
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
  image3: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginTop: 0,
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  flatList: {
    flex: 2, // Ocupa el 50% de la pantalla
    width: "100%", // Ocupa todo el ancho
  },
  noCalificaciones: {
    flex: 2,
    alignItems: "center",
  },
});
