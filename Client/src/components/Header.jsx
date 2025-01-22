import React from 'react';
import { Heading } from '@radix-ui/themes';
import { GrGrid } from 'react-icons/gr';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

const Header = ({ theme, toggleTheme }) => (
  <div className="flex items-center justify-between max-w-xl mb-2">
    <Heading>
      <GrGrid className="inline" /> Real-Time Grid Game
    </Heading>
    <button onClick={toggleTheme} className="p-2" aria-label="Toggle theme">
      {theme === 'dark' ? <SunIcon className="ml-4" /> : <MoonIcon className="ml-4" />}
    </button>
  </div>
);

export default Header;
