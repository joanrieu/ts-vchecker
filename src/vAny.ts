import { VChecker, VReason } from "./VChecker";

export function vAny(): VChecker<any> {
  return Object.assign(
    function (_x: unknown): _x is any {
      return true;
    },
    {
      whyNot(_x: unknown, _path: string[] = []): VReason | null {
        return null;
      },
    }
  );
}
