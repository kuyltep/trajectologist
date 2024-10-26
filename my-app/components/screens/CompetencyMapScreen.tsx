import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Svg, { Path, Circle } from "react-native-svg";
import { IGetUserData } from "@/api/types/ILogin";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setActiveCompetencyId } from "@/store/slices/userSile";
import { useNavigation } from "@react-navigation/native";
import { useGetProfileQuery } from "@/api/loginApiSlice";

const CompetencyMapScreen = ({ navigation }) => {
  const user = useSelector(
    (state: RootState) => state.login?.user
  ) as IGetUserData;
  const dispatch = useDispatch();
  const professionId = user?.profession_id;
  const scrollViewRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const navigationHook = useNavigation();

  const { data: getProfile } = useGetProfileQuery(null, {
    refetchOnMountOrArgChange: 1, // Повторно выполнять запрос при каждом монтировании или изменении аргументов
  });

  useEffect(() => {}, [getProfile]);

  const userCompetenciesSorted = user?.user_competencies
    .slice()
    .sort((a, b) => Number(a.is_completed) - Number(b.is_completed))
    .reverse();

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [userCompetenciesSorted]);

  const handleGoBack = () => {
    navigationHook.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    skillBox: {
      position: "relative", // Для позиционирования короны
      alignItems: "center",
      justifyContent: "center",
      width: 80, // Размер круга
      height: 80,
      borderRadius: 50,
      zIndex: 10,
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
    skillBoxCompleted: {
      backgroundColor: "#1ABC9C", // Зеленый
    },
    skillBoxNotCompleted: {
      backgroundColor: "#E74C3C", // Красный
    },
    skillNumber: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    skillText: {
      fontSize: 14,
      color: "white",
      marginTop: 5,
      textAlign: "center",
    },
    crown: {
      position: "absolute",
      top: -20, // Позиция короны над кругом
    },
    scrollViewContent: {
      height: screenHeight * (userCompetenciesSorted?.length + 1) + 100,
      paddingHorizontal: 20,
      paddingTop: 50, // Верхний отступ
    },
  });

  const calculatePath = (index) => {
    if (index + 1 >= userCompetenciesSorted.length) {
      return null;
    }

    const step = 85; // Вертикальное расстояние
    const circleSize = 80; // Диаметр круга

    // Координаты центра текущего круга
    const currentX =
      index % 3 === 0
        ? 20 + circleSize / 2 // + circleSize / 2
        : index % 3 === 1
        ? Dimensions.get("window").width / 2 - circleSize / 2 // Центр
        : Dimensions.get("window").width - 20 - circleSize * 1.5; // - circleSize
    const currentY = 10 + index * step + circleSize / 2; // + circleSize / 2

    // Координаты центра следующего круга
    const nextIndex = index + 1;
    const nextX =
      nextIndex % 3 === 0
        ? 20 + circleSize / 2
        : nextIndex % 3 === 1
        ? Dimensions.get("window").width / 2 - circleSize / 2
        : Dimensions.get("window").width - 20 - circleSize * 1.5;
    const nextY = 10 + nextIndex * step + circleSize / 2;

    // Путь от центра текущего круга к центру следующего
    const path = `M ${currentX},${currentY} 
                C ${currentX + (nextX - currentX) / 2},${currentY} 
                  ${currentX + (nextX - currentX) / 2},${nextY}
                  ${nextX},${nextY}`;
    return path;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color="white" />{" "}
        </TouchableOpacity>
        <Svg height="100%" width="100%" style={{ position: "absolute" }}>
          {userCompetenciesSorted?.map((userStep, index) => (
            <Path
              key={index} // Добавьте key для Path
              d={calculatePath(index)} // Path только если calculatePath вернул значение
              fill="none"
              stroke="white"
              strokeWidth={6}
              strokeDasharray={[20, 20]}
            />
          ))}
        </Svg>

        {userCompetenciesSorted?.map((userCompetency, index) => {
          const isCompleted = userCompetency.is_completed;
          return (
            <View key={index}>
              <View
                onPointerDown={() => {
                  dispatch(setActiveCompetencyId(userCompetency.id));
                  navigation.navigate("CompetencyMoreInfo");
                }}
                style={[
                  styles.skillBox,
                  isCompleted
                    ? styles.skillBoxCompleted
                    : styles.skillBoxNotCompleted,
                  {
                    position: "absolute", // Абсолютное позиционирование
                    left:
                      index % 3 === 0
                        ? 20
                        : index % 3 === 1
                        ? Dimensions.get("window").width / 2 - 50
                        : Dimensions.get("window").width / 1.5,
                    top: 10 + index * 85, // Изменение top для каждой строки
                    zIndex: 10,
                  },
                ]}
              >
                {index < userCompetenciesSorted.length - 1 &&
                userCompetency.is_completed ? (
                  <View style={styles.crown}>
                    <Icon name="verified" size={32} color="#F1C40F" />
                  </View>
                ) : null}
                <Text style={styles.skillNumber}>{index + 1}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CompetencyMapScreen;
