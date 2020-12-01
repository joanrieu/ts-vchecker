import { VChecker } from "./VChecker";

export function vLiteral<T extends string | number | null | undefined>(
  literal: T
): VChecker<T> {
  return function (x: unknown): x is T {
    return x === literal;
  };
}
