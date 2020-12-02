import { VChecker, VReason } from "./VChecker";

export function vValidate<T>(
  checker: VChecker<T>,
  validator: (x: T) => boolean
): VChecker<T> {
  return Object.assign(
    function (x: unknown): x is T {
      return checker(x) && validator(x);
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!checker(x)) {
          return {
            path,
            message: "invalid type",
            reasons: [],
          };
        } else if (!validator(x)) {
          return {
            path,
            message: "invalid subtype",
            reasons: [],
          };
        } else {
          return null;
        }
      },
    }
  );
}
