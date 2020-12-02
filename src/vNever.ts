import { VChecker, VReason } from "./VChecker";

function vNeverImpl(_x: unknown): _x is never {
  return false;
}

export function vNever(): VChecker<never> {
  return Object.assign(vNeverImpl, {
    whyNot(x: unknown, path: string[] = []): VReason | null {
      return {
        path,
        message: "unexpected value",
        reasons: [],
      };
    },
  });
}
