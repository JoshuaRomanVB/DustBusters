import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../components/Auth/LoginForm";
import Navigation from "./Tabs";
import CrearCuentaTipo from "../screen/CrearCuentaTipo";
import CrearLimpiadorFoto from "../screen/CrearLimpiadorFoto";
import CrearClienteFoto from "../screen/CrearClienteFoto";
import CrearCuentaFormScreen from "../screen/CrearCuentaFormScreen";
import OlvidasteContrasena from "../screen/OlvidasteContrasena";
import CrearDocumentacionLimpiador from "../screen/CrearDocumentacionLimpiador";
import CreditCardsScreen from "../screen/CreditCardsScreen";
import CreateCreditCardsScreen from "../screen/CreateCreditCardsScreen";
import Calificaciones from "../screen/Calificaciones";
import MisSolicitudes from "../screen/MisSolicitudes";
import CrearServcio from "../screen/CrearServicio";
import DetalleServicio from "../screen/DetalleServicio";
import Chat from "../screen/Chat";

export default function NavigationAccount() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={Navigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearCuentaTipo"
        component={CrearCuentaTipo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearLimpiadorFoto"
        component={CrearLimpiadorFoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearClienteFoto"
        component={CrearClienteFoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearCuentaForm"
        component={CrearCuentaFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Olvide"
        component={OlvidasteContrasena}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearDocumentacionLimpiador"
        component={CrearDocumentacionLimpiador}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tarjetas"
        component={CreditCardsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCreditCardsScreen"
        component={CreateCreditCardsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calificaciones"
        component={Calificaciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MisSolicitudes"
        component={MisSolicitudes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearServicio"
        component={CrearServcio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Servicio"
        component={DetalleServicio}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
