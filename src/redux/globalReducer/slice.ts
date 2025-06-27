import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../enums/types";

interface initialStateType {
  user: IUser | null;
}

const initialState: initialStateType = {
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, clearUser } = globalSlice.actions;
