import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  useGetAllCompetenciesForProfessionQuery,
  useGetAllProfessionInfoQuery,
} from "@/api/userDataApiSlice";
import { useNavigation } from "@react-navigation/native";
import {
  setActiveCompetency,
  setCompeetenciesForProfession,
  setProfession,
} from "@/store/slices/userSile";
import { IGetUserData } from "@/api/types/ILogin";

const AppHomeScreen = ({ navigation }) => {
  const navigationHook = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.login.user
  ) as IGetUserData; // ID профессии пользователя из store

  const professionId = useSelector(
    (state: RootState) => state.user.professionId
  );

  const [completedCompetenciesCount, setCompletedCompetenciesCount] =
    useState(0);

  const { data: professionData, isLoading: isProfessionLoading } =
    useGetAllProfessionInfoQuery({ id: professionId }, { skip: !professionId }); // Запрос данных о профессии

  const { data: competenciesData, isLoading: isCompetenciesLoading } =
    useGetAllCompetenciesForProfessionQuery(
      { id: professionId },
      { skip: !professionId }
    ); // Запрос данных о компетенциях

  useEffect(() => {
    if (professionData && competenciesData) {
      const completedCompetencies = competenciesData.filter(
        (competencie) => competencie.is_completed
      );
      setCompletedCompetenciesCount(completedCompetencies.length);
      dispatch(setProfession(professionData));
      dispatch(setCompeetenciesForProfession(competenciesData));
    }
  }, [
    competenciesData,
    professionData,
    isProfessionLoading,
    isCompetenciesLoading,
    user,
    professionId,
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 15,
    },
    competencyList: {
      marginBottom: 20,
    },
    competencyItem: {
      backgroundColor: "#e57454",
      padding: 15,
      borderRadius: 15,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    competencyName: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
    statusText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    skillContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 20, // Отступы по бокам, если нужно
      marginTop: 20, // Отступ сверху
    },
    skillBox: {
      marginTop: 150,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      padding: 20,
      width: 150, // Ширина блока
      aspectRatio: 1, // Соотношение сторон 1:1 для квадратной формы
    },
    learnedBox: {
      backgroundColor: "#1ABC9C", // Зеленый цвет
    },
    remainingBox: {
      backgroundColor: "#E74C3C", // Красный цвет
    },
    countText: {
      fontSize: 36,
      fontWeight: "bold",
      color: "white",
    },
    label: {
      marginTop: 5,
      textAlign: "center",
      color: "white",
      fontWeight: "500",
    },
    bottomContainer: {
      position: "absolute",
      bottom: -350,
      left: 0,
      right: 0,
      backgroundColor: "#244151",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
    },
    buttonText: {
      backgroundColor: "#e57454",
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 15,
      color: "white",
      fontSize: 18,
      textAlign: "center", // Центрируем текст
      fontWeight: "bold",
    },
  });

  if (isProfessionLoading || isCompetenciesLoading || !user?.id) {
    return <Text>Загрузка...</Text>;
  }

  if (!professionData || !competenciesData) {
    return <Text>Ошибка загрузки данных</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, overflow: "hidden", position: "relative" }}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: 20,
              backgroundColor: "#244151",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <Text style={styles.title}>
              {user.first_name} {user.last_name}
              {"\n"}({professionData.name})
            </Text>
          </View>

          <View style={styles.skillContainer}>
            <View style={[styles.skillBox, styles.learnedBox]}>
              <Text style={styles.countText}>{completedCompetenciesCount}</Text>
              <Text style={styles.label}>навыков</Text>
              <Text style={styles.label}>усвоено</Text>
            </View>
            <View style={[styles.skillBox, styles.remainingBox]}>
              <Text style={styles.countText}>
                {competenciesData.length - completedCompetenciesCount}
              </Text>
              <Text style={styles.label}>навыков</Text>
              <Text style={styles.label}>осталось изучить</Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CompetencyMap");
              }}
            >
              <Text style={styles.buttonText}>Карта навыков</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AppHomeScreen;
