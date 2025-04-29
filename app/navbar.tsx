'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            MyApp
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="#home">
                            Home
                        </Link>
                        <Link href="#about">
                            About
                        </Link>
                        <Link href="/products">
                            Products
                        </Link>
                        <Link href="/categories">
                            Categoris
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-white hover:text-gray-300 focus:outline-none"
                            aria-label="Toggle menu"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <div className="space-y-2 py-2">
                            <Link href="/">
                                Home
                            </Link>
                            <Link href="/">
                                About
                            </Link>
                            <Link href="/products">
                                Products
                            </Link>
                            <Link href="/categories">
                                Categoris
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;