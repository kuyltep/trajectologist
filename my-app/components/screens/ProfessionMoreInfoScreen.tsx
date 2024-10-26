import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useGetProfessionAllInfoQuery } from "@/api/selectedApiSlice";
import { usePostSelectUserProfessionMutation } from "@/api/selectedApiSlice";
import { IProfessionAllInfo } from "@/api/types/IProfession";
import { useGetProfileQuery } from "@/api/loginApiSlice";
import { setMoreInfoProfession } from "@/store/slices/selectSlice";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { setActiveCompetencyId } from "@/store/slices/userSile";

const ProfessionMoreInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const professionId = useSelector(
    (state: RootState) => state.selected.moreInfoProfessionId
  );
  const navigationHook = useNavigation(); // Хук для навигации

  const handleGoBack = () => {
    navigationHook.goBack(); // Возвращаемся на предыдущий экран
  };
  const { data: professionData, isLoading: isProfessionLoading } =
    useGetProfessionAllInfoQuery({ id: professionId });
  const { data: userData, isLoading: isUserLoading } = useGetProfileQuery(null);

  const [userCompetenciesInProfession, setUserCompetenciesInProfession] =
    useState([]);
  const [competenciesToAcquire, setCompetenciesToAcquire] = useState([]);
  useEffect(() => {
    dispatch(setMoreInfoProfession(professionData));

    if (!isUserLoading && !isProfessionLoading) {
      const userCompetenciesInProfession = userData?.user_competencies.filter(
        (userCompetency) =>
          professionData?.competencies.some(
            (professionCompetency) =>
              professionCompetency.id === userCompetency.competency.id
          )
      );
      const competenciesToAcquire = professionData.competencies.filter(
        (professionCompetency) =>
          !userData?.user_competencies.some(
            (userCompetency) =>
              userCompetency.competency.id === professionCompetency.id
          )
      );
      setCompetenciesToAcquire(competenciesToAcquire);
      setUserCompetenciesInProfession(userCompetenciesInProfession);
    }
  }, [professionData, userData, isUserLoading, isProfessionLoading]);

  const [
    selectProfession,
    { isLoading: isSelecting, isSuccess: isSelectSuccess },
  ] = usePostSelectUserProfessionMutation();

  const handleSelectProfession = async () => {
    try {
      if (professionId) {
        const result = await selectProfession({
          profession_id: professionId,
        }).unwrap();
        navigation.navigate("Home");
      }
    } catch (e) {
      console.log(e);
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
  });

  return professionData && userData ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Поведение для iOS и Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={{ flex: 1, backgroundColor: "orange" }}>
        <ImageBackground
          source={require("@/assets/images/orange.jpeg")}
          resizeMode="repeat"
          style={{ flex: 1 }}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color="white" />{" "}
          </TouchableOpacity>
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.title}>{professionData.name}</Text>
              <Text style={styles.description}>
                {professionData.description}
              </Text>

              <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>
                  З/п- от {professionData.salary}
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Ваши навыки:</Text>
                {userCompetenciesInProfession.length &&
                  userCompetenciesInProfession.map((competency) => (
                    <Text key={competency.id} style={styles.competencyItem}>
                      - {competency.competency.name}
                    </Text>
                  ))}
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>
                  Навыки которые стоит приобрести :
                </Text>
                {competenciesToAcquire.length &&
                  competenciesToAcquire.map((competency) => (
                    <Text key={competency.id} style={styles.competencyItem}>
                      - {competency.name}
                    </Text>
                  ))}
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSelectProfession}
                  disabled={isSelecting}
                >
                  <Text style={styles.buttonText}>
                    {isSelecting ? "Выбор..." : "Выбрать профессию"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  ) : null;
};

export default ProfessionMoreInfoScreen;
