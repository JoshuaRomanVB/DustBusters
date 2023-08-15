import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import StarInput from '../components/StarInput';
import { getUserToken } from '../utils/sessionStorage';
import Constants from 'expo-constants';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../styles/colors';
import { TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

export default function ListaCalificacionesScreenCliente({
	route,
	navigation,
}) {
	const baseUrl = Constants.manifest.extra.baseUrl;
	const { servicio } = route.params;
	const [calificacion, setCalificacion] = useState('');
	const [comentario, setComentario] = useState('');

	const handleRatingChange = (rating) => {
		console.log('Calificación seleccionada:', rating);
		setCalificacion(rating);
	};
	const [token, setToken] = useState('');

	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			setToken(userToken);
		};
		loadToken();
	}, []);

	//Alert dialog
	const [showAlert, setShowAlert] = useState(false);
	const [showAlertProgress, setShowAlertProgress] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [showAlertTittle, setShowAlertTittle] = useState('');
	const [showAlertMessage, setShowAlertMessage] = useState('');
	const [responseExitoso, setResponseExitoso] = useState(false);

	const handlecalificacion = async (imageURL) => {
		setShowAlert(!showAlert);
		setShowAlertProgress(!showAlertProgress);
		setShowButton(false);
		setShowAlertTittle('Subiendo Calificación');
		setShowAlertMessage('Por favor espera...');

		try {
			// Segunda petición: Guardar datos del servicio en tu API
			const servicioData = {
				calificacion: calificacion,
				nombreCalificador: servicio.limpiador.nombreCompleto,
				idUsuarioCalificado: servicio.cliente.userId,
				urlImagenCalificador: servicio.limpiador.fotoPerfil,
				comentario: comentario,
			};

			const url = baseUrl + `/api/calificaciones`;
			console.log(servicioData);
			console.log(url);
			console.log(token);
			const apiResponse = await axios.post(url, servicioData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Aquí puedes manejar la respuesta de tu API según tus necesidades
			console.log(apiResponse.data); // O cualquier otra acción que desees realizar

			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Éxito en el guardado');
			setShowAlertMessage('Se han guardado tus datos correctamente');
			setResponseExitoso(true);
		} catch (error) {
			console.error(error);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Error en el guardado');
			setShowAlertMessage('Inténtelo más tarde');
		}
	};
	const finalizarServicio = async () => {
		setShowAlert(!showAlert);
		setShowAlertProgress(!showAlertProgress);
		setShowButton(false);
		setShowAlertTittle('Finalizando servicio');
		setShowAlertMessage('Por favor espera...');
		try {
			const servicioData = {
				cliente: { userId: servicio.cliente.userId },
				limpiador: { userId: servicio.limpiador.userId },
				descripcionServicio: servicio.descripcionServicio,
				urlImagenServicio: servicio.urlImagenServicio,
				tamanoInmueble: servicio.tamanoInmueble,
				plantas: servicio.plantas,
				ofertaCliente: servicio.ofertaCliente,
				ofertaAceptada: null,
				fechaServicio: servicio.fechaServicio,
				horaInicio: servicio.horaInicio,
				horaFin: servicio.horaFin,
				latitud: servicio.latitud,
				longitud: servicio.longitud,
				direccion: servicio.direccion,
				estado: 2,
			};
			console.log(servicioData);
			const url = baseUrl + `/api/servicios/${servicio.serviceId}`;
			const apiResponse = await axios.put(url, servicioData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			navigation.navigate('historialLimpiador');
			console.log(apiResponse.data);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Finalizado con éxito');
			setShowAlertMessage('Se ha Finalizado correctamente el servicio');
		} catch (error) {
			console.error('Error al Finalizar servicio:', error);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Error al Finalizar');
			setShowAlertMessage('Inténtelo más tarde');
		}
	};

	return (
		<ScrollView style={{ flex: 1 }}>
			<CustomHeader />
			{servicio.estado == 2 ? (
				<View style={{ alignItems: 'center', marginTop: 90 }}>
					<Text style={styles.titulo}>
						Ya se finalizó el servicio, ¡GRACIAS!
					</Text>
					<Image
						source={{
							uri: 'https://cdn-icons-png.flaticon.com/512/4698/4698094.png',
						}}
						style={{ ...styles.imageDetalle, marginTop: 50 }}
					/>
				</View>
			) : (
				<View style={styles.containerBotones}>
					<Text style={styles.titulo}>{servicio.descripcionServicio}</Text>

					<Text
						style={{ ...styles.titulo, textAlign: 'center', marginTop: 20 }}
					>
						Tu opinión es muy importante, califica a el cliente
					</Text>
					<View style={styles.card}>
						<Image
							source={{
								uri: servicio.cliente.fotoPerfil,
							}}
							style={styles.imageDetalle}
						/>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							{servicio.cliente.nombreCompleto}
						</Text>
						<StarInput onChangeRating={handleRatingChange} />
						<TextInput
							placeholder='Comentario'
							style={[styles.inputTextDetalle]}
							autoCapitalize='none'
							onChangeText={(text) => {
								setComentario(text);
							}}
						/>
					</View>

					<CustomButton title='Guardar' onPress={handlecalificacion} />
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
						confirmText='Finalizar '
						onConfirmPressed={() => {
							setShowAlert(false);
							if (responseExitoso) {
								finalizarServicio();
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
				</View>
			)}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	imageDetalle: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginTop: 20,
	},
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 370,
		marginLeft: 20,
		marginTop: 20,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
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
	image2: {
		width: 250,
		height: 50,
		borderRadius: 40,
		marginTop: 20,
	},
	inputTextDetalle: {
		width: 300,
		height: 100,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		marginTop: 20,
		marginBottom: 20,
	},
});
