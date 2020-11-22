export const cs = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
