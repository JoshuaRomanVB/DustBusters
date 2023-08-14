import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Image,
	ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import ButtonLogin from '../components/ButtonCrear';
import BotonDocumentos from '../components/BotonDocumentos';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebaseConfig';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../styles/colors';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
	getUserData,
	getUserId,
	getUserToken,
	// saveUserData,
	// clearUserData,
} from '../utils/sessionStorage';
export default function CrearDocumentacionLimpiador({ route, navigation }) {
	const [responseExitoso, setResponseExitoso] = useState(false);

	const [dataUser, setDataUser] = React.useState({});
	const [selectedDocsCount, setSelectedDocsCount] = useState(0);
	const [selectedDocs, setSelectedDocs] = useState({});
	const defaultButtonTitles = {
		INE: 'INE',
		'CARTA ANTECEDENTES NO PENALES': 'CARTA ANTECEDENTES NO PENALES',
		'COMPROBANTE DE DOMICILIO': 'COMPROBANTE DE DOMICILIO',
		CURP: 'CURP',
	};

	const [showAlert, setShowAlert] = useState(false);
	const [showAlertProgress, setShowAlertProgress] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [showAlertTittle, setShowAlertTittle] = useState('');
	const [showAlertMessage, setShowAlertMessage] = useState('');

	const [selectedIne, setSelectedIne] = useState(0);
	const [selectedAntecedentes, setSelectedAntecedetes] = useState(0);
	const [selectedDomicilio, setSelectedDomicilio] = useState(0);
	const [selectedCurp, setSelectedCurp] = useState(0);

	const [fileDocBlob, setFileDocBlob] = useState([]);
	const [fileDocName, setFileDocName] = useState([]);
	const [documentUri, setDocumentUri] = useState([]);

	const [fileDocBlobAntecedentes, setFileDocBlobAntecedentes] = useState([]);
	const [fileDocNameAntecedentes, setFileDocNameAntecedentes] = useState([]);
	const [documentUriAntecedentes, setDocumentUriAntecedentes] = useState([]);

	const [fileDocBlobDomicilio, setFileDocBlobDomicilio] = useState([]);
	const [fileDocNameDomicilio, setFileDocNameDomicilio] = useState([]);
	const [documentUriDomicilio, setDocumentUriDomicilio] = useState([]);

	const [fileDocBlobCurp, setFileDocBlobCurp] = useState([]);
	const [fileDocNameCurp, setFileDocNameCurp] = useState([]);
	const [documentUriCurp, setDocumentUriCurp] = useState([]);
	const baseUrl = Constants.manifest.extra.baseUrl;
	const [userId, setUserId] = useState('');
	const [token, setToken] = useState('');
	//const [downloadURL, setDownloadURL] = useState('');
	useFocusEffect(
		React.useCallback(() => {
			const loadProfile = async () => {
				try {
					setDataUser(await getUserData());
					const userData = await getUserData();
					const userToken = await getUserToken();
					const userId = await getUserId();
					setToken(userToken);
					setUserId(userId);
					if (userData && token) {
						// const url = baseUrl + '/api/auth/signin/';
						// const response = await axios.get(url, {
						// 	correo: userData.correo,
						// 	password: userData.password,
						// });
						// setTokensito(response.data);
						// setRatingUser(response.data);
						// console.log(response.data);
					} else {
						console.log('El token o los datos del usuario están vacíos.');
					}
				} catch (error) {
					console.error('Error al cargar el perfil:', error);
				}
			};

			loadProfile();

			return () => {
				// aquí puedes cancelar cualquier operación pendiente si es necesario
			};
		}, [])
	);
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

	const handleChooseDocument = async (title) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*', // Allow all types of documents. You can specify specific types if needed.
			});

			if (result.type === 'success') {
				const fileUri = result.uri;
				const fileDocName = fileUri.substring(fileUri.lastIndexOf('/') + 1);

				// Convertir la URI a un Blob utilizando la función uriToBlob
				const fileDocBlob = await uriToBlob(fileUri);

				// Agregar el objeto de documento al array de documentos seleccionados
				setSelectedDocs((prevDocs) => ({
					...prevDocs,
					[title]: fileDocName,
				}));
				setSelectedDocsCount((prevCount) => prevCount + 1);
				setSelectedIne(1);

				// Mostrar la imagen seleccionada sin subirla a Firebase Storage
				setDocumentUri(fileUri);

				// Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
				setFileDocBlob(fileDocBlob);
				setFileDocName(fileDocName);
			} else {
				console.log('Canceled');
			}
		} catch (error) {
			console.error('Error al leer el archivo:', error);
		}
	};

	const handleChooseDocumentAntecedentes = async (title) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*', // Allow all types of documents. You can specify specific types if needed.
			});

			if (result.type === 'success') {
				const fileUri = result.uri;
				const fileDocNameAntecedentes = fileUri.substring(
					fileUri.lastIndexOf('/') + 1
				);

				// Convertir la URI a un Blob utilizando la función uriToBlob
				const fileDocBlobAntecedentes = await uriToBlob(fileUri);

				// Agregar el objeto de documento al array de documentos seleccionados
				setSelectedDocs((prevDocs) => ({
					...prevDocs,
					[title]: fileDocNameAntecedentes,
				}));
				setSelectedDocsCount((prevCount) => prevCount + 1);
				setSelectedAntecedetes(1);

				// Mostrar la imagen seleccionada sin subirla a Firebase Storage
				setDocumentUriAntecedentes(fileUri);

				// Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
				setFileDocBlobAntecedentes(fileDocBlobAntecedentes);
				setFileDocNameAntecedentes(fileDocNameAntecedentes);
			} else {
				console.log('Canceled');
			}
		} catch (error) {
			console.error('Error al leer el archivo:', error);
		}
	};

	const handleChooseDocumentDomicilio = async (title) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*', // Allow all types of documents. You can specify specific types if needed.
			});

			if (result.type === 'success') {
				const fileUri = result.uri;
				const fileDocNameDomicilio = fileUri.substring(
					fileUri.lastIndexOf('/') + 1
				);

				// Convertir la URI a un Blob utilizando la función uriToBlob
				const fileDocBlobDomicilio = await uriToBlob(fileUri);

				// Agregar el objeto de documento al array de documentos seleccionados
				setSelectedDocs((prevDocs) => ({
					...prevDocs,
					[title]: fileDocNameDomicilio,
				}));
				setSelectedDocsCount((prevCount) => prevCount + 1);
				setSelectedDomicilio(1);

				// Mostrar la imagen seleccionada sin subirla a Firebase Storage
				setDocumentUriDomicilio(fileUri);

				// Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
				setFileDocBlobDomicilio(fileDocBlobDomicilio);
				setFileDocNameDomicilio(fileDocNameDomicilio);
			} else {
				console.log('Canceled');
			}
		} catch (error) {
			console.error('Error al leer el archivo:', error);
		}
	};

	const handleChooseDocumentCurp = async (title) => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*', // Allow all types of documents. You can specify specific types if needed.
			});

			if (result.type === 'success') {
				const fileUri = result.uri;
				const fileDocNameCurp = fileUri.substring(fileUri.lastIndexOf('/') + 1);

				// Convertir la URI a un Blob utilizando la función uriToBlob
				const fileDocBlobCurp = await uriToBlob(fileUri);

				// Agregar el objeto de documento al array de documentos seleccionados
				setSelectedDocs((prevDocs) => ({
					...prevDocs,
					[title]: fileDocNameCurp,
				}));
				setSelectedDocsCount((prevCount) => prevCount + 1);
				setSelectedCurp(1);

				// Mostrar la imagen seleccionada sin subirla a Firebase Storage
				setDocumentUriCurp(fileUri);

				// Guardar el Blob y el nombre del archivo en variables para subirlos posteriormente
				setFileDocBlobCurp(fileDocBlobCurp);
				setFileDocNameCurp(fileDocNameCurp);
			} else {
				console.log('Canceled');
			}
		} catch (error) {
			console.error('Error al leer el archivo:', error);
		}
	};

	/////////////////////////////////////
	const handleUploadIne = async () => {
		
		try {
			// Verificar si hay una imagen seleccionada para subir
			if (fileDocBlob && fileDocName) {
				// Crear una referencia al archivo en Firebase Storage
				const filePath = `usuariosLimpiador/${fileDocName}`;
				const storageRef = ref(storage, filePath);

				// Subir el blob al Firebase Storage
				const uploadTask = uploadBytesResumable(storageRef, fileDocBlob);

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
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							//console.log('File available at', downloadURL);

							// Actualizar la URL de la imagen en tu estado
							setDocumentUri(downloadURL);

							// Llamar a handleregister con la nueva imagen
							handleregister(downloadURL);
						});
					}
				);
				///////////////////////
				const filePathAntecedentes = `usuariosLimpiador/${fileDocNameAntecedentes}`;
				const storageRefAntecedentes = ref(storage, filePathAntecedentes);
				const uploadTaskAntecedentes = uploadBytesResumable(storageRefAntecedentes, fileDocBlobAntecedentes);
				uploadTaskAntecedentes.on(
					'state_changed',
					(snapshot) => {
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
						console.error('Error al subir la carta de antecedentes:', error);
					},
					() => {
						getDownloadURL(uploadTaskAntecedentes.snapshot.ref).then((downloadURLAntecedentes) => {
							//console.log('Archivo disponible en', downloadURLAntecedentes);
							setDocumentUriAntecedentes(downloadURLAntecedentes);
							handleregisterAntecedentes(downloadURLAntecedentes);
						});
					}
				);
				///////////////////////////
				const filePathDomicilio = `usuariosLimpiador/${fileDocNameDomicilio}`;
				const storageRefDomicilio = ref(storage, filePathDomicilio);
				const uploadTaskDomicilio = uploadBytesResumable(storageRefDomicilio, fileDocBlobDomicilio);
				uploadTaskDomicilio.on(
					'state_changed',
					(snapshot) => {
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
						console.error('Error al subir el comprobante de domicilio:', error);
					},
					() => {
						getDownloadURL(uploadTaskDomicilio.snapshot.ref).then((downloadURLDom) => {
							//console.log('Archivo disponible en', downloadURLDom);
							setDocumentUriDomicilio(downloadURLDom);
							handleregisterDomicilio(downloadURLDom);
						});
					}
				);
				///////////////////////////
				const filePathCurp = `usuariosLimpiador/${fileDocNameCurp}`;
				const storageRefCurp = ref(storage, filePathCurp);
				const uploadTaskCurp = uploadBytesResumable(storageRefCurp, fileDocBlobCurp);
				uploadTaskCurp.on(
					'state_changed',
					(snapshot) => {
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
						console.error('Error al subir el comprobante de domicilio:', error);
					},
					() => {
						getDownloadURL(uploadTaskCurp.snapshot.ref).then((downloadURLCurp) => {
							//console.log('Archivo disponible en', downloadURLCurp);
							setDocumentUriCurp(downloadURLCurp);
							handleregisterCurp(downloadURLCurp);
						});
					}
				);
				///////////////////////////
			} else {
				handleregister('../assets/images/perfil.png');
			}

		} catch (error) {
			console.error('Error al subir los documentos:', error);
		}

	};

	const handleregister = async (documentUri) => {
		setShowAlert(!showAlert);
		setShowAlertProgress(!showAlertProgress);
		setShowButton(false);
		setShowAlertTittle('Guardando documentos');
		setShowAlertMessage('Por favor espera...');
		try {
			// Segunda petición: Guardar datos del usuario en tu API
			const userData = {
				nombreDoc: 'INE',
				urlDoc: documentUri,
				userId: userId,
			};
			console.log('aqui el token' + token);

			const apiResponse = await axios.post(
				baseUrl + '/api/documentos',
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
					},
				}
			);

			///////////////////////////////

			// Aquí puedes manejar la respuesta de tu API según tus necesidades
			console.log("INE: ", apiResponse.data);
			//console.log("Antecedentes: ",apiResponseAntecedentes.data); // O cualquier otra acción que desees realizar
			

			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Éxito en el guardado');
			setShowAlertMessage('Se han guardado tus documentos correctamente');
			setResponseExitoso(true);
		} catch (error) {
			console.error(error);
			setShowAlertProgress(false);
			setShowButton(true);
			setShowAlertTittle('Error en el guardado');
			setShowAlertMessage('Inténtelo más tarde');
		}
	};
	/////////////////////////////////7
	const handleregisterAntecedentes = async (documentUriAntecedentes) => {
		try {
			const userDataAntecedentes = {
				nombreDoc: 'Carta antecedentes no penales',
				urlDoc: documentUriAntecedentes,
				userId: userId,
			};
			const apiResponseAntecedentes = await axios.post(
				baseUrl + '/api/documentos',
				userDataAntecedentes,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
					},
				}
			);
			console.log("Antecedentes: ",apiResponseAntecedentes.data); // O cualquier otra acción que desees realizar
			setResponseExitoso(true);
		} catch (error) {
			console.error(error);
		}
	};
	////////////////////////
	const handleregisterDomicilio = async (documentUriDomicilio) => {
		try {
			const userDataDomicilio = {
				nombreDoc: 'Comprobante de domicilio',
				urlDoc: documentUriDomicilio,
				userId: userId,
			};
			const apiResponseDomicilio = await axios.post(
				baseUrl + '/api/documentos',
				userDataDomicilio,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
					},
				}
			);
			console.log("DOMICILIO: ",apiResponseDomicilio.data); // O cualquier otra acción que desees realizar
			setResponseExitoso(true);
		} catch (error) {
			console.error(error);
		}
	};
	////////////////////////////
	const handleregisterCurp = async (documentUriCurp) => {
		try {
			const userDataCurp = {
				nombreDoc: 'CURP',
				urlDoc: documentUriCurp,
				userId: userId,
			};
			const apiResponseCurp = await axios.post(
				baseUrl + '/api/documentos',
				userDataCurp,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Reemplaza 'token' con tu variable que contiene el token
					},
				}
			);
			console.log("CURP: ",apiResponseCurp.data); // O cualquier otra acción que desees realizar
			setResponseExitoso(true);
		} catch (error) {
			console.error(error);
		}
	};
	////////////////////////////
	return (
		<View style={styles.mainContainer}>
			<ImageBackground
				source={require('../assets/images/backtipo.png')}
				style={styles.imageback}
			>
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
							navigation.navigate('Login');
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
				<View style={styles.overlay}>
					<View style={styles.imageContainer}>
						<Text style={styles.titleH}>DOCUMENTACIÓN</Text>

						<Text style={styles.subTitulo}>
							Para poderte registrar como DustBuster sube tu carta de
							antescedentes no penales
						</Text>
					</View>
				</View>
				{selectedDocsCount < 4 && (
					<>
						{selectedIne < 1 && (
							<>
								<View style={styles.botonI}>
									<BotonDocumentos
										title='INE'
										onPress={() => handleChooseDocument('INE')}
										selected={selectedDocs['INE']}
										defaultButtonTitles={defaultButtonTitles}
									/>
								</View>
							</>
						)}
						{selectedAntecedentes < 1 && (
							<>
								<View style={styles.botonC}>
									<BotonDocumentos
										title='CARTA ANTECEDENTES NO PENALES'
										onPress={() =>
											handleChooseDocumentAntecedentes(
												'CARTA ANTECEDENTES NO PENALES'
											)
										}
										selected={selectedDocs['CARTA ANTECEDENTES NO PENALES']}
										defaultButtonTitles={defaultButtonTitles}
									/>
								</View>
							</>
						)}
						{selectedDomicilio < 1 && (
							<>
								<View style={styles.botonC2}>
									<BotonDocumentos
										title='COMPROBANTE DE DOMICILIO'
										onPress={() =>
											handleChooseDocumentDomicilio('COMPROBANTE DE DOMICILIO')
										}
										selected={selectedDocs['COMPROBANTE DE DOMICILIO']}
										defaultButtonTitles={defaultButtonTitles}
									/>
								</View>
							</>
						)}
						{selectedCurp < 1 && (
							<>
								<View style={styles.botonC3}>
									<BotonDocumentos
										title='CURP'
										onPress={() => handleChooseDocumentCurp('CURP')}
										selected={selectedDocs['CURP']}
										defaultButtonTitles={defaultButtonTitles}
									/>
								</View>
							</>
						)}
					</>
				)}
				{selectedDocsCount === 4 && (
					<>
						<View style={styles.containerForm}>
							<Text style={styles.subTitulo2}>DOCUMENTACIÓN COMPLETADA</Text>
							<ButtonLogin onPress={handleUploadIne} title='Continuar' />
						</View>
					</>
				)}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		width: '100%',
	},
	botonI: {
		alignItems: 'center',
		justifyContent: 'center',
		top: -50,
	},
	botonC: {
		alignItems: 'center',
		justifyContent: 'center',
		top: -49,
	},
	botonC2: {
		alignItems: 'center',
		justifyContent: 'center',
		top: -49,
	},
	botonC3: {
		alignItems: 'center',
		justifyContent: 'center',
		top: -49,
	},
	containerForm: {
		alignItems: 'center',
		justifyContent: 'center',
		top: -70,
	},
	titulo: {
		fontSize: 70,
		color: '#848484',
		fontWeight: 'bold',
		top: -20,
	},
	subTitulo: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
		marginTop: 25,
	},
	subTitulo2: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 25,
		marginBottom: 25,
	},
	inputText: {
		height: 60,
		width: '80%',
		backgroundColor: '#FFF',
		borderRadius: 20,
		padding: 15,
		marginTop: 10,
		paddingStart: 20,
	},
	text2: {
		fontSize: 15,
		color: '#848484',
		marginTop: 10,
		marginBottom: 10,
	},
	imageback: {
		flex: 1,
		resizeMode: 'cover',
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
	imageContainer: {
		alignItems: 'center',
		marginVertical: 10,
		justifyContent: 'center',
		position: 'relative',
	},
	titleH: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 35,
		marginTop: 40,
	},
	image: {
		width: 188,
		height: 210,
		marginTop: 40,
		marginBottom: 40,
	},
	image2: {
		marginTop: -80,
		marginRight: -170,
	},
});