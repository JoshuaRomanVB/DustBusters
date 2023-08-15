import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ServiciosCard from './ServiciosCard';
import CustomButton from './CustomButton';
import { getUserToken } from '../utils/sessionStorage';
import ServiciosCardLimpiador from './ServiciosCardLimpiador';

export default function ServiciosListAll(props) {
	const { servicios, navigation } = props;
	const [token, setToken] = useState('');
	const [filteredServicios, setFilteredServicios] = useState([]);

	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			setToken(userToken);
		};

		loadToken();
		const filtered = servicios.filter((servicio) => servicio.estado === 0);
		setFilteredServicios(filtered);
	}, [servicios]);

	function irACrearServicio() {
		navigation.navigate('CrearServicio');
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text style={styles.titulo}>Solicitudes disponibles</Text>

				<FlatList
					data={filteredServicios}
					numColumns={1}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => String(item.serviceId)}
					renderItem={({ item }) => <ServiciosCardLimpiador servicios={item} />}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingBottom: 160,
	},
	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30,
		alignSelf: 'center',
	},
});
