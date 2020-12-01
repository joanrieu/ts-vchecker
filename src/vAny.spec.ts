import { anything, assert, property } from "fast-check";
import { vAny } from "./vAny";

describe(vAny, () => {
  it("returns `true` for any value", () =>
    assert(property(anything(), (x) => expect(vAny()(x)).toBe(true))));
});
