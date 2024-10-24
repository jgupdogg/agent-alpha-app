// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white px-4 py-2 text-center">
      &copy; {new Date().getFullYear()} Agent Alpha. All rights reserved.
    </footer>
  );
};

export default Footer;
