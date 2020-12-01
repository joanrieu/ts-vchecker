import { anything, assert, boolean, property } from "fast-check";
import { vValidate } from "./vValidate";

describe(vValidate, () => {
  it("returns `true` if and only if both checks return `true`", () =>
    assert(
      property(boolean(), boolean(), anything(), (x, y, z) =>
        expect(
          vValidate(
            (_): _ is any => x,
            () => y
          )(z)
        ).toBe(x && y)
      )
    ));
});
