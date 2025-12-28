import { atom } from "jotai";
// import { Group } from "./types/types";
import { Tables } from "./types/database.types";
type Group = Tables<"groups">;

export const selectedGroupAtom = atom<Group | null>(null);
