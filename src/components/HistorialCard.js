import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HistorialCard(props) {
	const navigation = useNavigation();
	const { servicios } = props;

  return (
    <View style={styles.card}>
      <Image
        source={{
			uri: servicios.urlImagenServicio,
        }}
        style={styles.image}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...styles.texto, fontSize: 20 }}>	{servicios.direccion}</Text>
          <Text style={styles.texto}>	{servicios.tamanoInmueble}</Text>
          <Text style={styles.texto}>{servicios.plantas} plantas </Text>
        </View>
		<View style={{ flex: 1 }}>
		<Text style={styles.textoCalificar}>CALIFICAR</Text>
		<Text style={styles.textoPagado}>PAGADO</Text>
        </View>
		
        </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
		color: '#F5AE03',
		marginTop: 10, // Reducir el margen superior para dar espacio al texto
	},
	textoPagado: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#007d00',
		marginTop: 10,
	},
	image: {
		width: 300,
		height: 150,
		borderRadius: 10,
		marginTop: 20,
	},
});