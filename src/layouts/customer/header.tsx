"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, User } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <nav className="bg-transparent absolute w-full h-25 border-b border-gray-500 z-[10000]">
      <div className="container mx-auto px-20 py-3 flex h-full items-center justify-between">
        <div className="flex-shrink-0 text-xl font-bold text-gray-900">
          <Link href="/" className="text-white hover:text-[#d96c2c]-600">
            <Image src="/images/Logo.png" alt="Logo" width={100} height={40} />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-8 flex-grow justify-center">
          <li>
            <Link href="/" className="text-white hover:text-[#d96c2c] transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-[#d96c2c] transition-colors duration-200">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/services" className="text-white hover:text-[#d96c2c] transition-colors duration-200">
              News
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-[#d96c2c] transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="text-white hover:text-gray-200 transition-colors duration-200"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onClick={toggleUserDropdown}
            >
              <User className="h-6 w-6 cursor-pointer" />
            </div>
            {isUserDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <div className="py-1">
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Login as Admin
                  </Link>
                  <Link
                    href="/theater"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Login as Theater Owner
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Login as User
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2">
          <li>
            <Link href="/" className="block text-white hover:text-[#d96c2c] transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="block text-white hover:text-[#d96c2c] transition-colors duration-200">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/services" className="block text-white hover:text-[#d96c2c] transition-colors duration-200">
              News
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block text-white hover:text-[#d96c2c] transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;