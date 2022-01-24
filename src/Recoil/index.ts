import { atom } from "recoil";
import {
  JWT_DEAFULT_VALUE,
  TOASTER_DEFAULT_VALUE,
  USER_DEFAULT_VALUE,
} from "../Constants/RecoilConstants";

export const jwtToken = atom({
  key: "jwtToken",
  default: JWT_DEAFULT_VALUE,
});

export const toasterDetails = atom({
    key: 'toasterData',
    default: TOASTER_DEFAULT_VALUE,
});

export const demo = atom({
    key: 'demo',
    default: false,
});

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: USER_DEFAULT_VALUE,
});
