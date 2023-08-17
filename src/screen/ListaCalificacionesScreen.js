import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import CustomHeader from "../components/CustomHeader";
import StarInput from "../components/StarInput";
import { getUserToken,   getUserData } from "../utils/sessionStorage";
import Constants from "expo-constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../styles/colors";
import { TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";

export default function ListaCalificacionesScreen({ route, navigation }) {
  const baseUrl = Constants.manifest.extra.baseUrl;
  const { servicio } = route.params;
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const [tarjetas, setTarjetas] = useState([]);
  const [selectedCard, setSelectedCard] = useState(""); // Estado para la tarjeta seleccionada

  const handleCardSelection = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleRatingChange = (rating) => {
    setCalificacion(rating);
  };

  const loadProfile = useCallback(async () => {
    try {
      const userData = await getUserData();
      const userToken = await getUserToken();
      setUserData(userData);
      setToken(userToken);
      await handlerObtenerTarjeta(userData); // Mueve la llamada aquí
    } catch (error) {
      console.log("Error al cargar el perfil:", error);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [token])
  );
  const handlerObtenerTarjeta = async (userData) => {
    if (!token) {
      console.log("Token está vacío. No se puede hacer la solicitud.");
      return;
    }
    const url = baseUrl + "/api/openpay/cards/" + userData.userIdOpenpay;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      setTarjetas(response.data);
    } catch (error) {
      console.log("Error al obtener las tarjetas:", error);
      console.log(userData.userIdOpenpay);
    }
  };
  

  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [responseExitoso, setResponseExitoso] = useState(false);

  const handlecalificacion = async (imageURL) => {
    setShowAlert(!showAlert);
    setShowAlertProgress(!showAlertProgress);
    setShowButton(false);
    setShowAlertTittle("Subiendo Calificación");
    setShowAlertMessage("Por favor espera...");

    try {

      const pagoData = {
        source_id: selectedCard,
        method: "card",
        amount: servicio.ofertaCliente,
        currency: "MXN",
        description: "Pago servicio " + servicio.serviceId,
        order_id: servicio.serviceId,
        device_session_id: "No valido",
      };

      const urlpago = baseUrl + `/api/openpay/charges/`+ userData.userIdOpenpay;
      console.log(servicioData);
      console.log(url);
      console.log(token);
      const apiResponsepago = await axios.post(urlpago, pagoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Segunda petición: Guardar datos del servicio en tu API
      const servicioData = {
        calificacion: calificacion,
        nombreCalificador: servicio.cliente.nombreCompleto,
        idUsuarioCalificado: servicio.limpiador.userId,
        urlImagenCalificador: servicio.cliente.fotoPerfil,
        comentario: comentario,
      };

      const url = baseUrl + `/api/calificaciones`;
      console.log(servicioData);
      console.log(url);
      console.log(token);
      const apiResponse = await axios.post(url, servicioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Aquí puedes manejar la respuesta de tu API según tus necesidades
      console.log(apiResponse.data); // O cualquier otra acción que desees realizar

      setShowAlertProgress(false);
      setShowButton(true);
      setShowAlertTittle("Éxito en el guardado");
      setShowAlertMessage("Se han guardado tus datos correctamente");
      setResponseExitoso(true);
    } catch (error) {
      console.error(error);
      setShowAlertProgress(false);
      setShowButton(true);
      setShowAlertTittle("Error en el guardado");
      setShowAlertMessage("Inténtelo más tarde");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <CustomHeader />
      <Text style={styles.titulo}>{servicio.descripcionServicio}</Text>
      <Text style={{ ...styles.titulo, textAlign: "center", marginTop: 20 }}>
        Tu opinión es muy importante, califica a nuestros DustBusters
      </Text>
      <View style={styles.card}>
        {servicio.limpiador.fotoPerfil ? (
          <Image
            source={{
              uri: servicio.limpiador.fotoPerfil,
            }}
            style={styles.imageDetalle}
          />
        ) : (
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg",
            }}
            style={styles.imageDetalle}
          />
        )}
        <Text style={{ ...styles.texto, fontSize: 22 }}>
          {servicio.limpiador.nombreCompleto}
        </Text>
        <StarInput onChangeRating={handleRatingChange} />
        <TextInput
          placeholder="Comentario"
          style={[styles.inputTextDetalle]}
          autoCapitalize="none"
          onChangeText={(text) => {
            setComentario(text);
          }}
        />

<Picker
  selectedValue={selectedCard}
  onValueChange={(itemValue) => handleCardSelection(itemValue)}
  style={styles.picker}
>
  <Picker.Item label="Selecciona una tarjeta" value="" />
  {tarjetas.map((tarjeta) => {
    console.log("Renderizando tarjeta:", tarjeta); // Agrega este console.log
    return (
      <Picker.Item
        key={tarjeta.id}
        label={`${tarjeta.card_number}`}
        value={tarjeta.id}
      />
    );
  })}
</Picker>


      </View>

      <CustomButton title="Guardar" onPress={handlecalificacion} />
      <AwesomeAlert
        show={showAlert}
        title={showAlertTittle}
        message={showAlertMessage}
        showProgress={showAlertProgress}
        progressColor={colors.primary}
        progressSize={40}
        closeOnHardwareBackPress={true}
        closeOnTouchOutside={false}
        showConfirmButton={showButton}
        confirmText="Aceptar"
        onConfirmPressed={() => {
          setShowAlert(false);
          if (responseExitoso) {
            navigation.navigate("home");
          }
        }}
        confirmButtonStyle={{
          backgroundColor: colors.blue,
          width: 100,
          alignItems: "center",
          borderRadius: 30,
        }}
        contentContainerStyle={{ borderRadius: 30, marginHorizontal: 50 }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imageDetalle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
  picker: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 370,
    marginHorizontal:10,
    marginTop: 20,
    backgroundColor: "#fff",
    overflow: "hidden", // Recortar el contenido si se desborda
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
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
    width: 300,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  image2: {
    width: 250,
    height: 50,
    borderRadius: 40,
    marginTop: 20,
  },
  inputTextDetalle: {
    width: 300,
    height: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    marginBottom: 20,
  },
});
