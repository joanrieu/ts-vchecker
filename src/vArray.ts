import { vAny } from "./vAny";
import { VChecker } from "./VChecker";

export function vArray<T = any>(checker: VChecker<T> = vAny()): VChecker<T[]> {
  return function (x: unknown): x is T[] {
    return Array.isArray(x) && x.every(checker);
  };
}
