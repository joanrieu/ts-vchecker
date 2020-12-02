import {
  anything,
  array,
  assert,
  boolean,
  object,
  property,
  string,
  tuple,
} from "fast-check";
import { vObject } from "./vObject";

describe(vObject, () => {
  it("returns `true` if and only if the specified properties are correctly typed", () =>
    assert(
      property(
        tuple(string(), boolean(), string(), boolean()).filter(
          ([k1, _v1, k2, _v2]) => k1 !== k2
        ),
        object(),
        ([k1, v1, k2, v2], obj) =>
          expect(vObject({ [k1]: () => v1, [k2]: () => v2 })(obj)).toBe(
            v1 && v2
          )
      )
    ));

  it("returns `true` for an array if the array matches the schema (JavaScript quirk)", () =>
    assert(
      property(array(anything()), (x) => expect(vObject({})(x)).toBe(true))
    ));

  it("returns `true` for objects with extra properties", () =>
    assert(property(object(), (x) => expect(vObject({})(x)).toBe(true))));

  it("returns `false` for non-objects", () =>
    assert(
      property(
        anything().filter((x) => typeof x !== "object"),
        (x) => expect(vObject({})(x)).toBe(false)
      )
    ));
});
