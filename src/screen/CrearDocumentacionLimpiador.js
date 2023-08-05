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
import BotonDocumentos from "../components/BotonDocumentos";
import * as DocumentPicker from 'expo-document-picker';

export default function CrearDocumentacionLimpiador({ route, navigation }) {

  const [selectedDocsCount, setSelectedDocsCount] = useState(0);
  const [selectedDocs, setSelectedDocs] = useState({});
  const defaultButtonTitles = {
    "INE": "INE",
    "CARTA ANTECEDENTES NO PENALES": "CARTA ANTECEDENTES NO PENALES",
    "COMPROBANTE DE DOMICILIO": "COMPROBANTE DE DOMICILIO",
    "CURP": "CURP",
  };

  const [fileDocBlob, setFileDocBlob] = useState([]);
  const [fileDocName, setFileDocName] = useState([]);
  const [documentUri, setDocumentUri] = useState([]);

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

  const handleChooseDocument = async (title) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types of documents. You can specify specific types if needed.
      });

      if (result.type === "success") {
        const fileUri = result.uri;
        const fileDocName = fileUri.substring(fileUri.lastIndexOf("/") + 1);

        // Convertir la URI a un Blob utilizando la función uriToBlob
        const fileDocBlob = await uriToBlob(fileUri);

        // Agregar el objeto de documento al array de documentos seleccionados
        setSelectedDocs(prevDocs => ({
          ...prevDocs,
          [title]: fileDocName,
        }));

        setSelectedDocsCount(prevCount => prevCount + 1);
      } else {
        console.log("Canceled");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  /////////////////////////////////////
  function irACrearCuentaFormLimpiador() {
    navigation.navigate("CrearCuentaFormLimpiador", {
      fileBlob: route.params.fileBlob,
      fileName: route.params.fileName,
      selectedDocs: selectedDocs,
      fileDocBlob: fileDocBlob,
      fileDocName: fileDocName,
    });
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/images/backtipo.png")}
        style={styles.imageback}
      >
        <View style={styles.overlay}>
          <View style={styles.imageContainer}>
            <Text style={styles.titleH}>DOCUMENTACIÓN</Text>
            <Text style={styles.subTitulo}>
              Para poderte registrar como DustBuster sube tu carta de
              antescedentes no penales
            </Text>
          </View>
        </View>
        {selectedDocsCount < 4 && (
          <>
            <View style={styles.botonI}>
              <BotonDocumentos title='INE' onPress={() => handleChooseDocument("INE")} selected={selectedDocs["INE"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
            <View style={styles.botonC}>
              <BotonDocumentos title="CARTA ANTECEDENTES NO PENALES" onPress={() => handleChooseDocument("CARTA ANTECEDENTES NO PENALES")} selected={selectedDocs["CARTA ANTECEDENTES NO PENALES"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
            <View style={styles.botonC2}>
              <BotonDocumentos title="COMPROBANTE DE DOMICILIO" onPress={() => handleChooseDocument("COMPROBANTE DE DOMICILIO")} selected={selectedDocs["COMPROBANTE DE DOMICILIO"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
            <View style={styles.botonC3}>
              <BotonDocumentos title="CURP" onPress={() => handleChooseDocument("CURP")} selected={selectedDocs["CURP"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
          </>
        )}
        {selectedDocsCount === 4 && (
        <>
        <View style={styles.containerForm}>
        <Text style={styles.subTitulo2}>
              DOCUMENTACIÓN COMPLETADA
            </Text>
          <ButtonLogin
            onPress={irACrearCuentaFormLimpiador}
            title="Continuar"
          />
        </View>
        </> )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  botonI: {
    alignItems: "center",
    justifyContent: "center",
    top: -50,
  },
  botonC: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
  },
  botonC2: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
  },
  botonC3: {
    alignItems: "center",
    justifyContent: "center",
    top: -49,
  },
  containerForm: {
    alignItems: "center",
    justifyContent: "center",
    top: -70,
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
  },
  subTitulo2: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 25
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
    fontSize: 35,
    marginTop: 40,
  },
  image: {
    width: 188,
    height: 210,
    marginTop: 40,
    marginBottom: 40,
  },
  image2: {
    marginTop: -80,
    marginRight: -170,
  },
});
