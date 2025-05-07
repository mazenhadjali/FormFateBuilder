import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SchemasList from "../../components/account/SchemasList";
import useAuthStore from "../../userStore";
import Loader from "../../components/Loader";

function Profile() {
    const { user, loading, error, clearUser } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1️⃣ Clear auth state
        clearUser();
        // 2️⃣ Remove token
        localStorage.removeItem("token");
        // 3️⃣ Redirect to login
        navigate("/login");
    };

    if (loading || !user || error) {
        return (
            <Loader />
        );
    }

    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 text-blue-500 p-4 rounded-full mb-4">
                        <BiUserCircle className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {user.username}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                    <button
                        onClick={handleLogout}
                        className="mt-4 px-5 py-2 bg-transparent border-2 border-red-400 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <SchemasList />
        </>
    );
}

export default Profile;
