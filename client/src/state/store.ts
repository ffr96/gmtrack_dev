import { configureStore } from "@reduxjs/toolkit";
import { getLocalUser } from "../utils/functionUtils";

import userReducer from "./userReducer";
import trainingReducer from "./trainingReducer";
import notificationReducer from "./notificationReducer";
import { exercises } from "./services/training";

const store = configureStore({
  preloadedState: {
    user: getLocalUser(),
  },
  reducer: {
    [exercises.reducerPath]: exercises.reducer,
    user: userReducer,
    training: trainingReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
