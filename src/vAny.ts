import { VChecker } from "./VChecker";

export function vAny(): VChecker<any> {
  return function (_x: unknown): _x is any {
    return true;
  };
}
