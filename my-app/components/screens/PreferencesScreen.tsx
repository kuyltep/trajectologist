import {
  useGetAllCompetenciesQuery,
  usePostPotencialUserProfessionsMutation,
} from "@/api/selectedApiSlice";
import {
  setComepetencies,
  setPotencialProfessions,
  setSalary,
  setSelectedSkills,
  setSelectedSkillsIds,
} from "@/store/slices/selectSlice";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-native-tooltip-mroads";

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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const PreferencesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.selected.selectedSkills
  );
  const selectedIds = useSelector(
    (state: RootState) => state.selected.selectedSkillsIds
  );
  const competencies = useSelector(
    (state: RootState) => state.selected.competencies
  );
  const salary = useSelector((state: RootState) => state.selected.salary);
  const [error, setError] = useState("");

  const { data, isError, isLoading } = useGetAllCompetenciesQuery(null);

  const restructedData = data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const setSalaryStore = (value: string) => {
    dispatch(setSalary(+value));
  };

  useEffect(() => {
    if (isError) {
      setError("Ошибка при загрузке компетенций");
    } else if (restructedData) {
      dispatch(setComepetencies(restructedData));
    }
  }, [data, isError]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "orange",
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
    tooltip: {
      // Новый стиль для текста тултипа
      color: "white",
      backgroundColor: "red",
      textAlign: "center",
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

  const onSelectionsChange = (selectedItems: object[]) => {
    dispatch(setSelectedSkills(selectedItems));
  };

  const [
    postPotencialProfessions,
    {
      isLoading: isPosting,
      isSuccess,
      data: professionsData,
      error: professionsError,
    },
  ] = usePostPotencialUserProfessionsMutation();

  const handleSelectProfessionsForUser = async () => {
    if (!selected.length || !salary) {
      setError("Выберите навыки и укажите желаемую зарплату"); // Более информативное сообщение
      return;
    }

    try {
      const response = await postPotencialProfessions({
        competencies_id: selectedIds,
        salary,
      }).unwrap();

      dispatch(setPotencialProfessions(response));

      console.log("Успешно подобранные профессии:", response);
      navigation.navigate("Profession");
    } catch (err) {
      console.error("Ошибка при подборе профессий:", err);
      setError("Ошибка при подборе профессий. Попробуйте еще раз."); //  Сообщение об ошибке
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/orange.jpeg")}
        resizeMode="repeat"
        style={{ flex: 1 }}
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
            <Text style={styles.title}>Пора узнать Вас получше</Text>
            <Text style={styles.title}>Укажите свои предпочтения.</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Ваши навыки:</Text>
            <ScrollView
              style={{ maxHeight: 200, borderRadius: 30, padding: 5 }}
            >
              <SelectMultiple
                items={competencies}
                selectedItems={selected}
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
              value={String(salary)}
              onChangeText={(value) => setSalaryStore(value)}
              placeholderTextColor="#ffffff80" // Светло-серый плейсхолдер
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleSelectProfessionsForUser} // Используйте правильную функцию
              style={styles.button}
              disabled={isPosting} // Отключаем кнопку во время запроса
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {isPosting ? "Подбор..." : "Подобрать профессии"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default PreferencesScreen;
