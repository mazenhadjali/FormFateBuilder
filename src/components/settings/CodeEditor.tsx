// CodeEditor.tsx
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps {
    initialValue: string;
    onSave: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onSave }) => {
    const [code, setCode] = useState(initialValue);

    // Custom formatter function
    const customFormat = (code: string) => {
        // A simple formatter for better readability
        try {
            // Remove extra whitespace, add basic indentations and handle newlines
            console.log('Formatting code:', code); // Debugging line
            return code
                .replace(/( )+/g, ' ') // Collapsing extra spaces
                .replace(/\s*({|}|,|\(|\))/g, '$1') // Removing extra spaces around braces, commas, and parentheses
                .replace(/;/g, ';\n') // Ensuring that semicolons are followed by a new line
                .replace(/(?<=\{)(.*?)(?=\})/gs, (match) => `\n  ${match.trim().replace(/\n/g, '\n  ')}\n`) // Adding indentation inside curly braces
                .trim(); // Trimming the final result
        } catch (error) {
            console.error('Formatting error:', error);
            throw new Error('Failed to format code: ' + error.message);
        }
    };

    const handleFormat = () => {
        const formatted = customFormat(code);
        setCode(formatted);
    };

    const handleSave = () => {
        onSave(code); // Pass the formatted code to the parent component
    };

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <CodeMirror
                value={code}
                height="200px"
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setCode(value)}
                basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: true,
                    autocompletion: true,
                }}
            />
            <div className="mt-2 flex justify-between">
                <button
                    onClick={handleFormat}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                    Format Code
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Save Code
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;
