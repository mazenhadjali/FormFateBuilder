import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { FaBars } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import useAuthStore from '../stores/userStore';
import Loader from './Loader';

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

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loading = useAuthStore((state) => state.loading);
    const user = useAuthStore((state) => state.user);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
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

                    <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                        <div className="flex justify-start items-end gap-1 flex-wrap">
                            <img
                                src="/icon.png"
                                alt="Logo"
                                className='h-8 w-8'
                                style={{
                                    filter: 'grayscale(100%) brightness(0) invert(1)',
                                }}
                            />
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
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={clsx(
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                            {
                                                'bg-gray-900 text-white': location.pathname === link.path,
                                                'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                    location.pathname !== link.path,
                                            }
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            {loading ? (
                                <Loader />
                            ) : isAuthenticated && user ? (
                                <Link
                                    to="/account"
                                    className={clsx(
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                        {
                                            'bg-gray-900 text-white':
                                                location.pathname === '/account',
                                            'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                location.pathname !== '/account',
                                        }
                                    )}
                                >
                                    Profile
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className={clsx(
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                            {
                                                'bg-gray-900 text-white':
                                                    location.pathname === '/login',
                                                'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                    location.pathname !== '/login',
                                            }
                                        )}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className={clsx(
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                            {
                                                'bg-gray-900 text-white':
                                                    location.pathname === '/signup',
                                                'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                    location.pathname !== '/signup',
                                            }
                                        )}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={clsx(
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                    {
                                        'bg-gray-900 text-white':
                                            location.pathname === link.path,
                                        'text-gray-300 hover:bg-gray-700 hover:text-white':
                                            location.pathname !== link.path,
                                    }
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 mt-2 space-y-1 px-2 pt-2 pb-3">
                        {loading ? (
                            <Loader />
                        ) : isAuthenticated && user ? (
                            <Link
                                to="/account"
                                className={clsx(
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                    {
                                        'bg-gray-900 text-white':
                                            location.pathname === '/account',
                                        'text-gray-300 hover:bg-gray-700 hover:text-white':
                                            location.pathname !== '/account',
                                    }
                                )}
                            >
                                Profile
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={clsx(
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                        {
                                            'bg-gray-900 text-white':
                                                location.pathname === '/login',
                                            'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                location.pathname !== '/login',
                                        }
                                    )}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className={clsx(
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                        {
                                            'bg-gray-900 text-white':
                                                location.pathname === '/signup',
                                            'text-gray-300 hover:bg-gray-700 hover:text-white':
                                                location.pathname !== '/signup',
                                        }
                                    )}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
