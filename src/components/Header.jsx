// src/components/Header.jsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full bg-primary text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-xl font-bold">Agent Alpha</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
