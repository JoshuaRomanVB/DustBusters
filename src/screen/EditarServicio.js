import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
	Keyboard,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AwesomeAlert from 'react-native-awesome-alerts';
import { storage } from '../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { colors } from '../styles/colors';
import {
	//getUserData,
	getUserToken,
	// saveUserData,
	// clearUserData,
} from '../utils/sessionStorage';

const windowHeight = Dimensions.get('window').height;

const EditarServicio = ({ route, navigation }) => {
	const { servicio } = route.params;
	const [token, setToken] = useState('');
	const id = servicio.serviceId;
	const [responseExitoso, setResponseExitoso] = useState(false);

	const [fileBlob, setFileBlob] = useState('');
	const [fileName, setFileName] = useState('');
	const [imageUri, setImageUri] = useState('');
	const [nameError, setNameError] = useState('');

	//Alert dialog
	const [showAlert, setShowAlert] = useState(false);
	const [showAlertProgress, setShowAlertProgress] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [showAlertTittle, setShowAlertTittle] = useState('');
	const [showAlertMessage, setShowAlertMessage] = useState('');

	const descServicio = servicio.descripcionServicio;
	const tamInmueble = servicio.tamanoInmueble;
	const plant = servicio.plantas;
	const oferta = `${servicio.ofertaCliente}`;
	const URlImage = servicio.urlImagenServicio;
	const dire = servicio.direccion;
	const latitude = servicio.latitud;
	const longitude = servicio.longitud;

	const [descripcionServicio, setDescripcionServicio] = useState(descServicio);
	const [tamano, setTamano] = useState(tamInmueble);
	const [plantas, setPlantas] = useState(plant);
	const [ofertaCliente, setOfertaCliente] = useState(oferta);
	const [direccion, setDireccion] = useState(dire);
	const [lat, setLat] = useState(latitude);
	const [long, setLong] = useState(longitude);

	const [mapRegion, setMapRegion] = useState(null); // Establecemos el estado inicial como null
	useEffect(() => {
		const loadToken = async () => {
			const userToken = await getUserToken();
			//console.log(userToken);
			console.log(servicio);
			setToken(userToken);
		};

		setImageUri(URlImage);
		loadToken();
	}, []);

	const validateFields = () => {
		let isValid = true;

		// Validar descripcionServicio
		if (!descripcionServicio) {
			setNameError('Por favor ingrese la descripcion del Servicio');
			isValid = false;
		} else {
			setNameError('');
		}

		// Validar tamano del inmueble
		if (!tamano) {
			setNameError('Por favor ingrese el tamano del inmueble');
			isValid = false;
		} else {
			setNameError('');
		}

		// Validar las plantas del inmueble
		if (!plantas) {
			setNameError('Por favor ingrese las plantas del inmueble');
			isValid = false;
		} else {
			setNameError('');
		}

		// Validar tamano del inmueble
		if (!ofertaCliente) {
			setNameError('Por favor ingrese el tamano del inmueble');
			isValid = false;
		} else {
			setNameError('');
		}

		// Validar lat
		if (!lat) {
			setNameError('Por favor ingrese una ubicación');
			isValid = false;
		} else {
			setNameError('');
		}

		return isValid;
	};

	function uriToBlob(uri) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.onload = function () {
				resolve(xhr.response);
			};

			xhr.onerror = function () {
				reject(new Error('uriToBlob failed'));
			};

			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});
	}

	const handleChooseImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			console.log('Permission denied');
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			const fileUri = result.assets[0].uri;
			const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);

			try {
				// Convertir la URI a un Blob utilizando la función uriToBlob
				const fileBlob = await uriToBlob(fileUri);

				// Mostrar la imagen seleccionada sin subirla a Firebase Storage
				setImageUri(fileUri);

				// Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
				setFileBlob(fileBlob);
				setFileName(fileName);
			} catch (error) {
				console.error('Error al leer el archivo:', error);
			}
		} else {
			console.log(result);
		}
	};

	// Función para subir la imagen a Firebase Storage y actualizar el enlace en el servidor
	const handleUploadImage = async () => {
		try {
			// Verificar si hay una imagen seleccionada para subir
			if (fileBlob && fileName) {
				// Crear una referencia al archivo en Firebase Storage
				const filePath = `servicios/${fileName}`;
				const storageRef = ref(storage, filePath);

				// Subir el blob al Firebase Storage
				const uploadTask = uploadBytesResumable(storageRef, fileBlob);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// Observar eventos de cambio de estado como progreso, pausa y reanudación
						// Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el número total de bytes a subir
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						// Manejar errores de subida fallida
						console.error('Error al subir la imagen:', error);
					},
					() => {
						// Manejar subida exitosa en la finalización
						// Por ejemplo, obtener la URL de descarga: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								console.log('File available at', downloadURL);

								// Actualizar la URL de la imagen en tu estado
								setImageUri(downloadURL);

								// Llamar a handleregister con la nueva imagen
								handleregister(downloadURL);
							}
						);
					}
				);
			} else {
				handleregister(URlImage);
			}
		} catch (error) {
			console.error('Error al subir la imagen:', error);
		}
	};

	const handleregister = async (imageURL) => {
		const isValid = validateFields();
		if (isValid) {
			setShowAlert(!showAlert);
			setShowAlertProgress(!showAlertProgress);
			setShowButton(false);
			setShowAlertTittle('Subiendo servicio');
			setShowAlertMessage('Por favor espera...');

			try {
				// Segunda petición: Guardar datos del servicio en tu API
				const servicioData = {
					cliente: { userId: 4 },
					descripcionServicio: descripcionServicio,
					tamanoInmueble: tamano,
					plantas: plantas,
					ofertaCliente: ofertaCliente,
					ofertaAceptada: null,
					//fechaServicio: new Date().toLocaleTimeString,
					horaInicio: null,
					horaFin: null,
					latitud: lat,
					longitud: long,
					direccion: direccion,
					estado: 0,
					urlImagenServicio: imageURL,
				};

				const apiResponse = await axios.put(
					`http://10.13.6.28:8080/api/servicios/${id}`,
					servicioData,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
						},
					}
				);

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
		} else {
			console.log(
				'Debes completar todos los campos antes de enviar el formulario o hay campos inválidos.'
			);
		}
	};

	return (
		<ImageBackground
			source={require('../../src/assets/images/crearServicio.png')}
			style={styles.imageBackground}
			resizeMode='cover'
		>
			<View style={styles.overlay} />
			<CustomHeader />
			<View style={styles.containerT}>
				<View style={styles.titleContainer}>
					<Text style={styles.textTitle}>Editar Servicio</Text>
				</View>
				<View style={styles.containerS}>
					<Text style={styles.textSubtitle}>
						Para editar tu servicio rellena el formulario
					</Text>
				</View>
				<ScrollView
					style={styles.scroll}
					keyboardShouldPersistTaps='handled'
				>
					<Text style={styles.textCodigo}>Descripción del servicio</Text>
					<TextInput
						placeholder='Descripción del servicio'
						defaultValue={servicio.descripcionServicio}
						style={[styles.inputText]}
						autoCapitalize='none'
						onChangeText={(text) => {
							setDescripcionServicio(text);
						}}
					/>
					<Text style={styles.textCodigo}>Tamaño del inmueble</Text>
					<TextInput
						placeholder='90m2'
						defaultValue={servicio.tamanoInmueble}
						style={[styles.inputText]}
						autoCapitalize='none'
						//keyboardType='default'
						onChangeText={(text) => {
							setTamano(text);
						}}
					/>
					<Text style={styles.textCodigo}>Plantas</Text>
					<TextInput
						placeholder='3 plantas'
						defaultValue={servicio.plantas}
						style={[styles.inputTextDetalle]}
						autoCapitalize='none'
						onChangeText={(text) => {
							setPlantas(text);
						}}
					/>
					<Text style={styles.textCodigo}>Oferta del pago</Text>
					<TextInput
						placeholder='$3000'
						defaultValue={oferta}
						style={[styles.inputText]}
						autoCapitalize='none'
						//skeyboardType='numeric'
						onChangeText={(text) => {
							setOfertaCliente(text);
						}}
					/>
					<Text style={styles.textCodigo}>Dirección</Text>
					<View>
						<GooglePlacesAutocomplete
							placeholder='Dirección'
							onPress={(data, details = null) => {
								const { lat, lng } = details.geometry.location;
								console.log('Latitud:', lat);
								console.log('Longitud:', lng);
								console.log(data.structured_formatting.main_text);
								//console.log(data);
								setLat(lat);
								setLong(lng);
								setDireccion(data.structured_formatting.main_text);

								// Aquí se actualiza mapRegion con la nueva ubicación seleccionada
								setMapRegion({
									latitude: parseFloat(lat),
									longitude: parseFloat(lng),
									latitudeDelta: 0.022,
									longitudeDelta: 0.022,
								});
							}}
							query={{
								key: 'AIzaSyBhwh4Asc15hyRD-a6WmVXLCva6KUfg27s', // Reemplaza con tu clave de API de Google
								language: 'es', // Opcional, define el idioma de los resultados
								components: 'country:mx', // Restringe los resultados a México (código ISO 3166-1 alfa-2 para México)
							}}
							styles={{
								container: { flex: 0 },
								textInput: styles.inputText,
								listView: { backgroundColor: '#F8F8F8' },
								separator: { backgroundColor: '#E6303C' },
							}}
							fetchDetails
							currentLocation={false}
						/>
					</View>
					{lat !== '' && long !== '' ? (
						<View style={styles.containerMap}>
							<MapView
								style={styles.map}
								region={mapRegion} // Usamos el estado mapRegion para establecer la región del mapa
								onRegionChange={(region) => setMapRegion(region)} // Actualizamos el estado mapRegion cuando cambia la región del mapa
							>
								<Marker
									coordinate={{
										latitude: parseFloat(lat),
										longitude: parseFloat(long),
									}}
									title='Ubicación seleccionada'
									description={direccion}
								/>
							</MapView>
						</View>
					) : null}

					{imageUri ? (
						<Image source={{ uri: imageUri }} style={styles.image} />
					) : null}
					<TouchableOpacity
						onPress={handleChooseImage}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Seleccionar Imagen</Text>
					</TouchableOpacity>

					{nameError && (
						<Text style={styles.errorText}>Revisa los campos</Text>
					)}
					<TouchableOpacity
						style={styles.button}
						onPress={handleUploadImage}
					>
						<Text style={styles.buttonText}>Editar Servicio</Text>
					</TouchableOpacity>
					{/* Espacio en blanco */}
					<View style={styles.bottomSpace} />
				</ScrollView>
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
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		flexGrow: 1,
	},
	scroll: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 20,
		width: '100%',
		padding: 20,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
	},
	containerT: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: windowHeight * 0.2,
	},
	containerS: {
		width: 300,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -50,
		paddingBottom: 20,
	},
	titleContainer: {
		position: 'absolute',
		top: windowHeight * -0.15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textTitle: {
		fontSize: 35,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textSubtitle: {
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textCodigo: {
		fontSize: 16,
		color: '#E6303C',
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		padding: 2,
	},
	button: {
		width: '100%',
		height: 45,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E6303C',
		color: '#090808',
		marginTop: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	inputText: {
		height: 50,
		backgroundColor: '#F8F8F8',
		borderRadius: 20,
		marginTop: 5,
		marginBottom: 5,
		paddingStart: 20,
		borderColor: '#000',
		borderWidth: 2,
		width: '100%',
	},
	inputTextDetalle: {
		height: 50,
		backgroundColor: '#F8F8F8',
		borderRadius: 20,
		marginTop: 5,
		marginBottom: 5,
		paddingStart: 20,
		borderColor: '#000',
		borderWidth: 2,
		width: '100%',
	},
	errorText: {
		color: 'red',
		fontSize: 16,
		marginTop: 5,
		textAlign: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
		borderRadius: 5,
	},
	containerMap: {
		flex: 1,
		width: '100%',
		height: 400,
		alignSelf: 'flex-start',
		borderRadius: 30,
		marginTop: 10,
	},
	bottomSpace: {
		marginBottom: 50,
	},
	image: {
		width: 375,
		height: 300,
		alignSelf: 'center',
		marginTop: 20,
		borderRadius: 10,
	},
});

export default EditarServicio;
