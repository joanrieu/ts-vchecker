import { VChecker, VReason } from "./VChecker";

export function vRefine<T, U extends T>(
  checker: VChecker<T>,
  refinement: (x: T) => x is U
): VChecker<U> {
  return Object.assign(
    function (x: unknown): x is U {
      return checker(x) && refinement(x);
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!checker(x)) {
          return {
            path,
            message: "invalid type",
            reasons: [],
          };
        } else if (!refinement(x)) {
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
