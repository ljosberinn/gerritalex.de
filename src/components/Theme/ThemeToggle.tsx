import { canUseDOM } from '@/utils/constants';
import * as React from 'react';

/**
 * @TODO: Support multiple theme, not just light and dark mode.
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<string>(
    canUseDOM
      ? getComputedStyle(document.body).getPropertyValue('--theme')
      : '',
  );

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    // a binding to handle user changing their preferred scheme without reloading page
    // @ts-expect-error
    window.__themeBinding = (newTheme: 'dark' | 'default') => {
      console.log('called', newTheme);
      setTheme(newTheme);
    };
  }, []);

  return (
    <button
      className="inline-block ml-2"
      onClick={() => {
        const newTheme = theme !== 'dark' ? 'dark' : 'default';

        setTheme(newTheme);
      }}
    >
      {theme !== 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
