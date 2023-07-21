import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	ScrollView,
} from 'react-native';
import React from 'react';

export default function ListaCalificacionesScreen() {
	return (
		<ScrollView style={{ flex: 1 }}>
			<Text style={styles.titulo}>Peñuelas</Text>
			<Text style={{...styles.titulo, textAlign: 'center', marginTop: 20}}>Tu opinión es muy importante, califica a nuestros DustBusters</Text>
			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://pbs.twimg.com/profile_images/1374611344712929280/WwOf-3tQ_400x400.jpg',
					}}
					style={styles.imageDetalle}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>Mari Sánchez </Text>
				<Image
					source={{
						uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
					}}
					style={styles.image2}
				/>
			</View>
			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://www.quever.news/u/fotografias/m/2020/10/23/f638x638-2256_60423_5050.jpg',
					}}
					style={styles.imageDetalle}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>Juan Pérez </Text>
				<Image
					source={{
						uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
					}}
					style={styles.image2}
				/>
			</View>
			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://i.pinimg.com/originals/3b/92/1c/3b921c51dc99d9fb2be192af3ec14f72.jpg',
					}}
					style={styles.imageDetalle}
				/>
				<Text style={{ ...styles.texto, fontSize: 22 }}>Luis Sánchez </Text>
				<Image
					source={{
						uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
					}}
					style={styles.image2}
				/>
			</View>
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
		marginTop: 50,
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
});