import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <FaSpinner
                // apply both the spin and the colorcycle animations
                style={{
                    animation: 'spin 1s linear infinite, colorcycle 3s linear infinite'
                }}
                className="text-4xl mb-2"
            />
        </div>
    );
};

export default Loader;
