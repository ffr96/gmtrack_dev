import { serverAPI } from "./services/serverAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const successMessage = (msg: string): NotificationType => ({
  type: "SUCCESS",
  message: `Success adding ${msg}!`,
});
const errorMessage = (msg: string): NotificationType => ({
  type: "ERROR",
  message: `Success adding ${msg}!`,
});

type NotificationReceived = "ERROR" | "SUCCESS" | "WARNING";
type NotificationType = {
  message: string;
  type: NotificationReceived;
} | null;

const notificationReducer = createSlice({
  name: "notification",
  initialState: null as NotificationType,
  reducers: {
    raiseNotification: (
      state,
      action: PayloadAction<{ message: string; type: NotificationReceived }>
    ) => {
      state = {
        message: action.payload.message,
        type: action.payload.type,
      };
      return state;
    },
    removeNotification: (state) => {
      state = null;
      return state;
    },
  },
  extraReducers: (build) => {
    build.addMatcher(serverAPI.endpoints.login.matchFulfilled, () => {
      return {
        message: "Successfuly logged in",
        type: "SUCCESS",
      };
    });
    build.addMatcher(serverAPI.endpoints.login.matchRejected, () => {
      return {
        message: "Invalid username or password",
        type: "ERROR",
      };
    });
    build.addMatcher(serverAPI.endpoints.submitExercise.matchFulfilled, () => {
      return successMessage("exercises");
    });
    build.addMatcher(serverAPI.endpoints.submitExercise.matchRejected, () => {
      return errorMessage("exercises");
    });
    build.addMatcher(serverAPI.endpoints.submitWeight.matchFulfilled, () => {
      return successMessage("weight");
    });
    build.addMatcher(serverAPI.endpoints.submitExercise.matchRejected, () => {
      return errorMessage("weight");
    });
    build.addMatcher(serverAPI.endpoints.submitLogs.matchFulfilled, () => {
      return successMessage("training");
    });
    build.addMatcher(serverAPI.endpoints.submitLogs.matchRejected, () => {
      return errorMessage("training");
    });
  },
});

export const { raiseNotification, removeNotification } =
  notificationReducer.actions;

export default notificationReducer.reducer;
