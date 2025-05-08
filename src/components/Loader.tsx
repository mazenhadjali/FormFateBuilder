import React from 'react';
import { FaSpinner } from 'react-icons/fa';

type LoaderProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
};

const sizeClasses = {
    sm: 'text-sm',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
};

const Loader: React.FC<LoaderProps> = ({ size = 'md', className = 'mx-auto text-center' }) => {
    return (
        <FaSpinner
            // apply both the spin and the colorcycle animations
            style={{
                animation: 'spin 1s linear infinite, colorcycle 3s linear infinite',
            }}
            className={`${sizeClasses[size]} ${className}`}
        />
    );
};

export default Loader;
