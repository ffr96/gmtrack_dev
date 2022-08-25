import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainingLog, Exercises } from "types";
import { RootState } from "./store";

type InitialTrainingLog = TrainingLog[] | null;

const trainingReducer = createSlice({
  name: "trainingLog",
  initialState: null as InitialTrainingLog,
  reducers: {
    setTrainingLog: (state, action: PayloadAction<TrainingLog[]>) => {
      return (state = action.payload);
    },
    addTrainingLog: (state, action: PayloadAction<TrainingLog>) => {
      if (state) {
        state.push(action.payload);
        return state;
      } else {
        return (state = [action.payload]);
      }
    },
    removeTrainingLog: (state, action: PayloadAction<string>) => {
      if (state) {
        return (state = state.filter((log) => log.id !== action.payload));
      }
    },
    addExerciseToLog: (
      state,
      action: PayloadAction<{ exercises: Exercises; id: string }>
    ) => {
      if (state) {
        state.map((log) => {
          if (log.id !== action.payload.id) {
            return log;
          }
          return log.exercises.push(action.payload.exercises);
        });
      }
    },
  },
});

export const {
  setTrainingLog,
  addTrainingLog,
  removeTrainingLog,
  addExerciseToLog,
} = trainingReducer.actions;

export const selectRecentLogs = (state: RootState, logsToRetrieve: number) => {
  if (state.training) {
    return state.training.slice(-logsToRetrieve).reverse();
  } else return null;
};

export default trainingReducer.reducer;
