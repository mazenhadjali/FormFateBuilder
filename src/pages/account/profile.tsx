import React, { useState, useRef, useEffect } from "react";
import { BiUserCircle, BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SchemasList from "../../components/account/SchemasList";
import useAuthStore from "../../stores/userStore";
import Loader from "../../components/Loader";

function Profile() {
    const { user, loading, error, clearUser } = useAuthStore();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        clearUser();
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading || !user || error) {
        return <Loader />;
    }

    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6 relative">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 text-blue-500 p-4 rounded-full mb-4">
                        <BiUserCircle className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {user.username}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                </div>

                {/* Dropdown menu */}
                <div className="absolute top-4 right-4" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                        <BiDotsVerticalRounded className="w-6 h-6 text-gray-600" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 p-0.5 w-40 bg-white border rounded-xl shadow-lg z-10">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50  rounded-xl"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <SchemasList />
        </>
    );
}

export default Profile;
