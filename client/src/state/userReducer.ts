import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { RootState } from "./store";

type InitialUser = User | null;

const userReducer = createSlice({
  name: "user",
  initialState: null as InitialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      if (action.payload.id && action.payload.token && action.payload.username)
        return (state = action.payload);
      else return null;
    },
    removeUser: (state) => {
      state = null;
      return state;
    },
  },
});

export const { setUser, removeUser } = userReducer.actions;
export const selectUser = (state: RootState) => state.user;
export default userReducer.reducer;
