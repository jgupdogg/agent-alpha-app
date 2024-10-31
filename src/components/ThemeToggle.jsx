// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <DarkModeSwitch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      size={24}
      sunColor="#FBBF24"
      moonColor="#2D3748" 
    />
  );
};

export default ThemeToggle;
