import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AwesomeAlert from "react-native-awesome-alerts";
import { storage } from "../utils/firebaseConfig";
import Constants from "expo-constants";
import { LogBox } from 'react-native';

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import axios from "axios";
import { colors } from "../styles/colors";
import { getUserData, getUserToken } from "../utils/sessionStorage";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const windowHeight = Dimensions.get("window").height;

const CrearServicio = (props) => {

  const baseUrl = Constants.manifest.extra.baseUrl;
  const { navigation } = props;
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const [responseExitoso, setResponseExitoso] = useState(false);

  const [fileBlob, setFileBlob] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [fileBlobError, setFileBlobError] = useState("");
  const [descripcionServicioError, setDescripcionServicioError] = useState("");
  const [tamanoError, setTamanoError] = useState("");
  const [plantasError, setPlantasError] = useState("");
  const [ofertaClienteError, setOfertaClienteError] = useState("");
  const [direccionError, setDireccionError] = useState("");
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");
  const [horaInicioError, setHoraInicioError] = useState("");
  const [horaFinError, setHoraFinError] = useState("");
  const [fechaError, setFechaError] = useState("");

  //Alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertProgress, setShowAlertProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showAlertTittle, setShowAlertTittle] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const [descripcionServicio, setDescripcionServicio] = useState("");
  const [tamano, setTamano] = useState("");
  const [plantas, setPlantas] = useState("");
  const [ofertaCliente, setOfertaCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [fecha, setFecha] = useState(new Date());



useEffect(() => {
	LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, []);

  const handleDateSelect = (date) => {
    setFecha(date);
    console.log(date);
  };

  const handleHoraInicioSelect = (date) => {
    setHoraInicio(date);
    console.log(date);
  };
  const handleHoraFinSelect = (date) => {
    setHoraFin(date);
    console.log(date);
  };
  const [mapRegion, setMapRegion] = useState(null); // Establecemos el estado inicial como null
  useEffect(() => {
    const loadToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
    };
    const loadUserId = async () => {
      const userData = await getUserData();
      const id = userData.authorities[0].userId;
      //console.log('userDAta: ', userData.authorities[0].userId);
      setUserId(id);
    };
    loadUserId();
    loadToken();
  }, []);

  const validateFields = () => {
    let isValid = true;

    // Validar descripcionServicio
    if (!descripcionServicio) {
      setDescripcionServicioError(
        "Por favor ingrese la descripcion del Servicio"
      );
      isValid = false;
    } else {
      setDescripcionServicioError("");
    }

    // Validar tamano del inmueble
    if (!tamano) {
      setTamanoError("Por favor ingrese el tamano del inmueble");
      isValid = false;
    } else {
      setTamanoError("");
    }

    // Validar las plantas del inmueble
    if (!plantas) {
      setPlantasError("Por favor ingrese las plantas del inmueble");
      isValid = false;
    } else {
      setPlantasError("");
    }

    // Validar tamano del inmueble
    if (!ofertaCliente) {
      setOfertaClienteError("Por favor ingrese el tamaño del inmueble");
      isValid = false;
    } else {
      setOfertaClienteError("");
    }

    // Validar lat
    if (!lat) {
      setLatError("Por favor ingrese una ubicación");
      isValid = false;
    } else {
      setLatError("");
    }
    // Validar lat
    if (!fileBlob) {
		setFileBlobError("Por favor ingrese una imagen");
		isValid = false;
	  } else {
		setFileBlobError("");
	  }
  
    if (!fecha) {
      setFechaError("Por favor ingrese una fecha valida");
      isValid = false;
    } else {
      setFechaError("");
    }
    if (!horaInicio) {
      setHoraInicioError("Por favor ingrese una ubicación");
      isValid = false;
    } else {
      setHoraInicioError("");
    }
    if (!horaFin) {
      setHoraFinError("Por favor ingrese una ubicación");
      isValid = false;
    } else {
      setHoraFinError("");
    }
    const currentDate = new Date();
    if (fecha < currentDate) {
      setFechaError("La fecha no puede ser antes de la fecha actual");
      isValid = false;
    } else {
      setFechaError("");
    }

    // Validar horaInicio: No puede ser antes de la hora fin
    if (horaInicio >= horaFin) {
      setHoraInicioError(
        "La hora de inicio no puede ser igual o posterior a la hora fin"
      );
      isValid = false;
    } else {
      setHoraInicioError("");
    }
    return isValid;
  };

  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
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

  // Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
  const handleUploadImage = async () => {
    try {
      // Verificar si hay una imagen seleccionada para subir
      if (fileBlob && fileName) {
        // Crear una referencia al archivo en Firebase Storage
        const filePath = `servicios/${fileName}`;
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
        console.log("error al subir la imagen");
		handleregister();
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
      setShowAlertTittle("Subiendo servicio");
      setShowAlertMessage("Por favor espera...");

      try {
        // Segunda petición: Guardar datos del servicio en tu API
        const servicioData = {
          cliente: { userId: userId },
          descripcionServicio: descripcionServicio,
          urlImagenServicio: imageURL,
          tamanoInmueble: tamano,
          plantas: plantas,
          ofertaCliente: ofertaCliente,
          ofertaAceptada: null,
          fechaServicio: fecha,
          horaInicio: horaInicio,
          horaFin: horaFin,
          latitud: lat,
          longitud: long,
          direccion: direccion,
          estado: 0,
        };

        const url = baseUrl + "/api/servicios";
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
    } else {
      console.log(
        "Debes completar todos los campos antes de enviar el formulario o hay campos inválidos."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../src/assets/images/crearServicio.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <CustomHeader />
      <View style={styles.containerT}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Crear Servicio</Text>
        </View>
        <View style={styles.containerS}>
          <Text style={styles.textSubtitle}>
            Para crear tu servicio rellena el formulario
          </Text>
        </View>
		<KeyboardAwareScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
          <Text style={styles.textCodigo}>Descripción del servicio</Text>
          <TextInput
            placeholder="Descripción del servicio"
            style={[styles.inputText]}
            autoCapitalize="none"
            onChangeText={(text) => {
              setDescripcionServicio(text);
            }}
          />
          {descripcionServicioError !== "" && (
            <Text style={styles.errorText}>{descripcionServicioError}</Text>
          )}
          <Text style={styles.textCodigo}>Tamaño del inmueble</Text>
          <TextInput
            placeholder="90m2"
            style={[styles.inputText]}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(text) => {
              setTamano(text);
            }}
          />
          {tamanoError !== "" && (
            <Text style={styles.errorText}>{tamanoError}</Text>
          )}
          <Text style={styles.textCodigo}>Plantas</Text>
          <TextInput
            placeholder="3 plantas"
            style={[styles.inputTextDetalle]}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(text) => {
              setPlantas(text);
            }}
          />
          {tamanoError !== "" && (
            <Text style={styles.errorText}>{tamanoError}</Text>
          )}
          <Text style={styles.textCodigo}>Oferta del pago</Text>
          <TextInput
            placeholder="$3000"
            style={[styles.inputText]}
            autoCapitalize="none"
            keyboardType="decimal-pad"
            //skeyboardType='numeric'
            onChangeText={(text) => {
              setOfertaCliente(text);
            }}
          />
		   {ofertaClienteError !== "" && (
            <Text style={styles.errorText}>{ofertaClienteError}</Text>
          )}
          <Text style={styles.textCodigo}>Fecha del servicio</Text>
          <DatePicker onSelectDate={handleDateSelect} />
		  {fechaError !== "" && (
            <Text style={styles.errorText}>{fechaError}</Text>
          )}
          <Text style={styles.textCodigo}>Hora inicio</Text>
          <TimePicker onSelectTime={handleHoraInicioSelect} />
		  {horaInicioError !== "" && (
            <Text style={styles.errorText}>{horaInicioError}</Text>
          )}
          <Text style={styles.textCodigo}>Hora fin</Text>
          <TimePicker onSelectTime={handleHoraFinSelect} />
		  {horaFinError !== "" && (
            <Text style={styles.errorText}>{horaFinError}</Text>
          )}
          <Text style={styles.textCodigo}>Dirección</Text>
          <View>
            <GooglePlacesAutocomplete
              placeholder="Dirección"
              onPress={(data, details = null) => {
                const { lat, lng } = details.geometry.location;
                console.log("Latitud:", lat);
                console.log("Longitud:", lng);
                console.log(data.structured_formatting.main_text);
                //console.log(data);
                setLat(lat);
                setLong(lng);
                setDireccion(data.structured_formatting.main_text);

                // Aquí se actualiza mapRegion con la nueva ubicación seleccionada
                setMapRegion({
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lng),
                  latitudeDelta: 0.022,
                  longitudeDelta: 0.022,
                });
              }}
              query={{
                key: "AIzaSyBhwh4Asc15hyRD-a6WmVXLCva6KUfg27s", // Reemplaza con tu clave de API de Google
                language: "es", // Opcional, define el idioma de los resultados
                components: "country:mx", // Restringe los resultados a México (código ISO 3166-1 alfa-2 para México)
              }}
              styles={{
                container: { flex: 0 },
                textInput: styles.inputText,
                listView: { backgroundColor: "#F8F8F8" },
                separator: { backgroundColor: "#E6303C" },
              }}
              fetchDetails
              currentLocation={false}
            />
          </View>
		  {latError !== "" && (
            <Text style={styles.errorText}>{latError}</Text>
          )}
          {lat !== "" && long !== "" ? (
            <View style={styles.containerMap}>
              <MapView
                style={styles.map}
                region={mapRegion} // Usamos el estado mapRegion para establecer la región del mapa
                onRegionChange={(region) => setMapRegion(region)} // Actualizamos el estado mapRegion cuando cambia la región del mapa
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(long),
                  }}
                  title="Ubicación seleccionada"
                  description={direccion}
                />
              </MapView>
            </View>
          ) : null}

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : null}
	
          <TouchableOpacity onPress={handleChooseImage} style={styles.button}>
            <Text style={styles.buttonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>
	    {fileBlobError !== "" && (
            <Text style={styles.errorText}>{fileBlobError}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleUploadImage}>
            <Text style={styles.buttonText}>Crear Servicio</Text>
          </TouchableOpacity>
          {/* Espacio en blanco */}
          <View style={styles.bottomSpace} />
		  </KeyboardAwareScrollView>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flexGrow: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  containerT: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.2,
  },
  containerS: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    paddingBottom: 20,
  },
  titleContainer: {
    position: "absolute",
    top: windowHeight * -0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textSubtitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textCodigo: {
    fontSize: 16,
    color: "#E6303C",
    fontWeight: "bold",
    alignSelf: "flex-start",
    padding: 2,
  },
  button: {
    width: "100%",
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6303C",
    color: "#090808",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputText: {
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    paddingStart: 20,
    borderColor: "#000",
    borderWidth: 2,
    width: "100%",
  },
  inputTextDetalle: {
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    paddingStart: 20,
    borderColor: "#000",
    borderWidth: 2,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  containerMap: {
    flex: 1,
    width: "100%",
    height: 200,
    alignSelf: "flex-start",
    borderRadius: 30,
    marginTop: 10,
  },
  bottomSpace: {
    marginBottom: 50,
  },
  image: {
    width: 375,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
});

export default CrearServicio;
