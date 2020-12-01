import { anything, assert, boolean, property } from "fast-check";
import { vBoolean } from "./vBoolean";

describe(vBoolean, () => {
  it("returns `true` for booleans", () =>
    assert(property(boolean(), (x) => expect(vBoolean()(x)).toBe(true))));

  it("returns `false` for non-booleans", () =>
    assert(
      property(
        anything().filter((x) => typeof x !== "boolean"),
        (x) => expect(vBoolean()(x)).toBe(false)
      )
    ));
});
