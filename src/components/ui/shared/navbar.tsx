// create a navbar component
import React from 'react';
import Link from 'next/link';
import { Radio } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center justify-between">
            <Link className="flex items-center space-x-2" href='/'>
              <Radio className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-white">RadioGuessr</h1>
            </Link>
          </div>
          {/* <nav className="flex gap-4">
            <Link href="/about">
              <p className="text-white hover:text-gray-200">About</p>
            </Link>
            <Link href="/contact">
              <p className="text-white hover:text-gray-200">Contact</p>
            </Link>
            <Button variant="secondary" size="sm">Login</Button>
          </nav> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;