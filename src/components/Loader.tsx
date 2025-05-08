import { FaSpinner } from 'react-icons/fa';

interface LoaderProps {
    size?: string; // Tailwind size classes like 'text-2xl', 'text-4xl', etc.
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'text-4xl', className = '' }) => {
    return (
        <FaSpinner
            style={{
                animation: 'spin 1s linear infinite, colorcycle 3s linear infinite',
            }}
            className={`${size} mx-auto ${className}`}
        />
    );
};

export default Loader;
