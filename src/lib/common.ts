export const isNil = <T>(input: T | undefined | null): input is undefined | null =>
  input === undefined || input === null

export const rejectNil = <T>(array: (T | null | undefined)[]): T[] =>
  array.filter((item): item is T => !isNil(item))
