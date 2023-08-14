import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  getDocs,
  limit,
  addDoc,
  query,
  where,
  serverTimestamp 
} from "firebase/firestore";
import { getUserId, getUserToken } from "../utils/sessionStorage";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { db, auth } from "../utils/firebaseConfig"; // Asegúrate de importar tus configuraciones de Firebase
import Constants from 'expo-constants';
import CustomHeader from "../components/CustomHeader";


export default function ChatsScreen({ navigation, route }) {
  const { id_servicio } = route.params;
  const baseUrl = Constants.manifest.extra.baseUrl;
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setuserId] = useState("");
  useEffect(() => {
    const fetchChats = async () => {
      const userId = await getUserId();
      setuserId(userId)
      try {
        const querySnapshot = await getDocs(    query(collection(db, "Chats"), where("serviceId", "==", id_servicio)));

        const chatArray = [];

        for (const chatDoc of querySnapshot.docs) {
          const chatData = chatDoc.data();
          const otherUserId = chatData.users.find((uid) => uid !== userId);

          console.log( baseUrl + "/api/usuarios/" + otherUserId)
          const userApiUrl = baseUrl + "/api/usuarios/" + otherUserId;
          const userApiResponse = await axios.get(userApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const otherUserData = userApiResponse.data;

          const chatWithUserData = {
            ...chatData,
            otherUserName: otherUserData.nombreCompleto,
            otherUserImageUri: otherUserData.fotoPerfil,
          };

          chatArray.push(chatWithUserData);
        }

        setChats(chatArray);
      } catch (error) {
        console.log("Error al obtener chats:", error);
      }
    };

    fetchChats();
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      const loadToken = async () => {
        const userToken = await getUserToken();
        setToken(userToken);
      };

      loadToken();
    }, [])
  );

  const handleChatPress = async (chat) => {
    const chatId = chat.id;
    const otherUserId = chat.users.find((uid) => uid !== userId);

    navigation.navigate("ChatScreen", {
      chatId: chatId,
      senderId: userId,
      receiverId: otherUserId,
    });
  };

  const handleStartChat = async () => {
    try {
      const chatId = generateChatId(); // Generar un ID único para el chat
      const newChat = {
        id: chatId,
        serviceId: id_servicio,
        users: [userId, "109"], // Cambiar por el ID de usuario 2
      };

      await addDoc(collection(db, "Chats"), newChat);

      // Redirigir a la pantalla de chat
      navigation.navigate("ChatScreen", {
        chatId: chatId,
        senderId: userId,
        receiverId: "2", // Cambiar por el ID de usuario 2
      });
    } catch (error) {
      console.log("Error al iniciar el chat:", error);
    }
  };
  const generateChatId = () => {
    const randomId = Math.random().toString(36).substring(7);
    const timestamp = Date.now().toString();
    const chatId = `${randomId}-${timestamp}`;

    return chatId;
  };
  return (
    <View style={styles.container}>
      <CustomHeader/>
      <Text style={styles.headerText}>Chats Existentes</Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item)}
          >
            <Image
              source={
                item.otherUserImageUri === "../assets/images/perfil.png"
                  ? require("../assets/images/perfil.png")
                  : { uri: item.otherUserImageUri }
              }
              style={styles.profileImage}
            />
            <Text style={styles.username}>
              {item.otherUserName} {item.Apellido}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:20
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  startChatButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  startChatButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
