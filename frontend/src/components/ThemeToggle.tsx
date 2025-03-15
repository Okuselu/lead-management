'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline-secondary"
      style={{ position: 'fixed', top: '1rem', right: '1rem' }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}