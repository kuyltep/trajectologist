import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store"; // Путь к вашему store
import { setMoreInfoProfessionId } from "@/store/slices/selectProfession"; // Импортируйте ваше действие
import { useGetProfileQuery } from "@/api/loginApiSlice";
import { Tooltip } from "react-native-tooltip-mroads";
import { setUser } from "@/store/slices/loginSlice";
import { IGetUserData } from "@/api/types/ILogin";

const ProfessionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const professions = useSelector(
    (state: RootState) => state.selected.potencialProfessions
  );
  const [error, setError] = useState("");

  const { data, isError } = useGetProfileQuery(null);
  const user = useSelector(
    (state: RootState) => state.login.user
  ) as IGetUserData;

  useEffect(() => {
    if (isError) {
      setError("Ошибка при загрузке компетенций");
    } else if (data) {
      dispatch(setUser(data));
    }
  }, [data, isError]);

  const handleProfessionPress = (professionId) => {
    dispatch(setMoreInfoProfessionId(professionId));
    navigation.navigate("ProfessionMoreInfo");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e57454",
      overflow: "hidden",
    },
    tooltip: {
      // Новый стиль для текста тултипа
      color: "white",
      backgroundColor: "red",
      textAlign: "center",
    },
    contentContainer: {
      paddingVertical: 50,
      flexGrow: 1,
      paddingHorizontal: 20,
    },
    titleContainer: {
      marginBottom: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      textAlign: "left",
    },
    professionItem: {
      backgroundColor: "#e57454",
      padding: 15,
      borderRadius: 15,
      marginBottom: 10,
      flexDirection: "row", // Для выравнивания текста и плюса
      justifyContent: "space-between", // Равномерное распределение
      alignItems: "center", // Центрирование по вертикали
    },
    professionsContainer: {
      paddingVertical: 20,
    },
    professionName: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
    plusText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/screen1.jpg")} // Путь к вашему изображению
        style={styles.container}
        resizeMode="cover"
      >
        <Tooltip
          isVisible={error.length > 0}
          onClose={() => setError("")}
          height={60}
          width={200}
          backgroundColor="transparent"
          popoverOffset={{ x: 0, y: -100 }}
          withPointer={false}
          placement="top"
        >
          <Text style={styles.tooltip}>{error}</Text>
        </Tooltip>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Мы подобрали профессии подходящие под Ваши интересы.{"\n"}
              {"\n"}Выберите одну из них:
            </Text>
          </View>

          <View style={styles.professionsContainer}>
            {professions.map((profession) => {
              return (
                <TouchableOpacity
                  key={profession.id}
                  style={styles.professionItem}
                  onPress={() => handleProfessionPress(profession.id)}
                >
                  <Text style={styles.professionName}>{profession.name}</Text>
                  <Text style={styles.plusText}>{profession.salary}+</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProfessionsScreen;
