import { anything, assert, property } from "fast-check";
import { vUnion } from "./vUnion";
import { vNumber } from "./vNumber";
import { vString } from "./vString";

describe(vUnion, () => {
  it("returns `true` for values of one of the given types", () =>
    assert(
      property(
        anything().filter(
          (x) => typeof x === "string" || typeof x === "number"
        ),
        (x) => expect(vUnion(vString(), vNumber())(x)).toBe(true)
      )
    ));

  it("returns `false` for values not of one of the given types", () =>
    assert(
      property(
        anything().filter(
          (x) => typeof x !== "string" && typeof x !== "number"
        ),
        (x) => expect(vUnion(vString(), vNumber())(x)).toBe(false)
      )
    ));
});
