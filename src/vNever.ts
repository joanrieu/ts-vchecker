import { VChecker } from "./VChecker";

export function vNever(): VChecker<never> {
  return function (_x: unknown): _x is never {
    return false;
  };
}
