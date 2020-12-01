import { VChecker } from "./VChecker";

export function vString(): VChecker<string> {
  return function (x: unknown): x is string {
    return typeof x === "string";
  };
}
