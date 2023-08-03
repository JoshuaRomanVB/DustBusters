import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
import ServiciosCard from './ServiciosCard';
import CustomButton from '../components/CustomButton';

export default function ServiciosList({ props, navigation }) {
	const { servicios } = props;
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
				renderItem={({ item, index }) => <ServiciosCard />}
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
