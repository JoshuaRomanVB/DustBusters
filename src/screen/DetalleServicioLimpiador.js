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
import Constants from 'expo-constants';
import axios from 'axios';
import { db, auth } from '../utils/firebaseConfig';
import {
	getUserId,
	// getUserData,
	getUserToken,
	// saveUserData,
	// clearUserData,
} from '../utils/sessionStorage';
import { BackHandler } from 'react-native';
import { colors } from '../styles/colors';
import {
	collection,
	getDocs,
	limit,
	addDoc,
	query,
	where,
	serverTimestamp,
} from 'firebase/firestore';

export default function DetalleServicioLimpiador({ route, navigation }) {
	const baseUrl = Constants.manifest.extra.baseUrl;
	const { servicios } = route.params;
	//console.log(servicios);
	const id = servicios.serviceId;
	const idCliente = servicios.cliente.userId;
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [showAlertProgress, setShowAlertProgress] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [showAlertTittle, setShowAlertTittle] = useState('');
	const [showAlertMessage, setShowAlertMessage] = useState('');
	const [responseExitoso, setResponseExitoso] = useState(false);

	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			const userId = await getUserId();
			//console.log('TokenEffectDetalleServcio: ' + userToken);
			//console.log('latitud', servicios.latitud);
			//console.log('longitud', servicios.longitud);
			setToken(userToken);
			setUserId(userId);
		};

		loadToken();
	}, [navigation, route]);
	const aceptarServicio = async () => {
		setShowAlert(!showAlert);
		setShowAlertProgress(!showAlertProgress);
		setShowButton(false);
		setShowAlertTittle('Aceptando servicio');
		setShowAlertMessage('Por favor espera...');
		try {
			const servicioData = {
				cliente: { userId: servicios.cliente.userId },
				limpiador: { userId: userId },
				descripcionServicio: servicios.descripcionServicio,
				urlImagenServicio: servicios.urlImagenServicio,
				tamanoInmueble: servicios.tamanoInmueble,
				plantas: servicios.plantas,
				ofertaCliente: servicios.ofertaCliente,
				ofertaAceptada: null,
				fechaServicio: servicios.fechaServicio,
				horaInicio: servicios.horaInicio,
				horaFin: servicios.horaFin,
				latitud: servicios.latitud,
				longitud: servicios.longitud,
				direccion: servicios.direccion,
				estado: 1,
			};
			console.log(servicioData);
			const url = baseUrl + `/api/servicios/${id}`;
			const apiResponse = await axios.put(url, servicioData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log(apiResponse.data);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Aceptado con éxito');
			setShowAlertMessage('Se ha aceptado correctamente el servicio');
			setResponseExitoso(true);
		} catch (error) {
			console.error('Error al aceptar servicio:', error);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Error al aceptar');
			setShowAlertMessage('Inténtelo más tarde');
		}
	};

	const handleStartChat = async () => {
		try {
			const chatSnapshot1 = await getDocs(
				query(
					collection(db, 'Chats'),
					where('users', '==', [userId, idCliente]),
					limit(1)
				)
			);

			// Verificar si ya existe un chat entre los usuarios (caso 2)
			const chatSnapshot2 = await getDocs(
				query(
					collection(db, 'Chats'),
					where('users', '==', [idCliente, userId]),
					limit(1)
				)
			);

			let chatId = '';

			if (!chatSnapshot1.empty) {
				// Existe un chat entre los usuarios (caso 1)
				chatId = chatSnapshot1.docs[0].data().id;
			} else if (!chatSnapshot2.empty) {
				// Existe un chat entre los usuarios (caso 2)
				chatId = chatSnapshot2.docs[0].data().id;
			} else {
				const chatId = generateChatId(); // Generar un ID único para el chat
				const newChat = {
					id: chatId,
					serviceId: id,
					users: [userId, idCliente], // Cambiar por el ID de usuario 2
				};

				await addDoc(collection(db, 'Chats'), newChat);
			}
			// Redirigir a la pantalla de chat
			navigation.navigate('ChatScreen', {
				chatId: chatId,
				senderId: userId,
				receiverId: idCliente, // Cambiar por el ID de usuario 2
			});
		} catch (error) {
			console.log('Error al iniciar el chat:', error);
		}
	};
	const generateChatId = () => {
		const randomId = Math.random().toString(36).substring(7);
		const timestamp = Date.now().toString();
		const chatId = `${randomId}-${timestamp}`;

		return chatId;
	};

	const handleEditarClick = () => {
		navigation.navigate('EditarServicio', { servicio: servicios });
	};

	const handleCancelarClick = () => {
		setShowAlert(true);
	};

	const handleDeleteServicio = async () => {
		try {
			const apiResponse = await axios.delete(
				baseUrl + `/api/servicios/${id}`,

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
		navigation.navigate('ChatScreen', {
			id_servicio: id,
		});
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<CustomHeader />
			<Text style={styles.titulo}>Detalles del servicio</Text>
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
						<Text style={styles.texto}>{servicios.descripcionServicio} </Text>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text style={styles.texto}>{servicios.plantas} planta(s) </Text>
							<Text style={styles.texto}>
								{'('}
								{servicios.tamanoInmueble}
								{' m2)'}
							</Text>
						</View>
					</View>
					<AwesomeAlert
						show={showAlert}
						title={showAlertTittle}
						message={showAlertMessage}
						showProgress={showAlertProgress}
						progressColor={colors.primary}
						progressSize={40}
						closeOnHardwareBackPress={true}
						closeOnTouchOutside={false}
						showConfirmButton={showButton}
						confirmText='Aceptar'
						onConfirmPressed={() => {
							setShowAlert(false);
							if (responseExitoso) {
								navigation.navigate('home');
							}
						}}
						confirmButtonStyle={{
							backgroundColor: colors.blue,
							width: 100,
							alignItems: 'center',
							borderRadius: 30,
						}}
						contentContainerStyle={{ borderRadius: 30, marginHorizontal: 50 }}
					/>
					<View style={{ flex: 0.5, marginTop: 0, marginRight: -50 }}>
						<Text style={styles.textoPagado}>${servicios.ofertaCliente}</Text>
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
					region={{
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
					{servicios.estado == 0 ? (
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								aceptarServicio();
							}}
						>
							<Text style={styles.buttonText}>Aceptar</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								console.log('finalizar');
							}}
						>
							<Text style={styles.buttonText}>Finalizar</Text>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.containerBotones}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleStartChat()}
					>
						<Text style={styles.buttonText}>Chat</Text>
					</TouchableOpacity>
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
		left: -15,
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
		marginTop: 10,
		textAlign: 'center',
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
