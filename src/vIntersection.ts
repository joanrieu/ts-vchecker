import { vAny } from "./vAny";
import { VChecker, VReason } from "./VChecker";

export function vIntersection<
  T1,
  T2,
  T3 = unknown,
  T4 = unknown,
  T5 = unknown,
  T6 = unknown,
  T7 = unknown,
  T8 = unknown,
  T9 = unknown,
  T10 = unknown
>(
  schema1: VChecker<T1>,
  schema2: VChecker<T2>,
  schema3: VChecker<T3> = vAny(),
  schema4: VChecker<T4> = vAny(),
  schema5: VChecker<T5> = vAny(),
  schema6: VChecker<T6> = vAny(),
  schema7: VChecker<T7> = vAny(),
  schema8: VChecker<T8> = vAny(),
  schema9: VChecker<T9> = vAny(),
  schema10: VChecker<T10> = vAny()
): VChecker<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10> {
  return Object.assign(
    function (
      x: unknown
    ): x is T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10 {
      return (
        schema1(x) &&
        schema2(x) &&
        schema3(x) &&
        schema4(x) &&
        schema5(x) &&
        schema6(x) &&
        schema7(x) &&
        schema8(x) &&
        schema9(x) &&
        schema10(x)
      );
    },
    {
      whyNot(x: unknown, path: string[] = []): VReason | null {
        const reasons = [
          schema1,
          schema2,
          schema3,
          schema4,
          schema5,
          schema6,
          schema7,
          schema8,
          schema9,
          schema10,
        ]
          .map((schema) => schema.whyNot(x, path))
          .filter((reason): reason is VReason => Boolean(reason));
        if (!reasons.length) return null;
        return {
          path,
          message: "invalid subtype",
          reasons,
        };
      },
    }
  );
}
