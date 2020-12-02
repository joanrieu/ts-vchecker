import { VChecker, VReason } from "./VChecker";

export function vString(): VChecker<string> {
  return Object.assign(
    function (x: unknown): x is string {
      return typeof x === "string";
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vString()(x)) {
          return {
            path,
            message: "not a string",
            reasons: [],
          };
        } else {
          return null;
        }
      },
    }
  );
}
