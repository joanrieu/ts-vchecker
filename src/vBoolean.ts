import { VChecker, VReason } from "./VChecker";

export function vBoolean(): VChecker<boolean> {
  return Object.assign(
    function (x: unknown): x is boolean {
      return typeof x === "boolean";
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vBoolean()(x)) {
          return {
            path,
            message: "not a boolean",
            reasons: [],
          };
        } else {
          return null;
        }
      },
    }
  );
}
