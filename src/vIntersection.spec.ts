import { anything, assert, boolean, property } from "fast-check";
import { vIntersection } from "./vIntersection";

describe(vIntersection, () => {
  it("returns true if and only if all checks return true", () =>
    assert(
      property(
        boolean(),
        boolean(),
        boolean(),
        boolean(),
        anything(),
        (a, b, c, d, e) =>
          expect(
            vIntersection(
              (_): _ is any => a,
              (_): _ is any => b,
              (_): _ is any => c,
              (_): _ is any => d
            )(e)
          ).toBe(a && b && c && d)
      )
    ));
});
