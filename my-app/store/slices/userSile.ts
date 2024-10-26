import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    activeCompetencyId: "",
    activeCompetency: {},
    stepsForCompetency: [],
    competenciesForProfession: [],
    userCompetencies: [],
    profession: {},
    activeStepId: "",
    professionId: "",
    activeStep: {},
  },
  reducers: {
    setActiveCompetencyId(state, { payload }) {
      state.activeCompetencyId = payload;
    },
    setProfessionId(state, { payload }) {
      state.professionId = payload;
    },
    setActiveCompetency(state, { payload }) {
      state.activeCompetency = payload;
    },
    setUserCompetencies(state, { payload }) {
      state.userCompetencies = payload;
    },
    setProfession(state, { payload }) {
      state.profession = payload;
    },
    setActiveStepId(state, { payload }) {
      state.activeStepId = payload;
    },
    setActiveStep(state, { payload }) {
      state.activeStep = payload;
    },
    setStepsForCompetencies(state, { payload }) {
      state.stepsForCompetency = payload;
    },
    setCompeetenciesForProfession(state, { payload }) {
      state.competenciesForProfession = payload;
    },
  },
});

export const {
  setActiveCompetency,
  setActiveCompetencyId,
  setActiveStep,
  setActiveStepId,
  setProfessionId,
  setCompeetenciesForProfession,
  setStepsForCompetencies,
  setProfession,
  setUserCompetencies,
} = userSlice.actions;
export default userSlice.reducer;
