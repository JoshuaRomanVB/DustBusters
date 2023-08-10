import { View, Text } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import MisSolicitudes from '../components/ServiciosList';
import { getUserToken } from '../utils/sessionStorage';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
export default function ServiciosApi({ navigation }) {
	const baseUrl = Constants.manifest.extra.baseUrl;
	const [servicios, setServicios] = useState([]);
	const [token, setToken] = useState('');

	// useEffect(() => {
	// 	const loadToken = async () => {
	// 		const userToken = await getUserToken();
	// 		//console.log('TokenEffectDetalleServcio: ' + userToken);
	// 		console.log('lati', servicios.latitud);
	// 		console.log('long', servicios.longitud);
	// 		setToken(userToken);
	// 	};

	// 	loadToken();
	// }, []);
	// const loadToken = async () => {
	// 	const userToken = await getUserToken();
	// 	//console.log('TokenEffectDetalleServcio: ' + userToken);
	// 	// console.log('lati', servicios.latitud);
	// 	// console.log('long', servicios.longitud);
	// 	setToken(userToken);s
	// };
	useFocusEffect(
		useCallback(() => {
			//loadToken();
			const fetchData = async () => {
				try {
					const response = await axios.get(baseUrl + '/api/servicios', {
						headers: {
							Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXN0ZXJpbzM2N0BnbWFpbC5jb20iLCJpYXQiOjE2OTE2MjI0MzcsImV4cCI6MTY5MTcwODgzN30.8k2w0aJxBclBvJxgNJn26pYbLTFPjCU9uzisOdZsQHc`, // Reemplaza 'token' con tu variable que contiene el token
						},
					});
					setServicios(response.data);

					console.log(servicios);
				} catch (error) {
					console.error(error);
				}
			};
			fetchData();
		}, [])
	);
	return (
		//Crear componente importar y pasar props
		<View>
			<MisSolicitudes servicios={servicios} navigation={navigation} />
		</View>
	);
}
