import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../components/Auth/LoginForm";
import Navigation from "./Navigation";
import RegisterScreen from "../screen/RegisterScreen";
import CrearCuenta from "../screen/CrearCuentaC";
import CrearCuentaD from "../screen/CrearCuentaD";
import DocumentosD from "../screen/DocumentosD";

import CrearCuentaTipo from "../screen/CrearCuentaTipo";

export default function NavigationAccount() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearCuenta"
        component={CrearCuenta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearCuentaD"
        component={CrearCuentaD}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Documentos"
        component={DocumentosD}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
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
    </Stack.Navigator>
  );
}
