export type VChecker<T> = (x: unknown) => x is T;

export type VCheckerType<T> = T extends VChecker<infer U> ? U : unknown;
