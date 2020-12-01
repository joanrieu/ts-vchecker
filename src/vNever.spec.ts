import { anything, assert, property } from "fast-check";
import { vNever } from "./vNever";

describe(vNever, () => {
  it("always returns `false`", () =>
    assert(property(anything(), (x) => expect(vNever()(x)).toBe(false))));
});
