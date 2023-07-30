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
import ButtonText from "../components/ButtonText";
import { colors } from "../styles/colors";
import AwesomeAlert from "react-native-awesome-alerts";
import { storage } from "../utils/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import CustomHeader from "../components/CustomHeader";

const CrearCuentaFormScreen = ({ navigation, route }) => {
  const { fileBlob, fileName } = route.params;
  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  function irTabs() {
    navigation.navigate("TabsClientes");
  }

  // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
  const handleUploadImage = async () => {
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const filePath = `usuarios/${fileName}`;
        const storageRef = ref(storage, filePath);

        // Subir el blob al Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, fileBlob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observar eventos de cambio de estado como progreso, pausa y reanudación
            // Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el número total de bytes a subir
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Manejar errores de subida fallida
            console.error("Error al subir la imagen:", error);
          },
          () => {
            // Manejar subida exitosa en la finalización
            // Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              // Actualizar la URL de la imagen en tu estado
              setImageUri(downloadURL);

              // Llamar a handleregister con la nueva imagen
              handleregister(downloadURL);
            });
          }
        );
      } else {
        handleregister("../assets/images/perfil.png");
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

      const userData = {
        nombreCompleto: name,
        numeroTelefono: telefono,
        correo: email,
        password: password,
        enabled: true,
        direccion: "Calle Principal, Ciudad",
        estado: "Calle Principal, Ciudad",
        ciudad: "Calle Principal, Ciudad",
        curp: "Calle Principal, Ciudad",
        tipoUsuario: 1,
        fotoPerfil: imageURL,
        fechaRegistro: "2023-07-27T12:34:56",
        ultimaSesion: "2023-07-27T15:30:00",
        authorities: [
          {
            authority: "ROLE_USER",
          },
          {
            authority: "ROLE_ADMIN",
          },
        ],
      };

      try {
        // Realizar la solicitud de inicio de sesión a la API
        const response = await axios.post(
          "http://192.168.100.154:8080/api/auth/signup",
          userData
        );
        // Aquí puedes manejar la respuesta de la API según tus necesidades
        console.log(response.data); // O cualquier otra acción que desees realizar

        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Éxito en el guardado");
        setShowAlertMessage("Se han guardado tus datos correctamente");
        setResponseExitoso(true);
      } catch (error) {
        console.log("nombre " + name + "  email" + email + " pass " + password);
        console.error(error);
        setShowAlertProgress(false);
        setShowButton(true);
        setShowAlertTittle("Error en el guardado");
        setShowAlertMessage("Inténtelo más tarde");
      }
    }
  };

  return (
    <SafeAreaView style={globalstyles.container}>
      <ImageBackground
        source={require("../assets/images/baclregistro.png")}
        style={registerStyles.imageback}
      >
        <View style={registerStyles.overlay}>
          <CustomHeader/>
          <Text style={registerStyles.titleH}>TU INFORMACIÓN</Text>
          <Text style={registerStyles.subtitle}>
            Para terminar tu registro rellena el formulario
          </Text>
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
          placeholderText="vaz@gmail.com"
          iconName="mail"
          onChangeText={setEmail}
        />
        {emailError !== "" && (
          <Text style={registerStyles.errorText}>{emailError}</Text>
        )}
        <Text style={[typography.body, registerStyles.inputText]}>
          Telefono
        </Text>
        <Input
          placeholderText="+52 344 543 2345"
          iconName="call"
          onChangeText={setTelefono}
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
        <CustomButton title="Registrarse" onPress={handleUploadImage} />
        <ButtonText
          onPress={irALogin}
          text="¿Ya tienes cuenta?  Inicia sesión aqui"
        />
      </View>
    </SafeAreaView>
  );
};

export default CrearCuentaFormScreen;
