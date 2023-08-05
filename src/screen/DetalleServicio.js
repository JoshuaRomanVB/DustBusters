import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import {
	// getUserData,
	getUserToken,
	// saveUserData,
	// clearUserData,
} from '../utils/sessionStorage';
import { BackHandler } from 'react-native';

export default function DetalleServicio({ route, navigation }) {
	const { servicios } = route.params;
	const id = servicios.serviceId;
	const [token, setToken] = useState('');

	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			console.log('TokenEffectDetalleServcio: ' + userToken);
			setToken(userToken);
		};

		loadToken();
	}, [navigation, route]);

	const [showAlert, setShowAlert] = useState(false);

	const handleEditarClick = () => {
		navigation.navigate('EditarServicio', { servicio: servicios });
	};

	const handleCancelarClick = () => {
		setShowAlert(true);
	};

	const handleDeleteServicio = async () => {
		try {
			const apiResponse = await axios.delete(
				`http://192.168.0.7:8080/api/servicios/${id}`,

				{
					headers: {
						Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
					},
				}
			);

			console.log(apiResponse.data);
		} catch (error) {
			console.error('Error al eliminar servicio:', error);
		}
	};

	function irAChat() {
		navigation.navigate('Chat');
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<CustomHeader />
			<View style={styles.card}>
				<Image
					source={{
						uri: servicios.urlImagenServicio,
					}}
					style={styles.imageCasa}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.texto, fontSize: 20 }}>
							{servicios.direccion}
						</Text>
						<Text style={styles.texto}>
							{servicios.descripcionServicio}{' '}
						</Text>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text style={styles.texto}>{servicios.plantas} </Text>
							<Text style={styles.texto}>
								{'('}
								{servicios.tamanoInmueble}
								{')'}
							</Text>
						</View>
					</View>

					<View style={{ flex: 0.5, marginTop: 0, marginRight: -50 }}>
						<Text style={styles.textoPagado}>
							${servicios.ofertaCliente}
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.contenedor}>
				<Image
					source={{
						uri: servicios.cliente.fotoPerfil,
					}}
					style={styles.imageDetalle}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>
					{servicios.cliente.nombreCompleto}{' '}
				</Text>
				<Text
					style={{
						...styles.texto,
						fontSize: 22,
						alignSelf: 'flex-start',
						left: 10,
					}}
				>
					Ubicación{' '}
				</Text>
			</View>
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: parseFloat(servicios.latitud),
						longitude: parseFloat(servicios.longitud),
						latitudeDelta: 0.0012,
						longitudeDelta: 0.0012,
					}}
				>
					<Marker
						coordinate={{
							latitude: parseFloat(servicios.latitud),
							longitude: parseFloat(servicios.longitud),
						}}
						title='Ubicación seleccionada'
						description={servicios.direccion}
					/>
				</MapView>
			</View>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<View style={styles.containerBotones}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleEditarClick}
					>
						<Text style={styles.buttonText}>Editar</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.containerBotones}>
					<TouchableOpacity style={styles.button} onPress={irAChat}>
						<Text style={styles.buttonText}>Chat</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.containerBotones}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleCancelarClick}
					>
						<Text style={styles.buttonText}>Cancelar</Text>
					</TouchableOpacity>

					<AwesomeAlert
						show={showAlert}
						showProgress={false}
						title='¿Seguro que quieres cancelar el servicio?'
						message='Esta acción no se puede deshacer.'
						closeOnTouchOutside={true}
						closeOnHardwareBackPress={false}
						showCancelButton={true}
						showConfirmButton={true}
						cancelText='No, mantener servicio'
						confirmText='Sí, cancelar servicio'
						confirmButtonColor='red'
						cancelButtonColor='#F5AE03'
						titleStyle={{
							textAlign: 'center', // Alineación centrada
							fontSize: 18, // Tamaño del texto del título
							fontWeight: 'bold', // Negrita
							color: '#000', // Color del texto del título
						}}
						messageStyle={{
							textAlign: 'center', // Alineación centrada para el mensaje
							fontSize: 14,
							color: '#000',
						}}
						onCancelPressed={() => {
							setShowAlert(false);
							// Aquí puedes agregar la lógica para no cancelar el servicio
						}}
						onConfirmPressed={() => {
							setShowAlert(false);
							// Aquí puedes agregar la lógica para cancelar el servicio
							handleDeleteServicio();
							navigation.goBack();
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	containerBotones: {
		flex: 1,
		marginTop: 24,
		alignItems: 'center',
	},
	button: {
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
		color: '#090808',
		marginTop: 10,
		width: '90%',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		width: '90%',
		height: 200,
		alignSelf: 'center',
		borderRadius: 30,
	},
	map: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	imageDetalle: {
		width: 175,
		height: 175,
		borderRadius: 100,
		marginTop: 20,
	},
	textoCalificarCasa: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 15,
		color: '#F5AE03',
		marginTop: 30, // Reducir el margen superior para dar espacio al texto
	},
	textoCasa: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
		marginTop: 4, // Reducir el margen superior para dar espacio al texto
	},
	imageCasa: {
		width: 350,
		height: 150,
		borderRadius: 10,
		marginTop: 20,
		resizeMode: 'stretch',
	},
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 370,
		marginLeft: 20,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	contenedor: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	cardCalificacion: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 380,
		marginLeft: 20,
		marginTop: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		borderColor: '#000',
		borderWidth: 2, // Especifica el ancho del borde
		overflow: 'hidden', // Recortar el contenido si se desborda
	},

	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30,
	},
	texto: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
		marginTop: 5, // Reducir el margen superior para dar espacio al texto
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
		width: 100,
		height: 100,
		borderRadius: 40,
		marginTop: 20,
	},
	image2: {
		width: 250,
		height: 50,
		borderRadius: 40,
		marginTop: 20,
	},
	image3: {
		width: 50,
		height: 50,
		borderRadius: 40,
		marginTop: 0,
	},
	image4: {
		width: 40,
		height: 40,
		borderRadius: 40,
		marginTop: 20,
		marginLeft: 5,
	},
	image5: {
		width: 40,
		height: 40,
		borderRadius: 40,
		marginLeft: 100,
	},
});
