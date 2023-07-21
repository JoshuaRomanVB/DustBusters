import {
	View,
	Text,
	Image,
	StyleSheet,
	Button,
	ScrollView,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Screen2() {
	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.contenedor}>
				<Text style={styles.titulo}>CHAT</Text>
				<Image
					source={{
						uri: 'https://i.ytimg.com/vi/4cupki37ymI/hq2.jpg?sqp=-oaymwEYCOgCEOgCSFryq4qpAwoIARUAAIhC0AEB&rs=AOn4CLA_4Ch1zzt1GB1O6V-uZTsjT6-Ecw',
					}}
					style={styles.image}
				/>

				<Text style={{ ...styles.texto, fontSize: 22 }}>Pedro Hernandez </Text>
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
			<Text style={{ ...styles.texto, fontSize: 18 }}>Peñuelas</Text>
			<Text style={styles.texto}>Todos los servicios </Text>
			<Text style={styles.texto}>2 Plantas </Text>

			<View style={styles.cardIzquierda}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Image
							source={{
								uri: 'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png',
							}}
							style={styles.image3}
						/>
					</View>
					<View
						style={{
							flex: 5,
							backgroundColor: '#d6d6d6',
							borderRadius: 20,
							shadowColor: '#000',
							shadowOpacity: 0.2,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
							elevation: 3,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>Hola...</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
			<View style={styles.cardDerecha}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}></View>
					<View
						style={{
							flex: 5,
							backgroundColor: '#d6d6d6',
							borderRadius: 20,
							shadowColor: '#000',
							shadowOpacity: 0.2,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
							elevation: 3,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22, left: 70 }}>
							Buenas tardes...
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							source={{
								uri: 'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png',
							}}
							style={styles.image4}
						/>
					</View>
				</View>
			</View>
			<View style={styles.cardEscribir}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View
						style={{
							flex: 1,
							backgroundColor: '#e9e9e9',
							borderRadius: 20,
							shadowColor: '#000',
							shadowOpacity: 0.2,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
							elevation: 3,
							flexDirection: 'row',
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22, color: '#a0a0a0' }}>
							Escribe algo ...
						</Text>
						<Image
							source={{
								uri: 'https://cdn-icons-png.flaticon.com/512/660/660619.png',
							}}
							style={styles.image5}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	contenedor: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
	},
	cardIzquierda: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 335,
		marginLeft: 20,
		marginTop: 20,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	cardDerecha: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 335,
		marginLeft: 20,
		marginTop: 30,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	cardEscribir: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 335,
		marginLeft: 20,
		marginTop: 30,
		backgroundColor: '#fff',
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
		width: 40,
		height: 40,
		borderRadius: 40,
		marginTop: 20,
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
