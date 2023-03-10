import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Ishow {
  show: boolean;
}
const initialState: Ishow = {
  show: false,
};
//dispatch(toofleM())
const upgradeModSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    toogleM(state) {
      state.show = !state.show;
    },
    hideM(state) {
      state.show = false;
    },
    showM(state) {
      state.show = true;
    },
  },
});
export const { toogleM, hideM, showM } = upgradeModSlice.actions;
export default upgradeModSlice.reducer;
