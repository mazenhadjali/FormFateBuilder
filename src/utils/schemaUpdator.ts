import { FormDefinition } from "formfatecore";

function recursiveUpdate(properties: FormDefinition["properties"], identifier: string, newObjects: FormDefinition["properties"]) {
    for (let prop in properties) {
        if (prop === identifier && properties[prop].type === 'block') {
            // We found the parent block; now merge its properties
            const a = {
                ...properties[prop].properties,
                ...newObjects,
            }
            properties[prop].properties = a

            return true;
        } else if (properties[prop].type === 'block' && properties[prop].properties) {
            // Recurse into nested block
            const updated = recursiveUpdate(properties[prop].properties, identifier, newObjects);
            if (updated) return true;
        }
    }
    return false;
}


export function updateSchema(schema: FormDefinition, identifierType: string, identifier: string, newObjects: FormDefinition["properties"]) {
    if (identifierType === 'root') {
        // If the identifier is empty or 'root', merge newObjects directly into the root properties
        schema.properties = {
            ...schema.properties,
            ...newObjects,
        };
        return schema;
    } else
        if (schema.properties) {
            const updated = recursiveUpdate(schema.properties, identifier, newObjects);
            if (!updated) {
                console.warn(`Block "${identifier}" not found in schema.`);
            }
        }

    return schema;
}


function recursiveDelete(properties: FormDefinition["properties"], identifier: string): boolean {
    if (!properties) return false;

    if (properties.hasOwnProperty(identifier)) {
        delete properties[identifier];
        return true;
    }

    for (let prop in properties) {
        if (properties[prop].type === 'block' && properties[prop].properties) {
            const deleted = recursiveDelete(properties[prop].properties, identifier);
            if (deleted) return true;
        }
    }

    return false;
}

export function deleteProperty(schema: FormDefinition, identifier: string): FormDefinition {
    if (schema.properties) {
        const deleted = recursiveDelete(schema.properties, identifier);
        if (!deleted) {
            console.warn(`Property "${identifier}" not found in schema.`);
        }
    }
    return schema;
}


function recursiveGet(properties: FormDefinition["properties"], identifier: string, isBlock: boolean): FormDefinition["properties"][string] | undefined {
    if (!properties) return undefined;

    for (const key of Object.keys(properties)) {
        const field = properties[key];

        // Found a direct match?
        if (key === identifier) {
            // Only return if the `block`-ness matches what was requested
            if (isBlock ? field.type === 'block' : field.type !== 'block') {
                return field;
            }
        }

        // Otherwise, if this is a block, recurse into it
        if (field.type === 'block' && field.properties) {
            const found = recursiveGet(field.properties, identifier, isBlock);
            if (found) return found;
        }
    }

    return undefined;
}


export function getField(schema: FormDefinition, identifier: string, isBlock: boolean): FormDefinition["properties"][string] | undefined {
    return recursiveGet(schema.properties, identifier, isBlock);
}

function recursiveFieldUpdate(
    properties: FormDefinition["properties"],
    identifier: string,
    newObject: FormDefinition["properties"][string]
): boolean {
    if (!properties) return false;

    for (const key of Object.keys(properties)) {
        const field = properties[key];

        if (key === identifier) {
            // Update the field directly
            properties[key] = {
                ...field,
                ...newObject,
            };
            return true;
        }

        if (field.type === 'block' && field.properties) {
            const updated = recursiveFieldUpdate(field.properties, identifier, newObject);
            if (updated) return true;
        }
    }

    return false;
}

export function updateField(
    schema: FormDefinition,
    identifier: string,
    newObject: FormDefinition["properties"][string]
): FormDefinition {
    if (schema.properties) {
        const updated = recursiveFieldUpdate(schema.properties, identifier, newObject);
        if (!updated) {
            console.warn(`Field "${identifier}" not found in schema.`);
        }
    }
    return schema;
}
