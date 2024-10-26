import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useGetStepAllInfoQuery,
  useUpdateUserStepMutation,
} from "@/api/userDataApiSlice"; // Новые хуки
import { setActiveStep } from "@/store/slices/userSile"; // action для обновления store

const StepMoreInfoScreen = ({ navigation }) => {
  const navigationHook = useNavigation();
  const dispatch = useDispatch();
  const stepId = useSelector((state: RootState) => state.user.activeStepId);
  const {
    data: stepData,
    isLoading: isStepLoading,
    refetch,
  } = useGetStepAllInfoQuery(
    { id: stepId },
    { skip: !stepId, refetchOnMountOrArgChange: 1 }
  ); // Запрос данных о шаге, skip, если id нет

  const [updateStep, { isLoading: isUpdating }] = useUpdateUserStepMutation();

  const handleGoBack = () => {
    navigationHook.goBack();
  };

  useEffect(() => {}, [stepData]);

  const handleUpdateStep = async () => {
    try {
      const updatedStep = await updateStep({
        id: stepId,
        is_completed: !stepData.is_completed, // Инвертируем статус is_completed
      }).unwrap();

      dispatch(setActiveStep(updatedStep));
      refetch(); // Перезапрашиваем данные о шаге, чтобы обновить страницу
    } catch (error) {
      console.error("Ошибка обновления статуса шага:", error);
      // Обработайте ошибку, например, отобразите сообщение пользователю
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      padding: 20,
    },
    backButton: {
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 1, //  Чтобы кнопка была поверх фона
      padding: 5,
      borderRadius: 5,
      backgroundColor: "#e57454", // Полупрозрачный черный фон
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      color: "white",
      marginBottom: 20,
    },
    infoBlock: {
      backgroundColor: "#e57454",
      padding: 15,
      borderRadius: 15,
      marginBottom: 20,
    },
    infoBlockTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
    },
    competencyItem: {
      fontSize: 16,
      color: "white",
      marginBottom: 5,
    },
    button: {
      backgroundColor: "#e57454",
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    stepsButton: {
      // Стили для кнопки "Шаги"
      backgroundColor: "#e57454",
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 20, // Отступ сверху
    },
    stepsButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  if (isStepLoading) {
    return <Text>Загрузка...</Text>;
  }

  if (!stepData) {
    return <Text>Ошибка загрузки данных</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="white" />{" "}
        </TouchableOpacity>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        >
          <Text style={styles.title}>{stepData.step.name}</Text>
          <Text style={styles.description}>{stepData.step.description}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdateStep}
            disabled={isUpdating}
          >
            <Text style={styles.buttonText}>
              {isUpdating
                ? "Обновление..."
                : stepData.is_completed
                ? "Изучен"
                : "Не изучен"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default StepMoreInfoScreen;
