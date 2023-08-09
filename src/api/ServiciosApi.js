import { View, Text } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import MisSolicitudes from '../components/ServiciosList';
import { getUserToken } from '../utils/sessionStorage';
import { useFocusEffect } from '@react-navigation/native';
export default function ServiciosApi({ navigation }) {
	const [servicios, setServicios] = useState([]);
	const [token, setToken] = useState('');

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					const response = await axios.get(
						'http://10.13.6.28:8080/api/servicios',
						{
							headers: {
								Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXN0ZXJpbzM2N0BnbWFpbC5jb20iLCJpYXQiOjE2OTEyMTA2MjQsImV4cCI6MTY5MTI5NzAyNH0.TizWhk3Uh-_aoLAr57qatvMnVuJdvCII-Qmc3BP1gdI`, // Reemplaza 'token' con tu variable que contiene el token
							},
						}
					);
					setServicios(response.data);

					console.log(servicios);
				} catch (error) {
					console.error(error);
				}
			};
			fetchData();
		}, [])
	);

	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			console.log(userToken);
			setToken(userToken);
		};

		loadToken();
	}, [navigation]);
	return (
		//Crear componente importar y pasar props
		<View>
			<MisSolicitudes servicios={servicios} navigation={navigation} />
		</View>
	);
}
