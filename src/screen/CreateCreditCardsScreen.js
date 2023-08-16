import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Input from "../components/Input";
import { typography } from "../styles/typography";
import ButtonPrymary from "../components/ButtonPrymary";
import { colors } from "../styles/colors";
import AwesomeAlert from "react-native-awesome-alerts";
import CustomHeader from "../components/CustomHeader";
import { useFocusEffect } from "@react-navigation/native";
import {
  getUserToken,
  clearUserId,
  getUserData,
  clearUserData,
} from "../utils/sessionStorage";
import Constants from 'expo-constants';

const CreateCreditCardsScreen = ({ navigation }) => {
  const baseUrl = Constants.manifest.extra.baseUrl;
  const [dataUser, setDataUser] = useState([]);
  const [token, setToken] = useState('');
  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  //datos tarjeta
  const [numerotarjeta, setNumerotarjeta] = useState("");
  const [numerotarjetaError, setNumerotarjetaError] = useState("");

  const [nombre, setNombre] = useState("");
  const [nombreError, setnombreError] = useState("");

  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");

  const [mes, setMes] = useState("");
  const [mesError, setMesError] = useState("");

  const [anio, setAnio] = useState("");
  const [anioError, setAnioError] = useState("");

  const [customerId, setCustomerId] = useState("");

  const validateFields = () => {
    let isValid = true;

    // Validar número de tarjeta
    if (!/^\d{16}$/.test(numerotarjeta)) {
      setNumerotarjetaError("El número de tarjeta debe tener 16 dígitos");
      isValid = false;
    } else {
      setNumerotarjetaError("");
    }

    // Validar nombre en la tarjeta
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(nombre)) {
      setnombreError("Por favor ingrese un nombre válido");
      isValid = false;
    } else {
      setnombreError("");
    }

    // Validar CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      setCvvError("El CVV debe tener 3 o 4 dígitos");
      isValid = false;
    } else {
      setCvvError("");
    }

    // Validar mes
    if (!/^(0?[1-9]|1[0-2])$/.test(mes)) {
      setMesError("El mes debe ser un número entre 01 y 12");
      isValid = false;
    } else {
      setMesError("");
    }

    // Validar año
    if (!/^\d{2}$/.test(anio)) {
      setAnioError("El año debe tener 2 dígitos");
      isValid = false;
    } else {
      const currentYearLastDigits = new Date()
        .getFullYear()
        .toString()
        .slice(-2);
      if (Number(anio) < Number(currentYearLastDigits)) {
        setAnioError("El año debe ser mayor o igual al actual");
        isValid = false;
      } else {
        setAnioError("");
      }
    }

    return isValid;
  };


  const loadProfile = useCallback(async () => {
    try {
      const userData = await getUserData();
      setDataUser(userData)
      const userToken = await getUserToken();
			setToken(userToken);

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



  const handleAgregarTarjeta = async (
    nombre,
    numero,
    cvv,
    mes,
    anio,
    customerId
  ) => {
    const isValid = validateFields();
    if (isValid) {
      setShowAlert(!showAlert);
      setShowAlertProgress(!showAlertProgress);
      setShowButton(false);
      setShowAlertTittle("Guardando tarjeta");
      setShowAlertMessage("Por favor espera...");


	const url = baseUrl + '/api/openpay/cards/' + dataUser.userIdOpenpay;

      console.log(
        nombre +
          " " +
          numero +
          " " +
          cvv +
          " " +
          mes +
          " " +
          anio +
          " " +
          " " +
          customerId
      );
      const data = {
        card_number: numero,
        holder_name: nombre,
        expiration_year: anio,
        expiration_month: mes,
        cvv2: cvv,
        device_session_id: "kR1MiQhz2otdIuUlQkbEyitIqVMiI16f",
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(url, data, { headers });
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Exito en el guardado");
        setShowAlertMessage("Se ha guardado su tarjeta correctamente");
        setResponseExitoso(true);
      } catch (error) {
        console.log("error" + error.description);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Error en el guardado");
        setShowAlertMessage(error.response.data.description);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={require("../assets/images/baclregistro.png")}
          style={styles.imageback}
        >
      
          <View style={styles.sectionContainer}>
            <View style={styles.overlay}>
            <CustomHeader/>
              <Text style={styles.titleH}>TU INFORMACIÓN</Text>
              <Text style={styles.subtitle}>
                Para terminar tu registro rellena el formulario
              </Text>
            </View>

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
                  navigation.navigate("Tarjetas");
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
            <View style={styles.containerForm}>
              <Text style={[typography.body, styles.inputText]}>
                Numero de Tarjeta
              </Text>
              <Input
                placeholderText="Numero"
                iconName="card"
                onChangeText={setNumerotarjeta}
              />

              {numerotarjetaError !== "" && (
                <Text style={styles.errorText}>{numerotarjetaError}</Text>
              )}

              <Text style={[typography.body, styles.inputText]}>
                Nombre y apellido
              </Text>
              <Input
                placeholderText="Nombre y apellido"
                iconName="person-sharp"
                onChangeText={setNombre}
              />
              {nombreError !== "" && (
                <Text style={styles.errorText}>{nombreError}</Text>
              )}
              <Text style={[typography.body, styles.inputText]}>
                Año vencimiento
              </Text>
              <Input
                placeholderText="Año vencimiento"
                iconName="calendar"
                onChangeText={setAnio}
              />
              {anioError !== "" && (
                <Text style={styles.errorText}>{anioError}</Text>
              )}
              <Text style={[typography.body, styles.inputText]}>
                Mes vencimiento
              </Text>
              <Input
                placeholderText="Mes vencimiento"
                iconName="calendar"
                onChangeText={setMes}
              />
              {mesError !== "" && (
                <Text style={styles.errorText}>{mesError}</Text>
              )}
              <Text style={[typography.body, styles.inputText]}>
                Codigo de seguridad (CVV)
              </Text>
              <Input
                placeholderText="Codigo de seguridad (CVV)"
                iconName="md-lock-closed"
                onChangeText={setCvv}
              />
              {cvvError !== "" && (
                <Text style={styles.errorText}>{cvvError}</Text>
              )}
              <ButtonPrymary
                text={"Agregar tarjeta"}
                onPress={() => {
                  handleAgregarTarjeta(
                    nombre,
                    numerotarjeta,
                    cvv,
                    mes,
                    anio,
                    dataUser.idOpenP
                  );
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  errorText: {
    marginHorizontal: 20,
    color: colors.error,
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 34,
  },
  subtitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    marginVertical:10
  },
  containerForm: {
    backgroundColor: "#FFF",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20, // Agrega un margen horizontal para separar del borde izquierdo y derecho
    paddingVertical: 20, // Agrega un margen vertical para separar del borde superior e inferior
    height: 600,
  },
});

export default CreateCreditCardsScreen;
