import { atom } from "recoil";

type AuthModalType = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

const initialState: AuthModalType = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom<AuthModalType>({
  key: "authModalState",
  default: initialState,
});
