import { atom } from "recoil";

export const userData = atom({
  key: "userData_atom",
  default: null,
});

export const ChatCnt = atom({
  key: "ChatCnt_atom",
  default: false,
});
