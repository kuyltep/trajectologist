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
import {
  setActiveCompetencyId,
  setActiveStepId,
} from "@/store/slices/userSile";
import { ICompetencyAll } from "@/api/types/ICompetency";
import { useNavigation } from "@react-navigation/native";
import { useGetProfileQuery } from "@/api/loginApiSlice";

const StepsMapScreen = ({ navigation }) => {
  const user = useSelector(
    (state: RootState) => state.login?.user
  ) as IGetUserData;
  const dispatch = useDispatch();
  const professionId = user?.profession_id;
  const navigationHook = useNavigation();
  const scrollViewRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  const { data: getProfile } = useGetProfileQuery(null, {
    refetchOnMountOrArgChange: 1, // Повторно выполнять запрос при каждом монтировании или изменении аргументов
  });

  useEffect(() => {}, [getProfile]);
  const activeCompetency = useSelector(
    (state: RootState) => state.user.activeCompetency
  ) as ICompetencyAll;
  const userStepsSorted = activeCompetency.steps
    .slice()
    .sort((a, b) => Number(a.is_completed) - Number(b.is_completed))
    .reverse();

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [userStepsSorted]);

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
    backButton: {
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 1, //  Чтобы кнопка была поверх фона
      padding: 5,
      borderRadius: 5,
      backgroundColor: "#e57454", // Полупрозрачный черный фон
    },
    scrollViewContent: {
      height: screenHeight * (userStepsSorted?.length + 1) + 100,
      paddingHorizontal: 20,
      paddingTop: 50, // Верхний отступ
    },
  });

  const handleGoBack = () => {
    navigationHook.goBack();
  };

  const calculatePath = (index) => {
    if (index + 1 >= userStepsSorted.length) {
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
          {userStepsSorted?.map((userStep, index) => (
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
        {userStepsSorted?.map((userStep, index) => {
          const isCompleted = userStep.is_completed;
          return (
            <View key={index}>
              <View
                onPointerDown={() => {
                  dispatch(setActiveStepId(userStep.id));
                  navigation.navigate("StepMoreInfo");
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
                        : Dimensions.get("window").width - 50 - 100,
                    top: 10 + index * 90, // Изменение top для каждой строки
                    zIndex: 10,
                  },
                ]}
              >
                {index < userStepsSorted.length - 1 && userStep.is_completed ? (
                  <View style={styles.crown}>
                    <Icon name="verified" size={32} color="#F1C40F" />
                  </View>
                ) : null}
                <Text style={styles.skillNumber}>{index + 1}</Text>
              </View>
              <Svg height="100%" width="100%" style={{ position: "absolute" }}>
                <Path // Path только если calculatePath вернул значение
                  d={calculatePath(index)}
                  fill="none"
                  stroke="#FF5733"
                  strokeWidth={2}
                  strokeDasharray={[5, 5]}
                />
              </Svg>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StepsMapScreen;
