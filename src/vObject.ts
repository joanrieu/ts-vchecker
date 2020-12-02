import { VChecker, VCheckerType, VReason } from "./VChecker";

export function vObject<T extends object>(
  schema: T
): VChecker<
  {
    [K in keyof T]: VCheckerType<T[K]>;
  }
> {
  return Object.assign(
    function (
      x: unknown
    ): x is {
      [K in keyof T]: VCheckerType<T[K]>;
    } {
      return (
        typeof x === "object" &&
        x !== null &&
        Object.keys(schema).every((k) =>
          (schema[k as keyof typeof schema] as any)(x[k as keyof typeof x])
        )
      );
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        if (!vObject({})(x)) {
          return {
            path,
            message: "not an object",
            reasons: [],
          };
        }
        for (const key in schema) {
          const whyNot = (schema[key as keyof typeof schema] as any).whyNot(
            x[key as keyof typeof x],
            [...path, key]
          );
          if (whyNot) {
            return {
              path,
              message: "invalid property: " + key,
              reasons: [whyNot],
            };
          }
        }
        return null;
      },
    }
  );
}
