import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

type Props = {}

function Dashboard({ }: Props) {
    return (
        <React.Fragment>
            {/* navbar and main that contaons the Outlet */}
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-pink-50">
                <Navbar />
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Dashboard