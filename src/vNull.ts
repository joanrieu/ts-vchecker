import { VChecker } from "./VChecker";
import { vLiteral } from "./vLiteral";

export function vNull(): VChecker<null> {
  return vLiteral(null);
}
