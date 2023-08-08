import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import ButtonLogin from "../components/ButtonCrear";
import CustomHeader from "../components/CustomHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import * as ImagePicker from "expo-image-picker";
import Constants from 'expo-constants';


export default function CrearClienteFoto({ navigation }) {
  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const baseUrl = Constants.manifest.extra.baseUrl;

  function irACrearCuentaForm() {
    navigation.navigate("CrearCuentaForm", {
      fileBlob: fileBlob,
      fileName: fileName,
    });
  }

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


  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/images/backtipo.png")}
        style={styles.imageback}
      >
        <View style={styles.overlay}>
          <CustomHeader />
          <View style={styles.imageContainer}>
            <Text style={styles.titleH}>¡BIENVENIDO CLIENTE!</Text>
            <Text style={styles.subTitulo}>
              Esperamos que tu experiencia sea de lo mejor
            </Text>
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
              {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.image} />
          ) : (
            <Image
            source={require("../assets/images/logoapp.png")}
            style={styles.image}
          />
          )}
             
                <TouchableOpacity
                  onPress={handleChooseImage}
                  style={styles.addButton}
                >
                  <Image
                    source={require("../assets/images/plus.png")}
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.subTitulo}>
                Agrega una foto para que los DustBusters confíen en ti
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerForm}>
          <ButtonLogin onPress={irACrearCuentaForm} title="Continuar" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  containerSvg: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  fondoLogin: {
    top: 150,
  },
  containerForm: {
    alignItems: "center",
    justifyContent: "center",
    top: -20,
  },
  titulo: {
    fontSize: 70,
    color: "#848484",
    fontWeight: "bold",
    top: -20,
  },
  subTitulo: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    marginTop: 25,
    marginHorizontal: 10,
  },
  inputText: {
    height: 60,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    paddingStart: 20,
  },
  text2: {
    fontSize: 15,
    color: "#848484",
    marginTop: 10,
    marginBottom: 10,
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    position: "relative",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
  image: {
    width: 188,
    height: 210,
    borderRadius: 90
  },
  image2: {
    marginTop: -20,
    marginRight: -20,
  },
  
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    position: "relative",
  },

  imageWrapper: {
    flexDirection: "row", // Establece los elementos en una fila horizontal
    alignItems: "center", // Alinea los elementos verticalmente en el centro
    marginTop: 20, // Mueve el contenedor ligeramente hacia arriba si es necesario
  },

  image: {
    width: 188,
    height: 210,
    borderRadius:180
  },

  addButton: {
    marginLeft: 20, // Agrega un espacio entre la imagen y el botón "más"
  },
});
