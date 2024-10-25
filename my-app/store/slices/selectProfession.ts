import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
  name: "selectProfession",
  initialState: {
    selectedSkillsIds: [],
    salary: 0,
    potencialProfessions: [],
    moreInfoProfessionId: "",
    moreInfoProfession: {},
    selectedProfessionId: "",
    selectedProfession: {},
    competencies: [],
    selectedSkills: [],
  },
  reducers: {
    setSelectedSkillsIds(state, { payload }) {
      state.selectedSkillsIds = payload;
    },
    setSelectedSkills(state, { payload }) {
      state.selectedSkills = payload;
      state.selectedSkillsIds = payload.map((item) => item.value);
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
    setMoreInfoProfessionId(state, { payload }) {
      state.moreInfoProfessionId = payload;
    },
    setMoreInfoProfession(state, { payload }) {
      state.moreInfoProfession = payload;
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
  setMoreInfoProfession,
  setMoreInfoProfessionId,
  setSelectedSkills,
} = selectedSlice.actions;
export default selectedSlice.reducer;
