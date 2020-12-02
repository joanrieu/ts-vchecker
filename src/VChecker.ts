export type VChecker<T> = ((x: unknown) => x is T) & VCheckerExtra;

export type VCheckerType<T> = T extends VChecker<infer U> ? U : unknown;

export type VCheckerExtra = {
  whyNot(x: unknown, path?: string[]): VReason | null;
};

export type VReason = {
  path: string[];
  message: string;
  reasons: VReason[];
};
