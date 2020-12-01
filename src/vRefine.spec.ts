import { anything, assert, boolean, property } from "fast-check";
import { vRefine } from "./vRefine";

describe(vRefine, () => {
  it("returns `true` if and only if both checks return `true`", () =>
    assert(
      property(boolean(), boolean(), anything(), (x, y, z) =>
        expect(
          vRefine(
            (_): _ is any => x,
            (_): _ is any => y
          )(z)
        ).toBe(x && y)
      )
    ));
});
