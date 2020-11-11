export const IS_BROWSER = typeof window !== 'undefined';

export const isProd = process.env.NODE_ENV === 'production';

export const SUPPORTS_LOCAL_STORAGE = (() => {
  if (!IS_BROWSER) {
    return false;
  }

  try {
    if (IS_BROWSER) {
      const key = '__ls_test_key__';

      localStorage.setItem(key, key);
      localStorage.getItem(key);
      localStorage.removeItem(key);

      return true;
    }
  } catch {
    return false;
  }
})();
