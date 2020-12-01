import { VChecker } from "./VChecker";

export function vRefine<T>(
  checker: VChecker<T>,
  refinement: (x: T) => boolean
): VChecker<T> {
  return function (x: unknown): x is T {
    return checker(x) && refinement(x);
  };
}
