import { VChecker } from "./VChecker";

export function vBoolean(): VChecker<boolean> {
  return function (x: unknown): x is boolean {
    return typeof x === "boolean";
  };
}
