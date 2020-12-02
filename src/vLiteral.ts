import { VChecker, VReason } from "./VChecker";

export function vLiteral<
  T extends boolean | number | string | null | undefined
>(literal: T): VChecker<T> {
  return Object.assign(
    function (x: unknown): x is T {
      return (
        x === literal ||
        (typeof literal === "number" &&
          typeof x === "number" &&
          isNaN(literal) &&
          isNaN(x))
      );
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vLiteral(literal)(x)) {
          return {
            path,
            message: "unexpected value",
            reasons: [],
          };
        } else {
          return null;
        }
      },
    }
  );
}
