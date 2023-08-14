import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import CustomHeader from "../components/CustomHeader";
import Constants from "expo-constants";
import axios from "axios";
import { getUserToken } from "../utils/sessionStorage";

export default function ChatScreen({ route, navigation }) {
  const baseUrl = Constants.manifest.extra.baseUrl;
  const { chatId, senderId, receiverId } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [otherUser, setOtherUser] = useState([]);
  const [token, setToken] = useState("");
  const [calificacion, setCalificacion] = useState("");

  function irACalificaciones() {
    navigation.navigate("Calificaciones",{userId:  receiverId});
  }

  useEffect(() => {
    const fetchDataUser = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
      const userApiUrl = baseUrl + "/api/usuarios/" + receiverId;
      const userApiResponse = await axios.get(userApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const otherUserData = userApiResponse.data;
      setOtherUser(otherUserData);


      const calificacionUrl = baseUrl + "/api/calificaciones/calificacion-general//" + receiverId;
      const calificacionResponse = await axios.get(calificacionUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const calificacion = calificacionResponse.data;
      setCalificacion(calificacion);
    };
    fetchDataUser();

    // Consultar los mensajes del chat
    const q = query(
      collection(db, "Mensajes"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageArray = snapshot.docs.map((doc) => doc.data());
      setMessages(messageArray);
    });

    return () => unsubscribe();
  }, [chatId, token, calificacion]);

  const handleSend = async () => {
    if (messageText.trim() === "") return;

    try {
      const message = {
        text: messageText,
        senderId: senderId,
        receiverId: receiverId,
        timestamp: serverTimestamp(),
        chatId: chatId, // Agregar la referencia al chat en el mensaje
      };

      await addDoc(collection(db, "Mensajes"), message);
      setMessageText("");
    } catch (error) {
      console.log("Error al enviar el mensaje:", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === senderId;
    const containerStyle = isCurrentUser
      ? styles.currentUserMessageContainer
      : styles.otherUserMessageContainer;
    const textStyle = isCurrentUser
      ? styles.currentUserMessageText
      : styles.otherUserMessageText;

    return (
      <View style={[styles.messageContainer, containerStyle]}>
        <Text style={textStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>irACalificaciones()}
      >
        <Image
          source={
            otherUser.fotoPerfil === "../assets/images/perfil.png"
              ? require("../assets/images/perfil.png")
              : { uri: otherUser.fotoPerfil }
          }
          style={styles.profileImage}
        />
        <Text style={styles.username}>{otherUser.nombreCompleto}</Text>
        <Text style={styles.calificacion}>{calificacion} estrellas</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderMessage}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: "#ebebeb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  currentUserMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#4caf50",
  },
  otherUserMessageContainer: {
    alignSelf: "flex-start",
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
  messageText: {
    fontSize: 16,
  },
  currentUserMessageText: {
    fontSize: 16,
    color: "#fff",
  },
  otherUserMessageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  calificacion:{
    marginLeft:40
  }
});
