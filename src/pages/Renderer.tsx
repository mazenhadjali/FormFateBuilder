import React, { useState } from 'react';
import { deserializeWithFunctions } from '../utils/serialazation';
import ErrorBoundary from '../components/ErrorBoundary';
import FormFateFactory from '../components/formFactory';

function Renderer() {

    const [schema, setSchema] = useState("");
    const [parsedSchema, setParsedSchema] = useState<Record<string, unknown> | null>(null);
    const [schemaError, setSchemaError] = useState<string>("");

    const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSchema(value);
        try {
            const parsed = deserializeWithFunctions(value);
            setParsedSchema(parsed);
            setSchemaError(""); // clear error if successful
        } catch (error: unknown) {
            setParsedSchema(null);
            setSchemaError(error?.message ? error?.message.toString() : "Invalid schema format. Please check your JSON Schema.");
        }
    };

    return (
        <React.Fragment>
            <div className="container mx-auto bg-gradient-to-br from-green-100 to-pink-50 py-3 px-1">
                <div className="rounded-2xl shadow-xl p-6 bg-white/20 backdrop-blur-md border border-amber-400 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Renderer Component</h1>
                    <p className="mt-4 text-gray-600">This is a placeholder for the Renderer component.</p>
                </div>
                <div className="flex justify-center items-center p-3 mt-4 rounded-xl shadow-md my-2 border border-amber-300 bg-white/60 backdrop-blur-md">
                    <textarea
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Paste your Stringified JSON Schema here..."
                        rows={10}
                        value={schema}
                        onChange={handleSchemaChange}
                    ></textarea>
                </div>
                {schemaError && (
                    <div className="my-2 p-3 bg-red-100 text-red-700 rounded">
                        ⚠️ <strong>Schema Error:</strong> {schemaError}
                    </div>
                )}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl shadow-lg p-2 bg-white/60 backdrop-blur-md border border-amber-300">
                        <h2 className="text-2xl font-semibold text-gray-800 my-1">Form Preview</h2>
                        <p className="text-gray-700 text-base mt-1 mb-3">
                            Live preview of your form below.
                        </p>
                        <div className="border border-gray-300 rounded-xl py-4 px-2 bg-gray-50">
                            {parsedSchema && (
                                <ErrorBoundary fallback={
                                    <div className="p-3 bg-red-100 text-red-700 rounded">
                                        <strong>⚠️ Error rendering form:</strong> Please check your schema.
                                    </div>
                                }>
                                    <FormFateFactory formDefinition={parsedSchema} key={"FormFate" + Date.now()} />
                                </ErrorBoundary>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Renderer;
