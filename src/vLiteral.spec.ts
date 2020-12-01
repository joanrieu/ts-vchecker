import { anything, assert, property } from "fast-check";
import { vLiteral } from "./vLiteral";

describe(vLiteral, () => {
  it("returns `true` for the given value", () =>
    assert(
      property(
        anything().filter((x) => typeof x !== "object"),
        (x) => expect(vLiteral(x as any)(x)).toBe(true)
      )
    ));

  it("returns `true` for NaN values (unlike `===` in JavaScript)", () =>
    expect(vLiteral(NaN)(NaN)).toBe(true));

  it("returns `false` for not the given value", () =>
    assert(
      property(anything(), anything(), (x, y) => {
        if (x !== y) expect(vLiteral(x as any)(y)).toBe(false);
      })
    ));
});
