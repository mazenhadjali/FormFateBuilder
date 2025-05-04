import React, { useState } from 'react'
import { FormFate } from 'react-form-fate';
import { deserializeWithFunctions, stringifyWithFunctions } from './utils/serialazation';

type Props = {}

function Renderer({ }: Props) {

    const [schema, setSchema] = useState("");
    const [schemaError, setSchemaError] = useState(false);
    const [schemaErrorMessage, setSchemaErrorMessage] = useState("");
    const validateSchema = schema && schema !== "" ? deserializeWithFunctions(schema) : null;
    console.log("validateSchema", validateSchema);

    return (
        <React.Fragment>
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-pink-50 py-10 px-4">
                <div className="container mx-auto p-4">
                    <div className="rounded-2xl shadow-xl p-6 bg-white/20 backdrop-blur-md border border-amber-400 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">Renderer Component</h1>
                        <p className="mt-4 text-gray-600">This is a placeholder for the Renderer component.</p>
                    </div>
                    <div className="flex justify-center items-center bg-gray-100 p-2 mt-4 rounded-lg shadow-md">
                        {/* teaxt area for stringifyed json schema */}
                        <textarea
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm"
                            placeholder="Stringified JSON Schema"
                            rows={10}
                            value={schema}
                            onChange={(e) => setSchema(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl shadow-lg p-2 bg-white/60 backdrop-blur-md border border-amber-300">
                            <h2 className="text-2xl font-semibold text-gray-800 my-1">Form Preview</h2>
                            <p className="text-gray-700 text-base mt-1 mb-3">
                                Live preview of your form below.
                            </p>
                            <div className="border border-gray-300 rounded-xl py-4 px-2 bg-gray-50">
                                {schema && schema !== "" && (
                                    <FormFate formDefinition={validateSchema} key={"FormFate" + Date.now()} />
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Renderer