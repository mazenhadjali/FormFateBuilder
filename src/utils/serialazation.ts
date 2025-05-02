/* eslint-disable @typescript-eslint/no-explicit-any */
export function deserializeWithFunctions(str: string): any {
    const obj = eval('(' + str + ')');

    function reviveFunctions(o: any): any {
        if (typeof o !== 'object' || o === null) return o;

        for (const key in o) {
            if (typeof o[key] === 'string' && /^function\s*\(|^\(\s*.*?\s*\)\s*=>/.test(o[key])) {
                try {
                    o[key] = eval('(' + o[key] + ')');
                } catch (e) {
                    console.warn(`Failed to parse function at key "${key}":`, e);
                }
            } else if (typeof o[key] === 'object') {
                reviveFunctions(o[key]);
            }
        }

        return o;
    }

    return reviveFunctions(obj);
}


export function stringifyWithFunctions(obj: any): string {
    const jsonWithFunctions = JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    }, 2);

    const jsFormatted = jsonWithFunctions
        .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
        .replace(/"(function[\\s\\S]*?}|\\(.*?\\)\\s*=>\\s*{[\\s\\S]*?})"/g, (_, fn) =>
            fn.replace(/\\"/g, '"').replace(/\\n/g, '\n')
        ) // unquote and clean functions
        .replace(/\\n/g, '\n') // turn \n into real newlines
        .replace(/\\"/g, '"'); // unescape double quotes

    // return js_beautify(jsFormatted, { indent_size: 2 });
    return jsFormatted; // Return the formatted string directly
}