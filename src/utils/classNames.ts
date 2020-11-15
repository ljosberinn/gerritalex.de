export const classNames = (
  ...classes: (string | boolean | undefined)[]
): string => classes.filter(Boolean).join(' ');
