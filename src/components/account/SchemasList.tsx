import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { FaEye } from "react-icons/fa6";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router";

type Schema = {
    _id: string;
    title: string;
    description?: string;
};

function SchemasList() {
    const navigate = useNavigate();
    const [schemas, setSchemas] = useState<Schema[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchemas = async () => {
        try {
            const response = await api.get("/schemas");
            setSchemas(response.data);
        } catch (err) {
            console.error("Error fetching schemas:", err);
            setError("Failed to load schemas");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this schema?")) return;
        try {
            await api.delete(`/schemas/${id}`);
            setSchemas(schemas.filter(schema => schema._id !== id));
        } catch (err) {
            console.error("Error deleting schema:", err);
            alert("Failed to delete schema");
        }
    };

    useEffect(() => {
        fetchSchemas();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
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
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Schemas</h2>
            {schemas.length === 0 ? (
                <p className="text-gray-500 text-center">No schemas found.</p>
            ) : (
                <ul className="space-y-4">
                    {schemas.map((schema) => (
                        <li
                            key={schema._id}
                            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{schema.title}</h3>
                                {schema.description && (
                                    <p className="text-sm text-gray-500">{schema.description}</p>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                                    onClick={() => {
                                        //  navigate to the builder with the search parameter schema._id
                                        navigate(`/renderer/?schemaId=${schema._id}`);
                                    }}
                                >
                                    <FaEye className="w-4 h-4 mr-1" /> View
                                </button>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                                    onClick={() => {
                                        //  navigate to the builder with the search parameter schema._id
                                        navigate(`/?schemaId=${schema._id}`);

                                    }}
                                >
                                    <BiPencil className="w-4 h-4 mr-1" /> Edit
                                </button>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                    onClick={() => handleDelete(schema._id)}
                                >
                                    <BiTrash className="w-4 h-4 mr-1" /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SchemasList;
