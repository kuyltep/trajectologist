import { useRegisterMutation } from "@/api/loginApiSlice";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import { Input, Button } from "react-native-elements";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [registerUser] = useRegisterMutation({});
  const handleRegister = async () => {
    const { data, error } = await registerUser({
      login: username,
      firstName,
      lastName,
      password,
    });
    if (!data || error) {
      return;
    }
    navigation.navigate("Login");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: "hidden",
      backgroundColor: "orange",
    },
    title: {
      marginBottom: 20,
      textAlign: "center",
      fontWeight: 700,
      fontSize: 24,
      color: "#fff",
    },
    input: {
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 15,
      backgroundColor: "orange",
      marginBottom: 30,
      fontWeight: 500,
      fontSize: 18,
      color: "#fff",
      borderBottomWidth: 0,
    },
    button: {
      backgroundColor: "orange",
      marginTop: 20,
      color: "#fff",
      fontWeight: 700,
      fontSize: 20,
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 15,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
        style={{ flex: 1 }}
      >
        <View style={{ padding: 20, marginTop: 20 }}>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Логин"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
          />
          <TextInput
            placeholder="Пароль"
            underlineColorAndroid={"transparent"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.input}
          />
          <TextInput
            placeholder="Имя"
            underlineColorAndroid={"transparent"}
            secureTextEntry
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Фамилия"
            underlineColorAndroid={"transparent"}
            secureTextEntry
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            style={styles.input}
          />
          <Text style={styles.button} onPress={handleRegister}>
            Зарегистрироваться
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
