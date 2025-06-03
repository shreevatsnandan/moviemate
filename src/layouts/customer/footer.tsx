"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Movie Mate</h2>
            <p className="text-gray-400 mt-2">Your perfect movie companion</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Movie Mate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;