import { anything, assert, integer, property } from "fast-check";
import { vNumber } from "./vNumber";

describe(vNumber, () => {
  it("returns `true` for numbers", () =>
    assert(property(integer(), (x) => expect(vNumber()(x)).toBe(true))));

  it("returns `false` for non-numbers", () =>
    assert(
      property(
        anything().filter((x) => typeof x !== "number"),
        (x) => expect(vNumber()(x)).toBe(false)
      )
    ));
});
