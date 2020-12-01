import { anything, assert, property, string } from "fast-check";
import { vString } from "./vString";

describe(vString, () => {
  it("returns `true` for strings", () =>
    assert(property(string(), (x) => expect(vString()(x)).toBe(true))));

  it("returns `false` for non-strings", () =>
    assert(
      property(
        anything().filter((x) => typeof x !== "string"),
        (x) => expect(vString()(x)).toBe(false)
      )
    ));
});
