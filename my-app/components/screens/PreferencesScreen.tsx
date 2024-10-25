import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SelectMultiple from "react-native-select-multiple";

const PreferencesScreen = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [desiredSalary, setDesiredSalary] = useState("");

  const skills = [
    { value: "1", label: "JavaScript" },
    { value: "2", label: "React Native" },
    { value: "3", label: "Redux" },
    { value: "4", label: "Node.js" },
    { value: "5", label: "TypeScript" },
    // ... другие навыки
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8E3D4",
      overflow: "hidden",
    },
    contentContainer: {
      // Для центрирования контента
      flexGrow: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    titleContainer: {
      // Для заголовка
      marginBottom: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "white", // Темно-коричневый
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
      color: "white",
      textAlign: "left",
      marginBottom: 15,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: "#5C3D2E",
      marginBottom: 10,
    },
    input: {
      backgroundColor: "#e57454", // Светло-оранжевый
      padding: 15,
      borderRadius: 15,
      fontSize: 16,
      color: "#fff", // Белый текст
    },
    multiSelectContainer: {
      borderRadius: 15,
      backgroundColor: "#e57454", // Светло-оранжевый
      paddingHorizontal: 15,
      maxHeight: 200,
    },
    multiSelect: {
      backgroundColor: "#e57454",
    },
    selectMultipleContainer: {
      // стили для контейнера SelectMultiple
      borderRadius: 15,
      backgroundColor: "#e57454",
    },
    selectMultipleItem: {
      // стили для выбранного элемента
      backgroundColor: "transparent",
      paddingHorizontal: 15,
    },
    selectMultipleLabel: {
      // стили для текста элемента
      color: "white",
      fontWeight: "500",
    },
    button: {
      backgroundColor: "#e57454",
      marginTop: 30,
      color: "#fff",
      fontWeight: 700,
      fontSize: 20,
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 15,
      textAlign: "center",
    },
  });

  const onSelectionsChange = (selectedItems: string[]) => {
    setSelectedSkills(selectedItems);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/screen1.jpg")}
        style={styles.container} // Растягиваем изображение на весь экран
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Пора узнать Вас получше</Text>
            <Text style={styles.title}>Укажите свои предпочтения.</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Ваши навыки:</Text>
            <ScrollView
              style={{ maxHeight: 200, borderRadius: 30, padding: 5 }}
            >
              <SelectMultiple
                items={skills}
                selectedItems={selectedSkills}
                onSelectionsChange={onSelectionsChange}
                rowStyle={styles.selectMultipleItem}
                labelStyle={styles.selectMultipleLabel}
                style={styles.selectMultipleContainer}
              />
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Желаемая з/п:</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите желаемую зарплату"
              keyboardType="numeric"
              value={desiredSalary}
              onChangeText={setDesiredSalary}
              placeholderTextColor="#ffffff80" // Светло-серый плейсхолдер
            />
          </View>

          <View>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Подобрать профессии
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default PreferencesScreen;
