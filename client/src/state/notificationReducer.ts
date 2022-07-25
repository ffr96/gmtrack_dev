import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationReceived = 'ERROR' | 'SUCCESS' | 'WARNING';
type NotificationType = {
  message: string;
  type: NotificationReceived;
} | null;

const notificationReducer = createSlice({
  name: 'notification',
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
});

export const { raiseNotification, removeNotification } =
  notificationReducer.actions;

export default notificationReducer.reducer;
