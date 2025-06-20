/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Serializes an object, converting functions to string form.
 */
export function stringifyWithFunctions(obj: any, space: number = 0): string {
    return JSON.stringify(obj, function replacer(key, value) {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    }, space);
}

/**
 * Deserializes an object string, reviving functions inside deeply nested objects and arrays.
 */
export function deserializeWithFunctions(str: string): any {
    const obj = JSON.parse(str);

    function reviveFunctions(value: any): any {
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (/^function\s*\(|^function\s+anonymous|^\(\s*.*?\s*\)\s*=>|^\w+\s*=>/.test(trimmed)) {
                try {
                    return eval(`(${trimmed})`);
                } catch (e) {
                    console.warn(`Failed to parse function string:`, e);
                    return value;
                }
            }
        } else if (Array.isArray(value)) {
            return value.map(item => reviveFunctions(item));
        } else if (typeof value === 'object' && value !== null) {
            for (const key in value) {
                if (Object.hasOwn(value, key)) {
                    value[key] = reviveFunctions(value[key]);
                }
            }
        }
        return value;
    }

    return reviveFunctions(obj);
}
