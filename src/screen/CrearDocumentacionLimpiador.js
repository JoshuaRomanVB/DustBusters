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

  const [dataUser, setDataUser] = React.useState({});
  const [selectedDocsCount, setSelectedDocsCount] = useState(0);
  const [selectedDocs, setSelectedDocs] = useState({});
  const defaultButtonTitles = {
    "INE": "INE",
    "CARTA ANTECEDENTES NO PENALES": "CARTA ANTECEDENTES NO PENALES",
    "COMPROBANTE DE DOMICILIO": "COMPROBANTE DE DOMICILIO",
    "CURP": "CURP",
  };

  const [selectedIne, setSelectedIne] = useState(0);
  const [selectedAntecedentes, setSelectedAntecedetes] = useState(0);
  const [selectedDomicilio, setSelectedDomicilio] = useState(0);
  const [selectedCurp, setSelectedCurp] = useState(0);

  const [fileDocBlob, setFileDocBlob] = useState([]);
  const [fileDocName, setFileDocName] = useState([]);
  const [documentUri, setDocumentUri] = useState([]);

  const [fileDocBlobAntecedentes, setFileDocBlobAntecedentes] = useState([]);
  const [fileDocNameAntecedentes, setFileDocNameAntecedentes] = useState([]);
  const [documentUriAntecedentes, setDocumentUriAntecedentes] = useState([]);

  const [fileDocBlobDomicilio, setFileDocBlobDomicilio] = useState([]);
  const [fileDocNameDomicilio, setFileDocNameDomicilio] = useState([]);
  const [documentUriDomicilio, setDocumentUriDomicilio] = useState([]);

  const [fileDocBlobCurp, setFileDocBlobCurp] = useState([]);
  const [fileDocNameCurp, setFileDocNameCurp] = useState([]);
  const [documentUriCurp, setDocumentUriCurp] = useState([]);

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
        setSelectedIne(1);
        
      // Mostrar la imagen seleccionada sin subirla a Firebase Storage
      setDocumentUri(fileUri);

      // Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
      setFileDocBlob(fileDocBlob);
      setFileDocName(fileDocName);
      } 
      else {
        console.log("Canceled");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  const handleChooseDocumentAntecedentes = async (title) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types of documents. You can specify specific types if needed.
      });

      if (result.type === "success") {
        const fileUri = result.uri;
        const fileDocNameAntecedentes = fileUri.substring(fileUri.lastIndexOf("/") + 1);

        // Convertir la URI a un Blob utilizando la función uriToBlob
        const fileDocBlobAntecedentes = await uriToBlob(fileUri);

        // Agregar el objeto de documento al array de documentos seleccionados
        setSelectedDocs(prevDocs => ({
          ...prevDocs,
          [title]: fileDocNameAntecedentes,
        }));
        setSelectedDocsCount(prevCount => prevCount + 1);
        setSelectedAntecedetes(1);
        
      // Mostrar la imagen seleccionada sin subirla a Firebase Storage
      setDocumentUriAntecedentes(fileUri);

      // Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
      setFileDocBlobAntecedentes(fileDocBlobAntecedentes);
      setFileDocNameAntecedentes(fileDocNameAntecedentes);
      } 
      else {
        console.log("Canceled");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  const handleChooseDocumentDomicilio = async (title) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types of documents. You can specify specific types if needed.
      });

      if (result.type === "success") {
        const fileUri = result.uri;
        const fileDocNameDomicilio = fileUri.substring(fileUri.lastIndexOf("/") + 1);

        // Convertir la URI a un Blob utilizando la función uriToBlob
        const fileDocBlobDomicilio = await uriToBlob(fileUri);

        // Agregar el objeto de documento al array de documentos seleccionados
        setSelectedDocs(prevDocs => ({
          ...prevDocs,
          [title]: fileDocNameDomicilio,
        }));
        setSelectedDocsCount(prevCount => prevCount + 1);
        setSelectedDomicilio(1);
        
      // Mostrar la imagen seleccionada sin subirla a Firebase Storage
      setDocumentUriDomicilio(fileUri);

      // Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
      setFileDocBlobDomicilio(fileDocBlobDomicilio);
      setFileDocNameDomicilio(fileDocNameDomicilio);
      } 
      else {
        console.log("Canceled");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  const handleChooseDocumentCurp = async (title) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types of documents. You can specify specific types if needed.
      });

      if (result.type === "success") {
        const fileUri = result.uri;
        const fileDocNameCurp = fileUri.substring(fileUri.lastIndexOf("/") + 1);

        // Convertir la URI a un Blob utilizando la función uriToBlob
        const fileDocBlobCurp = await uriToBlob(fileUri);

        // Agregar el objeto de documento al array de documentos seleccionados
        setSelectedDocs(prevDocs => ({
          ...prevDocs,
          [title]: fileDocNameCurp,
        }));
        setSelectedDocsCount(prevCount => prevCount + 1);
        setSelectedCurp(1);
        
      // Mostrar la imagen seleccionada sin subirla a Firebase Storage
      setDocumentUriCurp(fileUri);

      // Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
      setFileDocBlobCurp(fileDocBlobCurp);
      setFileDocNameCurp(fileDocNameCurp);
      } 
      else {
        console.log("Canceled");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  };

  /////////////////////////////////////
  function irACrearCuentaFormLimpiador() {
    navigation.navigate("Login");
    console.log("DOC: ",fileDocBlob)
    console.log("SELECTED: ",selectedDocs)
    console.log("DOC NAME", fileDocName);

    console.log("CARTA DE ANTECEDENTES: ",fileDocBlobAntecedentes)
    console.log("DOC NAME ANTECEDENTES", fileDocNameAntecedentes);

    console.log("DOC DOMICILIO: ",fileDocBlobDomicilio)
    console.log("DOC NAME DOMICILIO", fileDocNameDomicilio);

    console.log("DOC CURP: ",fileDocBlobCurp)
    console.log("DOC NAME CURP", fileDocNameCurp);
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
          {selectedIne < 1 && (
            <>
            <View style={styles.botonI}>
              <BotonDocumentos title="INE" onPress={() => handleChooseDocument("INE")} selected={selectedDocs["INE"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
            </>
          )}
          {selectedAntecedentes < 1 && (
            <>
            <View style={styles.botonC}>
              <BotonDocumentos title="CARTA ANTECEDENTES NO PENALES" onPress={() => handleChooseDocumentAntecedentes("CARTA ANTECEDENTES NO PENALES")} selected={selectedDocs["CARTA ANTECEDENTES NO PENALES"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
            </>
          )}  
            {selectedDomicilio < 1 && (
              <>
              <View style={styles.botonC2}>
              <BotonDocumentos title="COMPROBANTE DE DOMICILIO" onPress={() => handleChooseDocumentDomicilio("COMPROBANTE DE DOMICILIO")} selected={selectedDocs["COMPROBANTE DE DOMICILIO"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
              </>
            )}
            {selectedCurp < 1 && (
              <>
              <View style={styles.botonC3}>
              <BotonDocumentos title="CURP" onPress={() => handleChooseDocumentCurp("CURP")} selected={selectedDocs["CURP"]} defaultButtonTitles={defaultButtonTitles} />
            </View>
              </>
            )}
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
