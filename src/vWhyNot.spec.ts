import { vNumber } from "./vNumber";
import { vObject } from "./vObject";
import { vUnion } from "./vUnion";

describe("whyNot", () => {
  it("returns a tree of reasons why validation failed", () => {
    expect(
      vUnion(
        vObject({
          foo: vNumber(),
        }),
        vObject({
          bar: vNumber(),
        })
      ).whyNot({
        baz: 1,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "message": "invalid subtype",
        "path": Array [],
        "reasons": Array [
          Object {
            "message": "invalid property: foo",
            "path": Array [],
            "reasons": Array [
              Object {
                "message": "not a number",
                "path": Array [
                  "foo",
                ],
                "reasons": Array [],
              },
            ],
          },
          Object {
            "message": "invalid property: bar",
            "path": Array [],
            "reasons": Array [
              Object {
                "message": "not a number",
                "path": Array [
                  "bar",
                ],
                "reasons": Array [],
              },
            ],
          },
        ],
      }
    `);
  });
});
