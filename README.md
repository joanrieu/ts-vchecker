# TS VChecker

_Minimal validation library with TypeScript type inference_

```
npm install ts-vchecker
```

## Features

This library lets you build a standard [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) declaratively.

The resulting type is inferred by TypeScript automatically, and you can give it a name if you want to reuse it in your code.

The following declarations are available (see documentation below):

| Type                         | Declaration          | Notes                                                         |
| ---------------------------- | -------------------- | ------------------------------------------------------------- |
| **_Values:_**                |                      |                                                               |
| `boolean`                    | `vBoolean()`         |                                                               |
| `number`                     | `vNumber()`          |                                                               |
| `string`                     | `vString()`          |                                                               |
| `null`                       | `vNull()`            |                                                               |
| `undefined`                  | `vUndefined()`       |                                                               |
| Literal (`"foo" as const`)   | `vLiteral(...)`      | Treats all `NaN` values as equal, unlike JavaScript.          |
| `any`                        | `vAny()`             | Always matches.                                               |
| `never`                      | `vNever()`           | Never matches.                                                |
| **_Structures:_**            |                      |                                                               |
| `object`                     | `vObject(...)`       | A schema must be provided. Extra properties are ignored.      |
| `array`                      | `vArray(...)`        | A child type can be provided.                                 |
| **_Combinations:_**          |                      |                                                               |
| Union (`A \| B \| ...`)      | `vUnion(...)`        | A value must match one of the schemas.                        |
| Intersection (`A & B & ...`) | `vIntersection(...)` | A value must match all of the schemas.                        |
| **_Runtime logic:_**         |                      |                                                               |
| `if` with type guard         | `vRefine(...)`       | Takes a user-defined type guard to narrow down the type.      |
| `if` without type guard      | `vValidate(...)`     | Takes a user-defined validation function returning a boolean. |

## Example

Declare both your type and the validation function at once:

```ts
export type MovedEvent = VCheckerType<typeof isMovedEvent>;
export const isMovedEvent = vObject({
  type: vLiteral("moved"),
  data: vUnion(
    vObject({
      parentId: vValidate(vString(), isUUID),
      index: vNumber(),
    }),
    vObject({
      parentId: vNull(),
    })
  ),
});
```

Use the validation function in your code like a standard type guard:

```ts
const event = req.body;

if (!isMovedEvent(event)) {
  return res.status(400).end();
}

res.status(200).send("Moving node to " + event.data.parentId);
```

The following types are inferred automatically by TypeScript.

```ts
// type MovedEvent = {
//   type: "moved";
//   data:
//     | {
//         parentId: string;
//         index: number;
//       }
//     | {
//         parentId: null;
//       };
// };
// const isMovedEvent: (x: unknown) => x is MovedEvent;
```

## Documentation

<!-- BEGIN DOC -->

### Any

```ts
function vAny(): VChecker<any>
```

- This checker returns `true` for any value

### Array

```ts
function vArray(checker: VChecker<T> = vAny()): VChecker<T[]>
```

- This checker returns `true` for empty arrays
- This checker returns `true` for arrays of correctly typed values
- This checker returns `false` for non-arrays
- This checker returns `false` for arrays of incorrectly typed values

### Boolean

```ts
function vBoolean(): VChecker<boolean>
```

- This checker returns `true` for booleans
- This checker returns `false` for non-booleans

### Intersection

```ts
function vIntersection(
  schema1: VChecker<T1>,
  schema2: VChecker<T2>,
  schema3: VChecker<T3> = vAny(),
  schema4: VChecker<T4> = vAny(),
  schema5: VChecker<T5> = vAny(),
  schema6: VChecker<T6> = vAny(),
  schema7: VChecker<T7> = vAny(),
  schema8: VChecker<T8> = vAny(),
  schema9: VChecker<T9> = vAny(),
  schema10: VChecker<T10> = vAny()
): VChecker<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>
```

- This checker returns `true` if and only if all checks return `true`

### Literal

```ts
function vLiteral(literal: T): VChecker<T>
```

- This checker returns `true` for the given value
- This checker returns `true` for NaN values (unlike `===` in JavaScript)
- This checker returns `false` for not the given value

### Never

```ts
function vNever(): VChecker<never>
```

- This checker always returns `false`

### Null

```ts
function vNull(): VChecker<null>
```

- This checker returns `true` for `null`
- This checker returns `false` for non-`null` values

### Number

```ts
function vNumber(): VChecker<number>
```

- This checker returns `true` for numbers
- This checker returns `false` for non-numbers

### Object

```ts
function vObject(
  schema: T
): VChecker<
  {
    [K in keyof T]: VCheckerType<T[K]>;
  }
>
```

- This checker returns `true` if and only if all values in schema match
- This checker returns `true` for an array if the array matches the schema (weird JavaScript quirk)
- This checker returns `true` for objects with extra properties
- This checker returns `false` for non-objects

### Refine

```ts
function vRefine(
  checker: VChecker<T>,
  refinement: (x: T) => x is U
): VChecker<U>
```

- This checker returns `true` if and only if both checks return `true`

### String

```ts
function vString(): VChecker<string>
```

- This checker returns `true` for strings
- This checker returns `false` for non-strings

### Undefined

```ts
function vUndefined(): VChecker<undefined>
```

- This checker returns `true` for `undefined`
- This checker returns `false` for non-`undefined` values

### Union

```ts
function vUnion(
  schema1: VChecker<T1>,
  schema2: VChecker<T2>,
  schema3: VChecker<T3> = vNever(),
  schema4: VChecker<T4> = vNever(),
  schema5: VChecker<T5> = vNever(),
  schema6: VChecker<T6> = vNever(),
  schema7: VChecker<T7> = vNever(),
  schema8: VChecker<T8> = vNever(),
  schema9: VChecker<T9> = vNever(),
  schema10: VChecker<T10> = vNever()
): VChecker<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>
```

- This checker returns `true` for values of one of the given types
- This checker returns `false` for values not of one of the given types

### Validate

```ts
function vValidate(
  checker: VChecker<T>,
  validator: (x: T) => boolean
): VChecker<T>
```

- This checker returns `true` if and only if both checks return `true`

<!-- END DOC -->
