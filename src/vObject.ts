import { VChecked } from "./VChecked";
import { VChecker } from "./VChecker";

export function vObject<T>(
  schema: T
): VChecker<
  {
    [K in keyof T]: VChecked<T[K]>;
  }
> {
  return function (
    x: unknown
  ): x is {
    [K in keyof T]: VChecked<T[K]>;
  } {
    return (
      typeof x === "object" &&
      x !== null &&
      Object.keys(schema).every((k) =>
        ((schema[k as keyof typeof schema] as any) ?? (() => false))(
          x[k as keyof typeof x]
        )
      )
    );
  };
}
