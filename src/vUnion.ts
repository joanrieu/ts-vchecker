import { VChecker } from "./VChecker";
import { vNever } from "./vNever";

export function vUnion<
  T1,
  T2,
  T3 = never,
  T4 = never,
  T5 = never,
  T6 = never,
  T7 = never,
  T8 = never,
  T9 = never,
  T10 = never
>(
  schema1: VChecker<T1>,
  schema2: VChecker<T2>,
  schema3: VChecker<T3> = vNever(),
  schema4: VChecker<T4> = vNever(),
  schema5: VChecker<T5> = vNever(),
  schema6: VChecker<T6> = vNever(),
  schema7: VChecker<T7> = vNever(),
  schema8: VChecker<T8> = vNever(),
  schema9: VChecker<T9> = vNever(),
  schema10: VChecker<T10> = vNever()
): VChecker<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10> {
  return function (
    x: unknown
  ): x is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 {
    return (
      schema1(x) ||
      schema2(x) ||
      schema3(x) ||
      schema4(x) ||
      schema5(x) ||
      schema6(x) ||
      schema7(x) ||
      schema8(x) ||
      schema9(x) ||
      schema10(x)
    );
  };
}
