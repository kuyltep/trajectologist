import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { SkillsPicker } from "../SkillsPicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Отступы по бокам
    paddingTop: 100,
    paddingBottom: 100,
    backgroundColor: "orange",
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontSize: 22,
    color: "#fff",
    fontWeight: 700,
    lineHeight: 36,
    marginBottom: 50,
  },
  salaryInput: {
    fontSize: 22,
    color: "#998b8bbf",
    fontWeight: 700,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "red",
  },
});

export const AppHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Пора узнать Вас по лучше :) Укажите свои предпочтения.
      </Text>
      {/* Кнопка "Ваши увлечения" (может быть удалена) */}
      {/* <Button title="Ваши увлечения" onPress={() => {}} /> */}
      <SkillsPicker />
      <TextInput
        style={styles.salaryInput}
        keyboardType="numeric"
        placeholder="Желаемая з/п"
      />
    </View>
  );
};
