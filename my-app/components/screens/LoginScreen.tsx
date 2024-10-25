import { useGetProfileQuery, useLoginMutation } from "@/api/loginApiSlice";
import React, { useContext, useRef, useState } from "react";
import { Tooltip } from "react-native-tooltip-mroads";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "@/store/slices/loginSlice";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const dispatch = useDispatch();
  const tooltipRef = useRef(null);

  const [loginMutation, { isLoading, isSuccess }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const { data, error } = await loginMutation({
        login: username,
        password,
      });
      if (error || !data) {
        setLoginError("Возникла ошибка при входе!"); // Более информативное сообщение об ошибке
        if (tooltipRef.current) {
          tooltipRef.current.show();
        }
        return;
      }
      dispatch(setToken({ token: data?.access_token }));
      dispatch(setUserId({ userId: data?.userId }));
      navigation.navigate(data.professionId ? "Home" : "Preferences");
    } catch (err) {
      console.error("Login error:", err); // Логируем ошибку в консоль
      setLoginError("Возникла непредвиденная ошибка."); // Общее сообщение об ошибке
      if (tooltipRef.current) {
        tooltipRef.current.show();
      }
    }
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
      backgroundColor: "#e57454",
      marginBottom: 30,
      fontWeight: 500,
      fontSize: 18,
      color: "#fff",
      borderBottomWidth: 0,
    },
    button: {
      backgroundColor: "#e57454",
      marginTop: 20,
      color: "#fff",
      fontWeight: 700,
      fontSize: 20,
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 15,
      textAlign: "center",
    },
    tooltip: {
      // Новый стиль для текста тултипа
      color: "white",
      backgroundColor: "red",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Tooltip
        isVisible={loginError.length > 0}
        onClose={() => setLoginError("")}
        height={60}
        width={200}
        backgroundColor="transparent"
        popoverOffset={{ x: 0, y: -100 }}
        withPointer={false}
        placement="top"
      >
        <Text style={styles.tooltip}>{loginError}</Text>
      </Tooltip>
      <ImageBackground
        source={require("@/assets/images/login.jpg")}
        resizeMethod="resize"
        resizeMode="cover"
        style={{ flex: 1 }}
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

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Войти
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Регистрация
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
