import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

type NavLink = {
    label: string;
    path: string;
};

type Props = {
    links?: NavLink[];
};

const defaultLinks: NavLink[] = [
    { label: 'Builder', path: '/' },
    { label: 'Tester', path: '/renderer' },
];

const Navbar: React.FC<Props> = ({ links = defaultLinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(prev => !prev)}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <IoMdClose className="block h-6 w-6" />
                            ) : (
                                <FaBars className="block h-6 w-6" />
                            )}
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex justify-start items-end gap-1 flex-wrap">
                            <h1 className="text-2xl font-bold text-white">
                                Form Fate
                            </h1>
                            <span className="text-sm font-medium text-gray-300">
                                Builder Tool
                            </span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {links.map((link) => (
                                    <Link key={link.path} to={link.path} className={clsx(
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                        {
                                            'bg-gray-900 text-white': location.pathname === link.path,
                                            'text-gray-300 hover:bg-gray-700 hover:text-white': location.pathname !== link.path,
                                        }
                                    )}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                isOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {links.map((link) => (
                                <Link key={link.path} to={link.path} className={clsx(
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                    {
                                        'bg-gray-900 text-white': location.pathname === link.path,
                                        'text-gray-300 hover:bg-gray-700 hover:text-white': location.pathname !== link.path,
                                    },
                                )}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
