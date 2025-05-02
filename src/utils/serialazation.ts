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
