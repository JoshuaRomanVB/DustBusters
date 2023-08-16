import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import ButtonPrymary from "../components/ButtonPrymary";
import ItemCreditsCards from "../components/ItemCreditsCards";
import { useFocusEffect } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import CustomHeader from "../components/CustomHeader";
import {
  getUserToken,
  clearUserId,
  getUserData,
  clearUserData,
} from "../utils/sessionStorage";
import Constants from 'expo-constants';

const CreditCardsScreen = ({ navigation }) => {
  const baseUrl = Constants.manifest.extra.baseUrl;
  const [token, setToken] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dataUser, setDataUser] = React.useState({});

  const handlerCrearTarjeta = () => {
    navigation.navigate("CreateCreditCardsScreen");
  };

  const loadProfile = useCallback(async () => {
    try {
      const userData = await getUserData();
      console.log(userData)
      const userToken = await getUserToken();
			setToken(userToken);
      await handlerObtenerTarjeta(userData);
    } catch (error) {
      console.log("Error al cargar el perfil:", error);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    return () => {
      // aquí puedes cancelar cualquier operación pendiente si es necesario
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handlerObtenerTarjeta = async (userData) => {

  	const url = baseUrl + '/api/openpay/cards/' + userData.userIdOpenpay;
    console.log(url)
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

  const handleEliminarTarjeta = async () => {
    if (selectedCard) {
      setShowAlert(false);
      const url = baseUrl + '/api/openpay/cards/' + selectedCard.customer_id + "/" +selectedCard.id ;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        await axios.delete(url, { headers });
        Alert.alert("Éxito", "La tarjeta ha sido eliminada correctamente");
        loadProfile();
      } catch (error) {
        console.log("Error al eliminar la tarjeta:", error);
        Alert.alert("Error", "Ocurrió un error al eliminar la tarjeta");
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.sectionContainer}>
        <FlatList
          data={tarjetas}
          renderItem={({ item }) => (
            <ItemCreditsCards
              item={item}
              onPress={() => {
                setSelectedCard(item);
                setShowAlert(true);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <Text>No hay tarjetas disponibles.</Text>}
          ListFooterComponent={
            <ButtonPrymary
              text={"Agregar tarjeta"}
              onPress={handlerCrearTarjeta}
            />
          }
          ListHeaderComponent={<CustomHeader />}
        />
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Eliminar tarjeta"
        message="¿Estás seguro de que deseas eliminar esta tarjeta?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Sí, eliminar"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={handleEliminarTarjeta}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
});

export default CreditCardsScreen;
