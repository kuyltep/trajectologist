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
import { useGetProfileQuery } from "@/api/loginApiSlice";
import {
  useGetCompetencyByIdQuery,
  useUpdateUserCompetencyMutation,
} from "@/api/userDataApiSlice";
import { setActiveCompetency } from "@/store/slices/userSile";
import { IUserCompetencyAll } from "@/api/types/ILogin";

const CompetencyMoreInfoScreen = ({ navigation }) => {
  const navigationHook = useNavigation();
  const dispatch = useDispatch();
  const competencyId = useSelector(
    (state: RootState) => state.user.activeCompetencyId
  );
  const compData = useSelector(
    (state: RootState) => state.user.activeCompetency
  ) as IUserCompetencyAll;
  const {
    data: competencyData,
    isLoading: isCompetencyLoading,
    refetch,
  } = useGetCompetencyByIdQuery(
    { id: competencyId },
    {
      refetchOnMountOrArgChange: 1, // Повторно выполнять запрос при каждом монтировании или изменении аргументов
    }
  );

  const { data: userData, isLoading: isUserLoading } = useGetProfileQuery(null);

  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepsToAcquire, setStepsToAcquire] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    if (competencyData && userData) {
      const completedSteps = competencyData.steps.filter(
        (step) => step.is_completed
      );
      const stepsToAcquire = competencyData.steps.filter(
        (step) => !step.is_completed
      );
      dispatch(setActiveCompetency(competencyData));
      setCompletedSteps(completedSteps);
      setStepsToAcquire(stepsToAcquire);
    }
  }, [competencyData, userData, isUpdate, compData]);

  const handleGoBack = () => {
    refetch();
    navigationHook.goBack();
  };

  const [updateCompetency, { isLoading: isUpdating }] =
    useUpdateUserCompetencyMutation(); // Вызываем хук здесь

  const updateUserCompetency = async () => {
    if (isUpdating) return; // Предотвращаем повторные нажатия во время обновления
    try {
      const data = await updateCompetency({
        id: competencyData.id,
        is_completed: true,
      }).unwrap();
      dispatch(setActiveCompetency(data));
      refetch();
      handleGoBack();
    } catch (error) {
      console.error("Ошибка обновления статуса компетенции:", error);
    }
  };
  const handleGoToSteps = () => {
    navigation.navigate("StepsMap");
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

  if (isCompetencyLoading || isUserLoading) {
    return <Text>Загрузка...</Text>;
  }

  if (!competencyData || !userData) {
    return <Text>Ошибка загрузки данных</Text>;
  }

  return competencyData?.competency ? (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="white" />{" "}
        </TouchableOpacity>

        <ScrollView style={styles.container}>
          <Text style={styles.title}>{competencyData.competency.name}</Text>
          <Text style={styles.description}>
            {competencyData.competency.description}
          </Text>

          {competencyData.steps.length ? (
            <View style={styles.infoBlock}>
              <Text style={styles.infoBlockTitle}>Пройденные этапы :</Text>
              {completedSteps.map((step) => (
                <Text key={step.id} style={styles.competencyItem}>
                  - {step.step.name}
                </Text>
              ))}
            </View>
          ) : null}
          {competencyData.steps.length ? (
            <View style={styles.infoBlock}>
              <Text style={styles.infoBlockTitle}>Непройденные этапы :</Text>
              {stepsToAcquire.map((step) => (
                <Text key={step.id} style={styles.competencyItem}>
                  - {step.step.name}
                </Text>
              ))}
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={updateUserCompetency}
            disabled={competencyData.is_completed}
          >
            <Text style={styles.buttonText}>
              {competencyData.is_completed ? "Изучена" : "Не изучена"}
            </Text>
          </TouchableOpacity>

          {competencyData.steps.length ? (
            <TouchableOpacity
              style={styles.stepsButton}
              onPress={handleGoToSteps}
            >
              <Text style={styles.stepsButtonText}>Перейти к этапам</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </View>
  ) : null;
};

export default CompetencyMoreInfoScreen;
