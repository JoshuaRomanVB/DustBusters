/**
 * Formulario login.
 * Autor: Joshua Roman Vazquez Benitez
 * Fecha: 7/7/2023
 */

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../CustomButton";
import Input from "../Input";
import { colors } from "../../styles/colors";
import { color } from "react-native-reanimated";
import axios from 'axios';
import {
  saveUserId,
  saveUserData,
  saveUserToken,
  getUserData
} from '../../utils/sessionStorage';
import Constants from 'expo-constants';
/**
Componente de formulario de inicio de sesión
Este componente muestra un formulario de inicio de sesión con campos de correo electrónico y contraseña.
También maneja la validación del formulario y la autenticación del usuario.
@param {Object} props - Propiedades del componente.
@param {Object} props.navigation - Objeto de navegación de React Navigation.
@returns {JSX.Element} - Elemento JSX que representa el formulario de inicio de sesión.
*/

export default function LoginForm(props) {
  const { navigation } = props;
  const [error, setError] = useState("");
  const baseUrl = Constants.manifest.extra.baseUrl;
  
  useEffect(() => {
    // Función asincrónica para verificar los datos de usuario almacenados en el AsyncStorage
    const checkUserData = async () => {
      try {
        // Obtener los datos de usuario almacenados en el AsyncStorage
        const userData = await getUserData();

        // Verificar si hay datos de usuario almacenados
        if (userData) {
          // Si hay datos de usuario, navegar directamente a "TabsClientes"
          navigation.navigate("TabsClientes");
        } else {
          // Si no hay datos de usuario, navegar a la pantalla de inicio de sesión
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
        // En caso de error al obtener los datos del usuario, navegar a la pantalla de inicio de sesión por precaución
        navigation.navigate("Login");
      }
    };

    // Llamar a la función de verificación al cargar el componente
    checkUserData();
  }, [navigation]);
    
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formData) => {
      setError("");
      const { email, password} = formData;
  
      try {
        // Realizar la solicitud de inicio de sesión a la API
        const response = await axios.post(baseUrl + '/api/auth/signin', {
          correo: email,
          password: password,
        });
        saveUserId(response.data.usuario.userId.toString());
        saveUserData(response.data.usuario);
        saveUserToken(response.data.token);
   
        // Aquí puedes manejar la respuesta de la API según tus necesidades
        console.log(response.data); // O cualquier otra acción que desees realizar
  
        // Por ejemplo, si el inicio de sesión fue exitoso y recibiste un token de acceso, podrías guardar ese token en el almacenamiento local o en una cookie para futuras solicitudes a la API.
  
        if (response.data.usuario.tipoUsuario === 1) {
          // Si el tipoUsuario es igual a 1, navegar a la pantalla TabsClientes
          navigation.navigate("TabsClientes");
        } else {
          // De lo contrario, puedes navegar a otra pantalla (por ejemplo, TabsLimpiador) o realizar otra lógica según tus necesidades
          // navigation.navigate("TabsLimpiador");
        }
      } catch (error) {
        // Si ocurre un error en la solicitud, puedes manejarlo aquí
        console.error('Error al iniciar sesión:', error);
        setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      }
    },
  });

  /**
Función para establecer los valores iniciales del formulario.
@returns {Object} - Objeto con los valores iniciales del formulario.
*/

  function initialValues() {
    return {
      email: "",
      password: "",
    };
  }

  /**

Función para establecer el esquema de validación del formulario.
@returns {Object} - Objeto con el esquema de validación del formulario.
*/
  function validationSchema() {
    return {
      password: Yup.string().required("La contraseña es obligatorio"),
      email: Yup.string().required("El correo electrónico es obligatorio").email("El correo electrónico no es válido"),
    };
  }

  function irACrearCuenta() {
    navigation.navigate("CrearCuentaTipo");
  }

  function irAOlvidaste() {
    navigation.navigate("Olvide");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/backlogin.png")}
        style={styles.imageback}
      >
        <View style={styles.overlay}>
        <View style={styles.imageContainer}>
        <Text style={styles.titleH}>DustBusters</Text>
              <Image
                source={require("../../assets/images/logoapp.png")}
                style={styles.image}
              />
        
  
          </View>
        </View>
      </ImageBackground>

      <View style={styles.containerForm}>
        <Text style={styles.text}>Email</Text>
        <Input
          placeholderText="Ingresa tu correo"
          value={formik.values.email}
          iconName="happy"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
        {formik.errors.email !== "" && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}
        <Text style={styles.text}>Contraseña</Text>
        <Input
          placeholderText="Ingrese su contraseña"
          value={formik.values.password}
          secureTextEntry={true}
          autoCapitalize="none"
          iconName="lock-closed"
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        {formik.errors.password !== "" && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
        <TouchableOpacity onPress={irAOlvidaste}>
          <Text style={styles.olvide}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <CustomButton title="Iniciar sesión" onPress={formik.handleSubmit} />
        <Text style={styles.error}>{error}</Text>
        <View style={styles.signupContainer}>
          <TouchableOpacity onPress={irACrearCuenta}>
            <Text style={styles.signupText}>
              ¿No tienes una cuenta?{" "}
              <Text style={styles.signupLink}>Registrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#F70303",
    textAlign: "center",
  },
  background: {
    height: "50%",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  containerForm: {
    backgroundColor: "#FFF",
    position: "absolute",
    paddingVertical : 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  title: {
    marginVertical: 20,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    paddingHorizontal: 20,
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
    marginTop: 80,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  imageback: {
    flex: 1,
    resizeMode: "cover",
  },
  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    textAlign: "center",
  },
  signupLink: {
    fontWeight: "bold",
    color: colors.primary,
  },
  olvide: {
    fontWeight: "bold",
    color:  colors.primary,
    textAlign: "right",
    paddingHorizontal: 20,
    marginVertical:10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 188,
    height: 210,
  },
  titleH: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 34,
    marginTop: 70,
  },
});
