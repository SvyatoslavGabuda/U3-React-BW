import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ichat {
  id: string;
}
const initialState: Ichat = {
  id: "",
};

const chatIdSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    joined(state, actions: PayloadAction<string>) {
      state.id = actions.payload;
    },
    leveRoom(state) {
      state.id = "";
    },
  },
});
export const { joined, leveRoom } = chatIdSlice.actions;
export default chatIdSlice.reducer;
