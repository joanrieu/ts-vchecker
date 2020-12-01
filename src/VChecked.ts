import { VChecker } from "./VChecker";

export type VChecked<T> = T extends VChecker<infer U> ? U : unknown;
