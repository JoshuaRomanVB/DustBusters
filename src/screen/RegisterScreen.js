import React, { useState } from "react";
import { globalstyles } from "../styles/globalstyles";
import { typography } from "../styles/typography";
import { Ionicons } from "@expo/vector-icons";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image, // Importa solo el componente Image de react-native
} from "react-native";
import { registerStyles } from "../styles/Screens/registerStyles";
import Input from "../components/Input";
import ButtonPrymary from "../components/ButtonPrymary";
import ButtonText from "../components/ButtonText";
import { colors } from "../styles/colors";
import AwesomeAlert from "react-native-awesome-alerts";
import * as ImagePicker from "expo-image-picker";
import { db } from "../utils/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { storage } from '../utils/firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");

  // Definir una referencia a una colección
  const refCollection = collection(db, "Tiendas");
  const queryFetch = query(refCollection);

  const validateFields = () => {
    let isValid = true;

    // Validar nombre
    if (!name) {
      setNameError("Por favor ingrese su nombre");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validar correo electrónico
    if (!email) {
      setEmailError("Por favor ingrese su correo electrónico");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Por favor ingrese un correo electrónico válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validar contraseña
    if (!password) {
      setPasswordError("Por favor ingrese una contraseña");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    } else if (!/\d/.test(password)) {
      setPasswordError("La contraseña debe contener al menos un número");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("La contraseña debe contener al menos un símbolo");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "La contraseña debe contener al menos una letra mayúscula"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Función auxiliar para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function irALogin() {
    navigation.navigate("Login");
  }

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);

      try {
        // Obtener los datos del archivo como un blob utilizando fetch
        const fileResponse = await fetch(fileUri);
        const fileBlob = await fileResponse.blob();

        // Mostrar la imagen seleccionada sin subirla a Firebase Storage
        setImageUri(fileUri);

        // Guardar la imagen en una variable para subirla posteriormente
        setFileBlob(fileBlob);
        setFileName(fileName);
      } catch (error) {
        console.error("Error al leer el archivo:", error);
      }
    } else {
      console.log(result);
    }
  };

  // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
  const handleUploadImage = async () => {
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const storageRef = storage.ref(fileName);

        // Subir el blob al Firebase Storage
        const uploadTask = storageRef.put(fileBlob);
        uploadTask.on(
          "state_changed",
          null,
          (error) => console.error(error),
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(`Imagen subida: ${downloadURL}`);

              // Actualizar la URL de la imagen en tu estado
              setImageUri(downloadURL);

              // Llamar a handlerUpdateProfile con la nueva imagen
              handleregister(downloadURL);
            });
          }
        );
      } else {
        handleregister("../assets/images/people.png");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleregister = async (imageURL) => {
    const isValid = validateFields();
    if (isValid) {
      setShowAlert(!showAlert);
      setShowAlertProgress(!showAlertProgress);
      setShowButton(false);
      setShowAlertTittle("Guardando usuario");
      setShowAlertMessage("Por favor espera...");
      try {
        // Aquí puedes hacer algo con la respuesta, como guardar un token de acceso en el almacenamiento local o en el estado global.
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Exito en el guardado");
        setShowAlertMessage("Se han guardado tus datos correctamente");
        setResponseExitoso(true);
      } catch (error) {
        console.log(
          "nombre " +
            name +
            "  email" +
            email +
            " pass " +
            password
        );
        console.error(error);
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Error en el guardado");
        setShowAlertMessage("Intentelo más tarde");
      }
    }
  };
  return (
    <SafeAreaView style={globalstyles.container}>
      <ImageBackground
        source={require("../assets/images/backgroundLogin.png")}
        style={registerStyles.imageback}
      >
        <View style={registerStyles.overlay}>
          <Text style={registerStyles.titleH}>CREACIÓN DE CUENTA</Text>
          <View style={registerStyles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={registerStyles.image} />
            ) : (
              <Image
                source={require("../assets/images/perfil.png")}
                style={registerStyles.image}
              />
            )}
            <TouchableOpacity
              style={registerStyles.addButton}
              onPress={handleChooseImage}
            >
              <Text style={registerStyles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

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
            navigation.navigate("Login");
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

      <View style={registerStyles.containerForm}>
        <Text style={registerStyles.title}>
          EMPIEZA A DISFRUTAR DEL SABOR UNIVERSITARIO
        </Text>
        <Text style={[typography.body, registerStyles.inputText]}>Nombre</Text>
        <Input
          placeholderText="Nombre "
          iconName="happy"
          onChangeText={setName}
        />
        {nameError !== "" && (
          <Text style={registerStyles.errorText}>{nameError}</Text>
        )}
        <Text style={[typography.body, registerStyles.inputText]}>
          Correo electronico
        </Text>
        <Input
          placeholderText="Email"
          iconName="mail"
          onChangeText={setEmail}
        />
        {emailError !== "" && (
          <Text style={registerStyles.errorText}>{emailError}</Text>
        )}
        <Text style={[typography.body, registerStyles.inputText]}>
          Contraseña
        </Text>
        <Input
          placeholderText="Contraseña"
          iconName="lock-closed"
          secureTextEntry
          onChangeText={setPassword}
        />
        {passwordError !== "" && (
          <Text style={registerStyles.errorText}>{passwordError}</Text>
        )}
        <ButtonPrymary onPress={handleUploadImage} text="Registrarme" />
        <ButtonText onPress={irALogin} text="Ya tienes cuenta?  Inicia sesión aqui" />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
