import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Dashboard() {
    return (
        <React.Fragment>
            {/* navbar and main that contaons the Outlet */}
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
    )
}

export default Dashboard