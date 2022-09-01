import { serverAPI } from "./services/serverAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    build.addMatcher(serverAPI.endpoints.login.matchFulfilled, (state, {}) => {
      return (state = {
        message: "Successfuly logged in",
        type: "SUCCESS",
      });
    });
  },
});

export const { raiseNotification, removeNotification } =
  notificationReducer.actions;

export default notificationReducer.reducer;
