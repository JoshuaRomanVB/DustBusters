import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TextInput,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const OlvidasteContrasena = () => {
	return (
		<ImageBackground
			source={require('../../src/assets/images/contra.png')}
			style={styles.imageBackground}
			resizeMode='cover'
		>
			{/* Cortina de color con opacidad */}
			<View style={styles.overlay} />

			<View style={styles.containerT}>
				{/* Contenedor para el texto title */}
				<View style={styles.titleContainer}>
					<Text style={styles.textTitle}>
						!Oh no, no te asustes,olvidaste tu contraseña!
					</Text>
				</View>

				{/* Texto subtitle */}
				<View style={styles.containerS}>
					<Text style={styles.textSubtitle}>
						Rellena el formulario para recuperar tu contraseña
					</Text>
				</View>

				{/* Contenedor para el texto Código y botón */}
				<View style={styles.codigoContainer}>
					<Text style={styles.textCodigo}>Correo</Text>
					<TextInput
						placeholder='misterio367@gmail.com'
						style={styles.inputText}
						autoCapitalize='none'
						secureTextEntry={true}
					/>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Enviar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
	},
	containerT: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerS: {
		width: 300,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -120,
		marginBottom: 50,
	},
	titleContainer: {
		position: 'absolute',
		top: windowHeight * 0.1,
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
		alignItems: 'center',
		marginBottom: -100,
		backgroundColor: '#fff',
		width: 300,
		borderRadius: 20,
		padding: 10,
	},
	textCodigo: {
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	button: {
		width: 200,
		height: 60,
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
		height: 60,
		backgroundColor: '#F8F8F8',
		borderRadius: 20,
		padding: 15,
		marginTop: 15,
		paddingStart: 20,
		borderColor: '#000', // Cambia el color del borde aquí
		borderWidth: 2, // Asegúrate de especificar el ancho del borde
		width: 200,
	},
});

export default OlvidasteContrasena;
