import { VChecker } from "./VChecker";

export function vNumber(): VChecker<number> {
  return function (x: unknown): x is number {
    return typeof x === "number";
  };
}
