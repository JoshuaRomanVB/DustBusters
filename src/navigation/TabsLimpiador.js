import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PerfilScreen from '../screen/PerfilScreen';
import Historial from '../screen/Historial';
import ServiciosApi from '../api/ServiciosApi';

export default function TabsLimpiador() {
	const Tab = createBottomTabNavigator();

	const tabBarOptions = {
		activeTintColor: '#F64141', // Cambiar aquí el color deseado para el icono activo
		inactiveTintColor: 'gray', // Cambiar aquí el color deseado para el icono inactivo
	};

	const tabBarStyle = {
		backgroundColor: '#F64141', // Cambiar aquí el color deseado para el fondo del tab
	};

	return (
		<Tab.Navigator
			tabBarOptions={tabBarOptions}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'account') {
						iconName = 'user';
					} else if (route.name === 'home') {
						return renderIconRM();
					} else if (route.name === 'historial') {
						iconName = 'history';
					}
					return <Icon name={iconName} color={color} size={size} />;
				},
			})}
			tabBar={(props) => (
				<View style={[tabBarStyle, styles.tabBar]}>
					<BottomTabBar {...props} style={styles.tabBar} />
				</View>
			)}
		>
			<Tab.Screen
				name='account'
				component={PerfilScreen}
				options={{ tabBarLabel: 'Perfil' }}
			/>
			<Tab.Screen
				name='home'
				component={ServiciosApi}
				options={{ tabBarLabel: '' }}
			/>
			<Tab.Screen
				name='historial'
				component={Historial}
				options={{ tabBarLabel: 'Historial' }}
			/>
		</Tab.Navigator>
	);
}

const renderIconRM = () => {
	return (
		<Image
			source={require('../assets/images/logoapp.png')}
			style={{ width: 75, height: 75, top: -20 }}
		/>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: '#FFF',
		borderColor: '#F64141',
		borderTopWidth: 2, // Opcionalmente, puedes eliminar la línea superior del tab
		elevation: 0, // Opcionalmente, puedes eliminar la sombra del tab en dispositivos Android
	},
});
