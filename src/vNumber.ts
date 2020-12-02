import { VChecker, VReason } from "./VChecker";

export function vNumber(): VChecker<number> {
  return Object.assign(
    function (x: unknown): x is number {
      return typeof x === "number";
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vNumber()(x)) {
          return {
            path,
            message: "not a number",
            reasons: [],
          };
        }
        return null;
      },
    }
  );
}
