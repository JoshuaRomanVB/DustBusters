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
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebaseConfig';
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../styles/colors";
import CustomHeader from "../components/CustomHeader";
import Constants from "expo-constants";

const EditProfileScreen = ({ navigation }) => {
  const baseUrl = Constants.manifest.extra.baseUrl;
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
        // Convertir la URI a un Blob utilizando la función uriToBlob
        const fileBlob = await uriToBlob(fileUri);
  
        // Mostrar la imagen seleccionada sin subirla a Firebase Storage
        setImageUri(fileUri);
  
        // Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
        setFileBlob(fileBlob);
        setFileName(fileName);
      } catch (error) {
        console.error("Error al leer el archivo:", error);
      }
    } else {
      console.log(result);
    }
  };
  
  // Agrega esta función al mismo archivo o importa desde el archivo donde se define
  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.onload = function () {
        resolve(xhr.response);
      };
  
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
  
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
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
					'state_changed',
					(snapshot) => {
						// Observar eventos de cambio de estado como progreso, pausa y reanudación
						// Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el número total de bytes a subir
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						// Manejar errores de subida fallida
						console.error('Error al subir la imagen:', error);
					},
					() => {
						// Manejar subida exitosa en la finalización
						// Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								console.log('File available at', downloadURL);

								// Actualizar la URL de la imagen en tu estado
								setImageUri(downloadURL);

								// Llamar a handleregister con la nueva imagen
								handlerUpdateProfile(downloadURL);
							}
						);
					}
				);
			} else {
				handlerUpdateProfile('../assets/images/perfil.png');
			}
		} catch (error) {
			console.error('Error al subir la imagen:', error);
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
      console.log( baseUrl + '/api/usuarios/' + dataUser.userId)

      const data ={
        userId: dataUser.userId,
        correo: email,
        nombreCompleto: name,
        numeroTelefono: telefono,
        password: dataUser.password,
        enabled: true,
        tipoUsuario: dataUser.tipoUsuario,
        fotoPerfil: imageURL,
        fechaRegistro: dataUser.fechaRegistro,
        authorities: [
          {
            id: 1,
            authority: "ROLE_ADMIN",
            userId: dataUser.userId, // Cambia esto con el ID correcto del usuario
          },
        ],
      }
      console.log(data)
      const response = await axios.put(
        baseUrl + '/api/usuarios/' + dataUser.userId, data,
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
