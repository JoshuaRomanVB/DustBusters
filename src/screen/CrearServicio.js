import React from 'react';
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
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const CrearServcio = () => {
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
							placeholder='misterio367@gmail.com'
							style={styles.inputText}
							autoCapitalize='none'
							secureTextEntry={true}
						/>
						<Text style={styles.textCodigo}>Teléfono</Text>
						<TextInput
							placeholder='4426690750'
							style={styles.inputText}
							autoCapitalize='none'
							secureTextEntry={true}
						/>
						<Text style={styles.textCodigo}>Detalles</Text>
						<TextInput
							placeholder='Detalles'
							style={styles.inputText}
							autoCapitalize='none'
							secureTextEntry={true}
						/>
						<Text style={styles.textCodigo}>Personas requeridas</Text>
						<TextInput
							placeholder='1'
							style={styles.inputText}
							autoCapitalize='none'
							secureTextEntry={true}
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

						<TouchableOpacity style={styles.button}>
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
});

export default CrearServcio;
