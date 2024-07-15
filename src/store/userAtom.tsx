// store/userAtom.ts
import { atom } from "jotai";

const storedUser = JSON.parse(localStorage.getItem("user") || "null");

export const userAtom = atom(storedUser);
