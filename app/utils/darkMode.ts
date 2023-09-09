export const isDarkMode = ():boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
