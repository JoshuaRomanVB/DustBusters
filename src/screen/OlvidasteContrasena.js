import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
const OlvidasteContrasena = () => {
	const [correoValido, setCorreoValido] = React.useState(true);
	const [showErrors, setShowErrors] = React.useState(false);
  
	const handleValidarCorreo = (correo) => {
	  // Expresión regular para validar el correo electrónico
	  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  setCorreoValido(regexCorreo.test(correo));
	};
  
	const formik = useFormik({
	  initialValues: {
		correo: "",
	  },
	  validationSchema: Yup.object({
		correo: Yup.string()
		  .required("El correo electrónico es obligatorio")
		  .email("El correo electrónico no es válido"),
	  }),
	  onSubmit: (values) => {
		// Aquí puedes manejar el envío del correo de recuperación de contraseña
		console.log("Correo a enviar:", values.correo);
		// Tu lógica para enviar el correo aquí...
	  },
	});
  
	const handleEnviar = () => {
	  // Cuando se presiona el botón de "Enviar", marcamos la variable showErrors como verdadera
	  setShowErrors(true);
	  // Si el formulario es válido, realizamos el envío del correo
	  if (formik.isValid) {
		formik.handleSubmit();
	  }
	};

  return (
    <ImageBackground
      source={require("../../src/assets/images/contra.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      {/* Cortina de color con opacidad */}
      <View style={styles.overlay} />
      <CustomHeader />
      <View style={styles.containerT}>
        {/* Contenedor para el texto title */}
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>
            ¡Oh no, no te asustes, olvidaste tu contraseña!
          </Text>
        </View>

        {/* Texto subtitle */}
        <View style={styles.containerS}>
          <Text style={styles.textSubtitle}>
            Rellena el formulario para recuperar tu contraseña
          </Text>
        </View>

        {/* Contenedor para el texto Código y botón */}
        <View style={styles.codigoContainer}>
          <Text style={styles.textCodigo}>Correo</Text>
          <TextInput
            placeholder="misterio367@gmail.com"
            style={[
              styles.inputText,
              showErrors && !correoValido && styles.inputTextInvalid, // Establece el estilo cuando el correo no es válido después de enviar
            ]}
            autoCapitalize="none"
            onChangeText={formik.handleChange("correo")} // Actualiza el estado correo cuando se cambie el texto
            onBlur={() => {
              handleValidarCorreo(formik.values.correo);
              // Al salir del campo, marcamos la variable showErrors como verdadera para que se muestren los errores si los hay
              setShowErrors(true);
            }}
            value={formik.values.correo} // Establece el valor del campo de entrada al estado correo
          />
          {showErrors && formik.errors.correo && (
            <Text style={styles.error}>{formik.errors.correo}</Text>
          )}
          <CustomButton title={"Enviar"} onPress={handleEnviar} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  containerT: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerS: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
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
    marginVertical: 10,
  },
  codigoContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    width: 350,
    borderRadius: 20,
    padding: 10,
  },
  textCodigo: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 60,
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
    height: 60,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    paddingStart: 20,
    borderColor: "#000", // Cambia el color del borde aquí
    borderWidth: 2, // Asegúrate de especificar el ancho del borde
    width: 300,
  },
  error: {
    color: "#F70303",
    textAlign: "center",
  },
});

export default OlvidasteContrasena;
