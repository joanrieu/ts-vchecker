import { anything, assert, property } from "fast-check";
import { vUndefined } from "./vUndefined";

describe(vUndefined, () => {
  it("returns `true` for `undefined`", () =>
    expect(vUndefined()(undefined)).toBe(true));

  it("returns `false` for non-`undefined` values", () =>
    assert(
      property(
        anything().filter((x) => x !== undefined),
        (x) => expect(vUndefined()(x)).toBe(false)
      )
    ));
});
