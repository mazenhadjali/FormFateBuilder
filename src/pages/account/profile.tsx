import React from "react";
import { BiUserCircle } from "react-icons/bi";
import SchemasList from "../../components/account/SchemasList";
import useAuthStore from "../../userStore";

function Profile() {
    const { user, loading, error } = useAuthStore();

    if (loading || !user || error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <React.Fragment>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 text-blue-500 p-4 rounded-full mb-4">
                        <BiUserCircle className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.username}</h2>
                    <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                </div>
            </div>
            <SchemasList />
        </React.Fragment>
    );
}

export default Profile;
