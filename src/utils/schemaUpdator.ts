import { FormDefinition } from "formfatecore";

function recursiveUpdate(properties: FormDefinition["properties"], identifier: string, newObjects: FormDefinition["properties"]) {
    console.log("newObjects", newObjects);
    for (let prop in properties) {
        if (prop === identifier && properties[prop].type === 'block') {
            // We found the parent block; now merge its properties
            const a = {
                ...properties[prop].properties,
                ...newObjects,
            }
            properties[prop].properties = a

            console.log("properties[prop]", properties[prop]);
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
