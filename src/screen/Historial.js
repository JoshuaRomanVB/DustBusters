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

export default function Historial() {
	return (
		<ScrollView style={{ flex: 1 }}>
			<Text style={styles.titulo}>Historial</Text>

			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://mansionesmiami.com/wp-content/uploads/2020/05/620-Arvida-Pkwy-Coral-Gables-FL-33156-1.jpg',
					}}
					style={styles.image}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.texto, fontSize: 20 }}>Peñuelas</Text>
						<Text style={styles.texto}>Todos los servicios </Text>
						<Text style={styles.texto}>2 Plantas </Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoCalificar}>CALIFICAR</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: 24, marginLeft: 5 }}>
						<Entypo name='location-pin' size={28} color='blue' />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoPagado}>PAGADO</Text>
					</View>
				</View>
			</View>
			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://ca-times.brightspotcdn.com/dims4/default/570fbde/2147483647/strip/true/crop/4938x2936+0+0/resize/1200x713!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F90%2F03%2F12089105491898b4bf70102eb77d%2Ffi-hotprop-makowsky-billionaire.jpg',
					}}
					style={styles.image}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.texto, fontSize: 20 }}>Col.Centro</Text>
						<Text style={styles.texto}>Servicio empresarial </Text>
						<Text style={styles.texto}>400 m2 </Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoCalificar}>CALIFICAR</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: 24, marginLeft: 5 }}>
						<Entypo name='location-pin' size={28} color='blue' />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoPagado}>PAGADO</Text>
					</View>
				</View>
			</View>
			<View style={styles.card}>
				<Image
					source={{
						uri: 'https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2020-06/im-191825.jpg?VersionId=H30j04J4vZFBf8nX6Otwwe0l4Vjfo96b&itok=lgCc-eBK',
					}}
					style={styles.image}
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={{ ...styles.texto, fontSize: 20 }}>Sauces</Text>
						<Text style={styles.texto}>Todos los servicios </Text>
						<Text style={styles.texto}>1 Planta </Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoCalificar}>CALIFICAR</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: 24, marginLeft: 5 }}>
						<Entypo name='location-pin' size={28} color='blue' />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.textoPagado}>PAGADO</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 335,
		marginLeft: 20,
		marginTop: 20,
		backgroundColor: '#fff',
		overflow: 'hidden', // Recortar el contenido si se desborda
	},
	titulo: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30,
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
});
