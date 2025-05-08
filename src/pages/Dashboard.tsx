import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuthStore from '../stores/userStore';
import { ModalProvider } from '../modal/Provider.modal';

function Dashboard() {
    const { fetchUser } = useAuthStore();

    // Fetch user data on component mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <React.Fragment>
            <ModalProvider>
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
            </ModalProvider>
        </React.Fragment>
    );
}

export default Dashboard;
