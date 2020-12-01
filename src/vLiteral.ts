import { VChecker } from "./VChecker";

export function vLiteral<
  T extends boolean | number | string | null | undefined
>(literal: T): VChecker<T> {
  return function (x: unknown): x is T {
    return (
      x === literal ||
      (typeof literal === "number" &&
        typeof x === "number" &&
        isNaN(literal) &&
        isNaN(x))
    );
  };
}
