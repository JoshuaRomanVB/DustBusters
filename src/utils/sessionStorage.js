import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId);
    console.log('El id del usuario se ha guardado correctamente.');
  } catch (error) {
    console.log('Error al guardar el id del usuario:', error);
  }
}

export const saveUserToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('El  token del usuario se ha guardado correctamente.');
  } catch (error) {
    console.log('Error al guardar el token del usuario:', error);
  }
}


export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (userId !== null && userId !== undefined && !isNaN(userId)) {
      return userId;
    } else {
      console.log('El id del usuario es inválido:', userId);
      return null;
    }
  } catch (error) {
    console.log('Error al obtener el id del usuario:', error);
    return null;
  }
}

export const getUserToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken'); // Utiliza la clave 'userToken'
    if (userToken !== null && userToken !== undefined) {
      return userToken;
    } else {
      console.log('El token del usuario es inválido:', userToken);
      return null;
    }
  } catch (error) {
    console.log('Error al obtener el token del usuario:', error);
    return null;
  }
}


export const clearUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (userId !== null) {
      await AsyncStorage.removeItem('userId');
      console.log('Se ha eliminado el id del usuario:', userId);
    } else {
      console.log('No se ha encontrado el id del usuario.');
    }
  } catch (error) {
    console.log('Error al eliminar el id del usuario:', error);
  }
}

export const clearUserToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken !== null) {
      await AsyncStorage.removeItem('token');
      console.log('Se ha eliminado el token del usuario:', userToken);
    } else {
      console.log('No se ha encontrado el token del usuario.');
    }
  } catch (error) {
    console.log('Error al eliminar el id del usuario:', error);
  }
}

export const saveUserData = async (userData) => {
  try {
    const jsonUserData = JSON.stringify(userData);
    await AsyncStorage.setItem('userData', jsonUserData);
  } catch (error) {
    console.log('Error al guardar los datos del usuario:', error);
  }
}

export const getUserData = async () => {
  try {
    const jsonUserData = await AsyncStorage.getItem('userData');
    if (jsonUserData !== null) {
      const userData = JSON.parse(jsonUserData);
      return userData;
    } else {
      console.log('No se han encontrado datos del usuario.');
      return null;
    }
  } catch (error) {
    console.log('Error al obtener los datos del usuario:', error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    console.log('Se han eliminado los datos del usuario.');
  } catch (error) {
    console.log('Error al eliminar los datos del usuario:', error);
  }
};


