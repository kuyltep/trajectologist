import { Image, StyleSheet, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AppHomeScreen } from "@/components/screens/HomeScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import AuthContext from "@/components/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <AuthContext>
      <Provider store={store}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={AppHomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContext>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    backgroundColor: "#fff",
  },
});
