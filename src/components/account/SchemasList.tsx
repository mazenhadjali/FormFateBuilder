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

    if (loading || error) {
        return (
            <div className="mx-auto mt-8 p-4 sm:p-6 bg-transparent">
                <Loader size="text-4xl" className="mx-auto" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">My Process Schemas</h2>
            {schemas.length === 0 ? (
                <p className="text-gray-500 text-center">No process schemas found.</p>
            ) : (
                <ul className="space-y-4">
                    {schemas.map((schema) => (
                        <li
                            key={schema._id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border"
                        >
                            <div className="flex items-center justify-start sm:mb-0 gap-2">
                                <img
                                    src="/icon.png"
                                    alt="Logo"
                                    className="object-contain mb-2 max-h-9 max-sm:hidden"
                                />
                                <div className="mb-4 sm:mb-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400">Title:</span>
                                        <span className="text-base sm:text-lg font-semibold text-gray-800">{schema.title}</span>
                                    </div>
                                    {schema.key && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-400">Key:</span>
                                            <span className="text-gray-700 font-medium">{schema.key}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:justify-center sm:justify-end">
                                <button
                                    className="inline-flex items-center px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-blue-100 text-blue-600 text-sm rounded hover:bg-blue-200 transition font-semibold"
                                    onClick={() => navigate(`/renderer/?schemaId=${schema._id}`)}
                                >
                                    <FaEye className="w-4 h-4 mr-1" /> View
                                </button>
                                <button
                                    className="inline-flex items-center px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-green-100 text-green-600 text-sm rounded hover:bg-green-200 transition font-semibold"
                                    onClick={() => navigate(`/?schemaId=${schema._id}`)}
                                >
                                    <BiPencil className="w-4 h-4 mr-1" /> Edit Schema
                                </button>
                                <button
                                    className="inline-flex items-center px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-green-200 text-green-700 text-sm rounded hover:bg-green-300 transition font-semibold"
                                    onClick={() =>
                                        pushModal({
                                            type: "edit-process",
                                            params: {
                                                schemaId: schema._id,
                                                title: schema.title,
                                                key: schema.key,
                                                description: schema.description,
                                            },
                                        })
                                    }
                                >
                                    <BiPencil className="w-4 h-4 mr-1" /> Edit Process info
                                </button>
                                <button
                                    className="inline-flex items-center px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition font-semibold"
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
