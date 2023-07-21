import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function PerfilScreen() {
	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.contenedor}>
				<Text style={styles.titulo}>Mi Perfil</Text>
				<Image
					source={{
						uri: 'https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg',
					}}
					style={styles.image}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>Mari Sánchez </Text>
				<Image
					source={{
						uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
					}}
					style={styles.image2}
				/>
                <Text style={{ ...styles.texto, color: '#dd0000', fontSize: 20 }}>
					Ver calificaciones{' '}
				</Text>
			</View>

			<View style={styles.cardCalificacion}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							Alejandra Martinez
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
            <View style={styles.cardCalificacion}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
                        442897561420
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
            <View style={styles.cardCalificacion}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							***********
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
            <TouchableOpacity style={styles.button} >
			<Text style={styles.buttonText}>Guardar</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
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
		marginTop: 50,
	},
	texto: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
		marginTop: 10, // Reducir el margen superior para dar espacio al texto
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
		width: 200,
		height: 200,
		borderRadius: 100,
		marginTop: 20,
	},
	image2: {
		width: 250,
		height: 50,
		borderRadius: 40,
		marginTop: 20,
	},
	button: {
		height: 60,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
		color: '#090808',
		marginTop: 50,
		flex: 1,
		width: 380,
		marginLeft: 20,
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	buttonText: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold',
	},
});