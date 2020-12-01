import { anything, assert, property } from "fast-check";
import { vNull } from "./vNull";

describe(vNull, () => {
  it("returns true for null", () => expect(vNull()(null)).toBe(true));

  it("returns false for non-null values", () =>
    assert(
      property(
        anything().filter((x) => x !== null),
        (x) => expect(vNull()(x)).toBe(false)
      )
    ));
});
