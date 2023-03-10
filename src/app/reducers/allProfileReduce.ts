import { PayloadAction } from "@reduxjs/toolkit";
import { Iprofile } from "../../componets/Profile/Profile";

export const ADD_TO_ALLPROFILE = "ADD_TO_ALLPROFILE";
export const ADD_TO_MYPROFILE = "ADD_TO_MYPROFILE";
export const ADD_TO_GENERALPROFILE = "ADD_TO_GENERALPROFILE";

export const HANDLE_LOAD_MYPROFILE = "HANDLE_LOAD_MYPROFILE";

export const HANDLE_LOAD_ALLPROFILE = "HANDLE_LOAD_ALLPROFILE";

export interface AllProfile {
  allProfile: Iprofile[];
  myProfile: Iprofile | null;
  generalProfile: Iprofile | null;
  loadingMyProfile: boolean;
  loadingAllProfile: boolean;
}

const initialState: AllProfile = {
  allProfile: [] as Iprofile[],
  myProfile: null,
  generalProfile: null,
  loadingMyProfile: false,
  loadingAllProfile: false,
};

export const allProfileReduce = (
  state: AllProfile = initialState,
  action: PayloadAction<Iprofile[] | Iprofile>
) => {
  switch (action.type) {
    case ADD_TO_ALLPROFILE:
      return {
        ...state,
        allProfile: action.payload,
      };
    case ADD_TO_MYPROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };
    case ADD_TO_GENERALPROFILE:
      return {
        ...state,
        generalProfile: action.payload,
      };
    case HANDLE_LOAD_MYPROFILE:
      return {
        ...state,
        loadingMyProfile: action.payload,
      };
    case HANDLE_LOAD_ALLPROFILE:
      return {
        ...state,
        loadingAllProfile: action.payload,
      };
    default:
      return state;
  }
};
