import { IS_BROWSER, SUPPORTS_LOCAL_STORAGE } from '@/utils/constants';
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'default';

/**
 * @TODO: Support multiple theme, not just light and dark mode.
 */
export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>(
    IS_BROWSER
      ? (getComputedStyle(document.body).getPropertyValue('--theme') as Theme)
      : 'default',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    if (SUPPORTS_LOCAL_STORAGE) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    // a binding to handle user changing their preferred scheme without reloading page
    // @ts-expect-error exists, but needs to be refactored
    window.__themeBinding = (newTheme: Theme) => {
      setTheme(newTheme);
    };
  }, []);

  function handleThemeChange() {
    setTheme(theme === 'dark' ? 'default' : 'dark');
  }

  return (
    <button
      className="inline-block ml-2"
      type="button"
      onClick={handleThemeChange}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
