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

export default function Calificaciones() {
	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.contenedor}>
				<Text style={styles.titulo}>CALIFICACIONES</Text>
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
			</View>

			<View style={styles.cardCalificacion}>
				<View>
					<Image
						source={{
							uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
						}}
						style={{ ...styles.image2, width: 100, left: -70, marginTop: -10 }}
					/>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Image
							source={{
								uri: 'https://i0.wp.com/www.diarlu.com/wp-content/uploads/2019/09/cara-mujer-joven.jpg?resize=500%2C500&ssl=1',
							}}
							style={styles.image3}
						/>
					</View>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							Alejandra Martinez
						</Text>
						<Text style={{ ...styles.texto }}>
							Excelente servicio, atento y dedicado
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
			<View style={styles.cardCalificacion}>
				<View>
					<Image
						source={{
							uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
						}}
						style={{ ...styles.image2, width: 100, left: -70, marginTop: -10 }}
					/>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Image
							source={{
								uri: 'https://i0.wp.com/www.diarlu.com/wp-content/uploads/2019/09/cara-mujer-joven.jpg?resize=500%2C500&ssl=1',
							}}
							style={styles.image3}
						/>
					</View>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							Alejandra Martinez
						</Text>
						<Text style={{ ...styles.texto }}>
							Excelente servicio, atento y dedicado
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
			<View style={styles.cardCalificacion}>
				<View>
					<Image
						source={{
							uri: 'https://img.freepik.com/vector-premium/imagen-vectorial-cuatro-estrellas-cinco-buen-nivel_541404-75.jpg?w=2000',
						}}
						style={{ ...styles.image2, width: 100, left: -70, marginTop: -10 }}
					/>
				</View>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Image
							source={{
								uri: 'https://i0.wp.com/www.diarlu.com/wp-content/uploads/2019/09/cara-mujer-joven.jpg?resize=500%2C500&ssl=1',
							}}
							style={styles.image3}
						/>
					</View>
					<View
						style={{
							flex: 5,
						}}
					>
						<Text style={{ ...styles.texto, fontSize: 22 }}>
							Alejandra Martinez
						</Text>
						<Text style={{ ...styles.texto }}>
							Excelente servicio, atento y dedicado
						</Text>
					</View>
					<View style={{ flex: 1 }}></View>
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
	cardCalificacion: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 335,
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
