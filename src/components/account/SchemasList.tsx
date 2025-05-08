import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router";
import Loader from "../Loader";
import { useModal } from "../../modal/context";
import { useSchemasStore } from "../../stores/schemasStore";

function SchemasList() {
    const navigate = useNavigate();
    const { pushModal } = useModal();
    const { schemas, loading, error, fetchSchemas, deleteSchema } = useSchemasStore();

    useEffect(() => {
        fetchSchemas();
    }, [fetchSchemas]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center mt-10">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Process Schemas</h2>
            {schemas.length === 0 ? (
                <p className="text-gray-500 text-center">No process schemas found.</p>
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
                                    onClick={() => navigate(`/renderer/?schemaId=${schema._id}`)}
                                >
                                    <FaEye className="w-4 h-4 mr-1" /> View
                                </button>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                                    onClick={() => navigate(`/?schemaId=${schema._id}`)}
                                >
                                    <BiPencil className="w-4 h-4 mr-1" /> Edit Schema
                                </button>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-green-200 text-green-700 rounded hover:bg-green-300 transition"
                                    onClick={() =>
                                        pushModal({
                                            type: "edit-process",
                                            params: {
                                                schemaId: schema._id,
                                                title: schema.title,
                                                description: schema.description,
                                            },
                                        })
                                    }
                                >
                                    <BiPencil className="w-4 h-4 mr-1" /> Edit Process info
                                </button>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this schema?")) {
                                            deleteSchema(schema._id);
                                        }
                                    }}
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
