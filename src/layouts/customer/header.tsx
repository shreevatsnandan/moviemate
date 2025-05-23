"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, User } from "lucide-react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <nav className="bg-transparent absolute w-full h-25 border-b border-gray-500 z-[10000]">
      <div className="container mx-auto px-20 py-3 flex h-full items-center justify-between">
        <div className="flex-shrink-0 text-xl font-bold text-gray-900">
          <Image src="/images/Logo.png" alt="Logo" width={100} height={40} />
        </div>

        <ul className="hidden md:flex space-x-8 flex-grow justify-center">
          <li>
            <a href="/" className="text-white hover:text-[#d96c2c]-600">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white hover:text-[#d96c2c]-600">
              Movies
            </a>
          </li>
          <li>
            <a href="/services" className="text-white hover:text-[#d96c2c]-600">
              News
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white hover:text-[#d96c2c]-600">
              Contact
            </a>
          </li>
        </ul>
        
        <div className="flex items-center space-x-4">
          
          {/* User Dropdown */}
          <div className="relative">
            <div
              className="text-white hover:text-gray-200"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <User className="h-6 w-6 cursor-pointer" />
            </div>

            {isUserDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login as Admin
                  </a>
                  <a
                    href="#theater-owner-login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login as Theater Owner
                  </a>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login as User
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2">
          <li>
            <a href="/" className="block text-white hover:text-[#d96c2c]">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="block text-white hover:text-[#d96c2c]">
              Movies
            </a>
          </li>
          <li>
            <a href="/services" className="block text-white hover:text-[#d96c2c]">
              News
            </a>
          </li>
          <li>
            <a href="/contact" className="block text-white hover:text-[#d96c2c]">
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;