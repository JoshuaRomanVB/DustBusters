import { TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function ServiciosCard(props) {
	const navigation = useNavigation();
	const { servicios } = props;
	console.log(servicios);

	function irACrearServicio() {
		navigation.navigate('CrearServicio');
	}

	function irAServicio() {
		navigation.navigate('Servicio', { servicios: servicios });
	}

	return (
		<TouchableOpacity onPress={irAServicio}>
			<View style={styles.card}>
				<Image
					source={{
						uri: servicios.urlImagenServicio,
					}}
					style={styles.image}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.texto, fontSize: 20 }}>
							{servicios.direccion}
						</Text>
						<Text style={styles.texto}>
							{servicios.descripcionServicio}{' '}
						</Text>
						<Text style={styles.texto}>{servicios.plantas} </Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoCalificar}>EDITAR</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: 24, marginLeft: 5 }}>
						<Entypo name='location-pin' size={28} color='blue' />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoPagado}>CANCELAR</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
		// <TouchableWithoutFeedback onPress={goToPersonaje}>
		// 	<View style={{ alignContent: 'center', alignItems: 'center' }}>
		// 		<View style={{ ...estilos.card }}>
		// 			<View style={estilos.contenidocard}>
		// 				<Text style={estilos.id}>#{`${characters.id}`.padStart(3, 0)}</Text>
		// 				<Image
		// 					source={{
		// 						uri: `${characters.image}`,
		// 					}}
		// 					style={{
		// 						width: 100,
		// 						height: 100,
		// 						resizeMode: 'cover',
		// 						alignSelf: 'center',
		// 						borderRadius: 100,
		// 						borderWidth: 2,
		// 						borderColor: '#000',
		// 					}}
		// 				/>
		// 				<Text
		// 					style={{
		// 						color: '#526A87',
		// 						alignSelf: 'center',
		// 						fontSize: 30,
		// 					}}
		// 				>
		// 					{`${characters.name}`}
		// 				</Text>
		// 			</View>
		// 		</View>
		// 	</View>
		// </TouchableWithoutFeedback>
	);
}
const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
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
