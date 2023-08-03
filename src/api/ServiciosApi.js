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
						'http://192.168.100.6:8080/api/servicios',
						{
							headers: {
								Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbnNpdG8xQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkxMDM5NTI0LCJleHAiOjE2OTExMjU5MjR9.gbWvFu4sEdu2qRM0s4DKX9AtD9wWOxGFVFbfWLTZ8UE`, // Reemplaza 'token' con tu variable que contiene el token
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
