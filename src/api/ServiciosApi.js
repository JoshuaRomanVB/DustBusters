import { View, Text } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import MisSolicitudes from '../components/ServiciosList';
import { getUserToken,getUserId } from '../utils/sessionStorage';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function ServiciosApi({ navigation }) {
	const baseUrl = Constants.manifest.extra.baseUrl;
	const [servicios, setServicios] = useState([]);
	const [token, setToken] = useState('');

	useFocusEffect(
		React.useCallback(() => {
		  const loadProfile = async () => {
			try {
			  const token = await getUserToken();
			  const id = await getUserId();
			  if (token) {
				const url = baseUrl + '/api/servicios/byidcliente/' + id;
				try {
					const response = await axios.get(url, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setServicios(response.data);

					console.log(servicios);
				} catch (error) {
					console.error(error);
				}
			  } else {
				console.log("El token o los datos del usuario están vacíos.");
			  }
	
			} catch (error) {
			  console.error("Error al cargar el perfil:", error);
			}
		  };
		  loadProfile();
		  return () => {
			// aquí puedes cancelar cualquier operación pendiente si es necesario
		  };
		}, [])
	  );
	
	
	
	return (
		//Crear componente importar y pasar props
		<View>
			<MisSolicitudes servicios={servicios} navigation={navigation} />
		</View>
	);
}
