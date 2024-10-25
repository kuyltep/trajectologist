import { useLoginMutation } from "@/api/loginApiSlice";
import React, { useContext, useState } from "react";
import { Tooltip } from "react-native-tooltip-mroads";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import { AuthContext } from "../AuthContext";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "@/store/slices/loginSlice";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let IsError = false;
  const [loginMutation, { isLoading, isSuccess }] = useLoginMutation();
  const handleLogin = async () => {
    const { data, error } = await loginMutation({ login: username, password });
    IsError = error || !data ? true : false;
    if (IsError) {
      return;
    }
    dispatch(setToken({ token: data?.access_token }));
    dispatch(setUserId({ userId: data?.userId }));
    navigation.navigate("Home");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: "hidden",
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
        source={require("@/assets/images/login.jpg")}
        resizeMethod="resize"
        resizeMode="cover"
        width={100}
        height={100}
      >
        <View style={{ padding: 20, marginTop: 20 }}>
          <Text style={styles.title}>Вход</Text>
          <TextInput
            placeholder="Логин"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
          />
          <TextInput
            placeholder="Пароль"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.input}
          />
          {IsError ? (
            <Text
              style={{
                color: "red",
                fontSize: 18,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Возникла ошибка при входе!
            </Text>
          ) : null}
          <Text style={styles.button} onPress={handleLogin}>
            Войти
          </Text>
          <Text
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            Регистрация
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
