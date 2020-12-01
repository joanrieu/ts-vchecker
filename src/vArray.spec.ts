import { anything, array, assert, integer, property, string } from "fast-check";
import { vArray } from "./vArray";
import { vNumber } from "./vNumber";

describe(vArray, () => {
  it("returns `true` for empty arrays", () => expect(vArray()([])).toBe(true));

  it("returns `true` for arrays of correctly typed values", () =>
    assert(
      property(array(integer()), (x) => expect(vArray(vNumber())(x)).toBe(true))
    ));

  it("returns `false` for non-arrays", () =>
    assert(property(string(), (x) => expect(vArray()(x)).toBe(false))));

  it("returns `false` for arrays of incorrectly typed values", () =>
    assert(
      property(
        array(anything()).filter((x) => x.some((x) => typeof x !== "number")),
        (x) => expect(vArray(vNumber())(x)).toBe(false)
      )
    ));
});
