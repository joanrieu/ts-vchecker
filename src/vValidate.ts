import { VChecker } from "./VChecker";

export function vValidate<T>(
  checker: VChecker<T>,
  validator: (x: T) => boolean
): VChecker<T> {
  return function (x: unknown): x is T {
    return checker(x) && validator(x);
  };
}
