import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuthStore from '../userStore';

function Dashboard() {
    const { fetchUser, loading, error } = useAuthStore();

    // Fetch user data on component mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-8">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-pink-50">
                <Navbar />
                {/* Logo Section */}
                <div className="flex justify-center my-4">
                    <img
                        src="/Logo-Proxym-2020-02.png"
                        alt="Proxym"
                        className="h-20 object-contain"
                    />
                </div>
                <Outlet />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
