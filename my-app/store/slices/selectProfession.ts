import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
  name: "selectProfession",
  initialState: {
    selectedSkillsIds: [],
    salary: 0,
    potencialProfessions: [],
    selectedProfessionId: "",
    selectedProfession: {},
    competencies: [],
  },
  reducers: {
    setSelectedSkillsIds(state, { payload }) {
      state.selectedSkillsIds = payload;
    },
    setSalary(state, { payload }) {
      state.salary = payload;
    },
    setPotencialProfessions(state, { payload }) {
      state.potencialProfessions = payload;
    },
    setSelectedProfessionId(state, { payload }) {
      state.selectedProfessionId = payload;
    },
    setSelectedProfession(state, { payload }) {
      state.selectedProfession = payload;
    },
    setComepetencies(state, { payload }) {
      state.competencies = payload;
    },
  },
});

export const {
  setPotencialProfessions,
  setSalary,
  setSelectedProfession,
  setSelectedProfessionId,
  setSelectedSkillsIds,
  setComepetencies,
} = selectedSlice.actions;
export default selectedSlice.reducer;
