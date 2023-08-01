import React, { useState, useEffect } from "react";
import { globalstyles } from "../styles/globalstyles";
import { typography } from "../styles/typography";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import { registerStyles } from "../styles/Screens/registerStyles";
import Input from "../components/Input";
import ButtonPrymary from "../components/ButtonPrymary";
import axios from "axios";
import {
  getUserData,
  getUserToken,
  saveUserData,
  clearUserData,
} from "../utils/sessionStorage";
import { launchImageLibrary } from "react-native-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../styles/colors";
import { storage } from "../utils/firebaseConfig";
import CustomHeader from "../components/CustomHeader";

const EditProfileScreen = ({ navigation }) => {
  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState("");

  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");

  const [dataUser, setDataUser] = React.useState({});
  const [token, setToken] = useState("");

  // Función para seleccionar y mostrar la imagen sin subirla a Firebase Storage
  const handleChooseImage = async () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, async (response) => {
      if (response.assets[0].uri) {
        const fileUri = response.assets[0].uri;
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
        console.log(response);
      }
    });
  };

  // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
  const handleUploadImage = async () => {
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const filePath = `usuarios/${fileName}`;
        const storageRef = ref(storage, filePath);

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
              handlerUpdateProfile(downloadURL);
            });
          }
        );
      } else {
        handlerUpdateProfile(dataUser.imagen);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handlerUpdateProfile = async (imageURL) => {
    handleUploadImage;

    setShowAlert(!showAlert);
    setShowAlertProgress(!showAlertProgress);
    setShowButton(false);
    setShowAlertTittle("Actualizando información");
    setShowAlertMessage("Por favor espera...");

    try {
      const response = await axios.put(
        "https://keen-napier.68-168-208-58.plesk.page/api/Usuarios",
        {
          tbUsuarioId: dataUser.tbUsuarioId,
          nombre: name,
          correo: email,
          fechaReg: dataUser.fechaReg,
          ultimaActividad: dataUser.ultimaActividad,
          estatus: dataUser.estatus,
          uid: dataUser.uid,
          idOpenP: dataUser.idOpenP,
          imagen: imageURL,
          password: dataUser.password,
          telefono: telefono,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
          },
        }
      );
      await clearUserData();
      saveUserData(response.data);
      setShowAlertProgress(false);
      setShowButton(true);
      setShowAlertTittle("Exito en el guardado");
      setShowAlertMessage("Se ha actualizado su perfil correctamente");
      setResponseExitoso(true);
    } catch (error) {
      console.log(
        "nombre " +
          name +
          "  apPat" +
          appat +
          "  apMat" +
          apmat +
          "  email" +
          email
      );
      console.error(error);
      setShowAlertProgress(false);
      setShowButton(true);
      setShowAlertTittle("Error en el guardado");
      setShowAlertMessage("Intentelo más tarde");
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await getUserData();
        setDataUser(userData);
        setName(userData.nombreCompleto);
        setEmail(userData.correo);
        setImageUri(userData.fotoPerfil);
        setTelefono(userData.numeroTelefono);
      } catch (error) {
        console.log("Error al cargar el perfil:", error);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const userToken = await getUserToken();
      console.log(userToken);
      setToken(userToken);
    };

    loadToken();
  }, [navigation]);

  return (
    <SafeAreaView style={globalstyles.container}>
      <ScrollView style={globalstyles.scroll}>
        <CustomHeader />

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
              navigation.navigate("MainScreen");
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

        <Text style={typography.heading1}>Editar cuenta</Text>

        <Text style={typography.captionC}>
          Introduce los datos que vas a actualizar
        </Text>
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

        <Text style={[typography.body, registerStyles.inputText]}>Nombre</Text>
        <Input
          placeholderText="Nombre"
          iconName="happy"
          onChangeText={setName}
          defaultValue={name}
        />
        <Text style={[typography.body, registerStyles.inputText]}>
          Apellido Paterno
        </Text>
        <Text style={[typography.body, registerStyles.inputText]}>
          Correo electronico
        </Text>
        <Input
          placeholderText="Email"
          iconName="mail"
          onChangeText={setEmail}
          defaultValue={email}
        />

        <Text style={[typography.body, registerStyles.inputText]}>
          Telefono
        </Text>
        <Input
          placeholderText="Telefono"
          iconName="call"
          onChangeText={setTelefono}
          defaultValue={telefono}
        />

        <ButtonPrymary onPress={handleUploadImage} text="Editar" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
