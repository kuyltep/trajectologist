import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import SelectMultiple from "react-native-select-multiple";

export const SkillsPicker = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    { label: "JavaScript", value: "javascript" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
  ];

  const styles = StyleSheet.create({
    list: {
      height: 100,
      overflow: "hidden",
      marginBottom: 40,
    },
    text: {
      fontSize: 22,
      color: "#fff",
      fontWeight: 700,
      marginBottom: 20,
    },
    element: {
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 15,
      backgroundColor: "#fff",
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelectionsChange = (selectedItems) => {
    setSelectedSkills(selectedItems);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedSkills.length);
  };

  return (
    <View>
      <SelectMultiple
        items={skills}
        selectedItems={selectedSkills}
        onSelectionsChange={onSelectionsChange}
      />
      {selectedSkills.length > 0 && (
        <View>
          <Text>{selectedSkills[currentIndex].label}</Text>
          <Button title="Следующий" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};
