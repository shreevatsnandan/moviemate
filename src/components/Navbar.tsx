"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from 'lucide-react';
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
  <nav className="bg-transparent absolute w-full h-25 border-b border-gray-500 z-[10000]">

      <div className="container mx-auto px-20 py-3 flex h-full  items-center justify-between">
        <div className="flex-shrink-0 text-xl font-bold text-gray-900">
          <Image src="/images/Logo.png" alt="Logo" width={100} height={40} />
        </div>

        <ul className="hidden md:flex space-x-8 flex-grow justify-center">
          <li>
            <a href="/" className="text-white hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white hover:text-blue-600">
              Movies
            </a>
          </li>
          <li>
            <a href="/services" className="text-white hover:text-blue-600">
              News
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
         <Search className="text-white" />
          <User className="text-white" />
        </div>
      </div>
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2">
          <li>
            <a href="/" className="block text-white hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="block text-white hover:text-blue-600">
              Movies
            </a>
          </li>
          <li>
            <a href="/services" className="block text-white hover:text-blue-600">
              News
            </a>
          </li>
          <li>
            <a href="/contact" className="block text-white hover:text-blue-600">
              Contact
            </a>
          </li>
          
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
