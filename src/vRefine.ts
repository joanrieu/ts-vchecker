import { VChecker } from "./VChecker";

export function vRefine<T, U extends T>(
  checker: VChecker<T>,
  refinement: (x: T) => x is U
): VChecker<U> {
  return function (x: unknown): x is U {
    return checker(x) && refinement(x);
  };
}
