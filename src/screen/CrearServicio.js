import React, { useState } from 'react';
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
``;
const windowHeight = Dimensions.get('window').height;

const CrearServcio = () => {
	const [error, setError] = useState(false);
	const [telefono, setTelefono] = useState('');
	const [telefonoValido, setTelefonoValido] = useState(true);

	const [nombreServicio, setNombreServicio] = useState('');
	const [detalles, setDetalles] = useState('');
	const [personasRequeridas, setPersonasRequeridas] = useState('');
	// const [nombreServicioValido, setNombreServicioValido] = useState(true);
	// const [detallesValidos, setDetallesValidos] = useState(true);
	// const [personasRequeridasValidas, setPersonasRequeridasValidas] =
	useState(true);
	const validarTel = () => {
		// Expresión regular para validar el telefono
		const regexCodigo = /^\d{9}$/;
		setTelefonoValido(regexCodigo.test(telefono));
	};

	const handleEnviar = () => {
		// Verificar si todos los campos tienen contenido
		const todosLosCamposLlenos =
			nombreServicio.trim() !== '' &&
			detalles.trim() !== '' &&
			personasRequeridas.trim() !== '' &&
			telefono.trim() !== '';

		if (
			todosLosCamposLlenos &&
			//nombreServicioValido &&
			//detallesValidos &&
			//personasRequeridasValidas //&&
			telefonoValido
		) {
			setError(false);
			// Realizar la acción de envío aquí, ya que todos los campos están llenos y son válidos
			console.log('Formulario válido. Enviar la información:', {
				nombreServicio,
				detalles,
				personasRequeridas,
				telefono,
			});
		} else {
			setError(true);
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
			{/* Cortina de color con opacidad */}
			<View style={styles.overlay} />

			<View style={styles.containerT}>
				{/* Contenedor para el texto title */}
				<View style={styles.titleContainer}>
					<Text style={styles.textTitle}>Crear Servicio</Text>
				</View>

				{/* Texto subtitle */}
				<View style={styles.containerS}>
					<Text style={styles.textSubtitle}>
						Para crear tu servicio rellena el formulario
					</Text>
				</View>

				{/* Contenedor para el texto Código y botón */}
				<View style={styles.codigoContainer}>
					<ScrollView contentContainerStyle={styles.scroll}>
						<Text style={styles.textCodigo}>Nombre del servicio</Text>
						<TextInput
							placeholder='Nombre del servicio'
							style={[styles.inputText]}
							autoCapitalize='none'
							onChangeText={(text) => {
								setNombreServicio(text);
							}}
						/>
						<Text style={styles.textCodigo}>Teléfono</Text>
						<TextInput
							placeholder='4426690750'
							style={[styles.inputText]}
							autoCapitalize='none'
							keyboardType='numeric'
							onChangeText={(text) => {
								setTelefono(text);
								validarTel(text);
							}}
							onSubmitEditing={() => {
								// Aquí puedes agregar alguna lógica adicional si es necesario
								Keyboard.dismiss(); // Esto cerrará el teclado automáticamente
							}}
						/>
						<Text style={styles.textCodigo}>Detalles</Text>
						<TextInput
							placeholder='Detalles'
							style={[styles.inputTextDetalle]}
							autoCapitalize='none'
							onChangeText={(text) => {
								setDetalles(text);
							}}
						/>
						<Text style={styles.textCodigo}>Personas requeridas</Text>
						<TextInput
							placeholder='Personas requeridas'
							style={[styles.inputText]}
							autoCapitalize='none'
							keyboardType='numeric'
							onChangeText={(text) => {
								setPersonasRequeridas(text);
							}}
						/>
						<Text style={styles.textCodigo}>Ubicación</Text>
						<Image
							source={require('../../src/assets/images/Ubicacion.png')}
							style={styles.image}
						/>
						<Text style={styles.textCodigo}>Foto</Text>
						<Image
							source={require('../../src/assets/images/casa.png')}
							style={styles.image}
						/>
						{error && (
							<Text style={styles.errorText}>Revisa los campos</Text>
						)}

						<TouchableOpacity
							style={styles.button}
							onPress={handleEnviar}
						>
							<Text style={styles.buttonText}>Enviar</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	image: { width: 350 },
	scroll: {
		flexGrow: 1,
		width: '100%', // Asegura que el contenido ocupe todo el ancho del ScrollView
	},
	imageBackground: {
		flexGrow: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
	},
	containerT: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: windowHeight * 0.2, // Ajusta la posición vertical del título
	},
	containerS: {
		width: 300,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -50, // Ajusta el margen superior del texto subtitle
		paddingBottom: 20,
	},
	titleContainer: {
		position: 'absolute',
		top: windowHeight * -0.15, // Ajusta la posición vertical del título
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
	codigoContainer: {
		flexGrow: 1, // Ocupa el espacio restante vertical
		width: '100%',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 10,
	},
	textCodigo: {
		fontSize: 16,
		color: '#E6303C',
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		padding: 2,
	},
	button: {
		width: 350,
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
		borderColor: '#000', // Cambia el color del borde aquí
		borderWidth: 2, // Asegúrate de especificar el ancho del borde
		width: 350,
	},
	inputTextDetalle: {
		height: 50,
		backgroundColor: '#F8F8F8',
		borderRadius: 20,
		marginTop: 5,
		marginBottom: 5,
		paddingStart: 20,
		borderColor: '#000', // Cambia el color del borde aquí
		borderWidth: 2, // Asegúrate de especificar el ancho del borde
		width: 350,
		//height: 200,
	},
	errorText: {
		color: 'red',
		fontSize: 16,
		marginTop: 5,
		textAlign: 'center',
	},
});

export default CrearServcio;
