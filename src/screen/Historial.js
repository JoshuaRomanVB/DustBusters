import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	SafeAreaView,
} from 'react-native';
import Constants from "expo-constants";
import {
  getUserToken,
  getUserId,

} from "../utils/sessionStorage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useCallback, useState } from 'react';
import axios from "axios";
import HistorialCard from '../components/HistorialCard';

export default function Historial() {
	const baseUrl = Constants.manifest.extra.baseUrl;
	const [servicios, setServicios] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
		  const loadProfile = async () => {
			try {
			  const token = await getUserToken();
			  const id = await getUserId();
			  if (token) {
				const url = baseUrl + '/api/servicios/historial/' + id;
				try {
					const response = await axios.get(url, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setServicios(response.data);

					console.log(servicios);
				} catch (error) {
			
					if (error.response && error.response.status === 404) {
					
						// Aquí puedes mostrar un mensaje de error al usuario o tomar otra acción
						setServicios('No posee un historial aún.');
					  } else {
						console.error('Error en la solicitud:', error);
					  }
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
		<SafeAreaView>
		  <View style={styles.container}>
			<Text
			  style={styles.titulo}
			>
			  Mi Historial
			</Text>
		  </View>
		  {servicios === 'No posee un historial aún.' ? (
			<Text style={{ alignSelf: 'center', fontSize: 18 }}>
			  No posee un historial aún.
			</Text>
		  ) : (
			<FlatList
			  data={servicios}
			  numColumns={1}
			  showsVerticalScrollIndicator={false}
			  showsHorizontalScrollIndicator={false}
			  keyExtractor={(character) => String(character.serviceId)}
			  renderItem={({ item, index }) => <HistorialCard servicios={item} />}
			/>
		  )}
		</SafeAreaView>
	  );
	  
}
const styles = StyleSheet.create({

	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30,
		alignSelf: 'center',
	},
	texto: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
		marginTop: 4, // Reducir el margen superior para dar espacio al texto
	},
	textoCalificar: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 15,
		color: '#F5AE03',
		marginTop: 30, // Reducir el margen superior para dar espacio al texto
	},
	textoPagado: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#007d00',
		marginTop: 30,
	},
	image: {
		width: 300,
		height: 150,
		borderRadius: 10,
		marginTop: 20,
	},


});
