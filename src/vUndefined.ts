import { VChecker } from "./VChecker";
import { vLiteral } from "./vLiteral";

export function vUndefined(): VChecker<undefined> {
  return vLiteral(undefined);
}
