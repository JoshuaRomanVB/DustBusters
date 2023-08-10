import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ServiciosCard from './ServiciosCard';
import CustomButton from '../components/CustomButton';
import {
	// getUserData,
	getUserToken,
	// saveUserData,
	// clearUserData,
} from '../utils/sessionStorage';
export default function ServiciosList(props) {
	const { servicios } = props;
	const { navigation } = props;
	const [token, setToken] = useState('');
	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			//console.log('TokenEffectServicioList: ' + userToken);
			// console.log('lati', servicios.latitud);
			// console.log('long', servicios.longitud);
			setToken(userToken);
		};

		loadToken();
	}, []);
	function irACrearServicio() {
		navigation.navigate('CrearServicio');
	}

	return (
		<SafeAreaView>
			<View>
				<Text
					style={{
						alignSelf: 'center',
						fontSize: 25,
						fontWeight: 'bold',
						marginTop: 10,
					}}
				>
					{' '}
					Mis Solicitudes
				</Text>
				<CustomButton
					title={'Crear Solicitud'}
					onPress={irACrearServicio}
				/>
			</View>
			<FlatList
				data={servicios}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(character) => String(character.id)}
				renderItem={({ item, index }) => <ServiciosCard servicios={item} />}
				contentContainerStyle={styles.container}
				onEndReachedThreshold={0.2}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: { paddingHorizontal: 15, marginTop: 50 },
	spinner: { paddingHorizontal: 2, marginTop: 20, marginBottom: 20 },
});
