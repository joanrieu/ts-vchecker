import { vAny } from "./vAny";
import { VChecker, VReason } from "./VChecker";

export function vArray<T = any>(checker: VChecker<T> = vAny()): VChecker<T[]> {
  return Object.assign(
    function (x: unknown): x is T[] {
      return Array.isArray(x) && x.every(checker);
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vArray()(x)) {
          return {
            path,
            message: "not an array",
            reasons: [],
          };
        }
        for (const key in x) {
          const whyNot = checker.whyNot(x[key], [...path, key]);
          if (whyNot) {
            return {
              path,
              message: "invalid array item: " + key,
              reasons: [whyNot],
            };
          }
        }
        return null;
      },
    }
  );
}
