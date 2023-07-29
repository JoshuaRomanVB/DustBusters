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
import MapView from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

export default function DetalleServicio({navigation}) {

	
	function irAChat() {
		navigation.navigate("Chat");
	  }

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<CustomHeader/>
			<View style={styles.card}>				
				<Image
					source={{
						uri: 'https://ca-times.brightspotcdn.com/dims4/default/570fbde/2147483647/strip/true/crop/4938x2936+0+0/resize/1200x713!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F90%2F03%2F12089105491898b4bf70102eb77d%2Ffi-hotprop-makowsky-billionaire.jpg',
					}}
					style={styles.imageCasa}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.textoCasa, fontSize: 18 }}>Col.Centro</Text>
						<Text style={styles.textoCasa}>Servicio empresarial </Text>
						<Text style={styles.textoCasa}>400 m2 </Text>
					</View>
					
					<View style={{ flex: 0.5, marginTop: 24, marginLeft: 5 }}>
						<Entypo name='location-pin' size={28} color='blue' />
					</View>
				</View>
			</View>
			<View style={styles.contenedor}>
				<Image
					source={{
						uri: 'https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg',
					}}
					style={styles.imageDetalle}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>Mari Sánchez </Text>
				<Text style={{ ...styles.texto, fontSize: 22, alignSelf: 'flex-start', left: 10 }}>Ubicación </Text>
			</View>
			<View style={styles.container}>
			<MapView style={styles.map} />
			</View>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<View style={styles.containerBotones}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Aceptar $1500 </Text>
					</TouchableOpacity>
				</View>
				<View style={styles.containerBotones}>
					<TouchableOpacity style={styles.button} onPress={irAChat}>
						<Text style={styles.buttonText}>Chat</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.containerBotones}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Negociar</Text>
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
		alignItems: 'center'
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
		borderRadius: 30
	  },
	map: {
		width: '100%',
		height: '100%',
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
		width: 300,
		height: 150,
		borderRadius: 10,
		marginTop: 20,
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