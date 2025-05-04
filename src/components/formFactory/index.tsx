import React from 'react'
import { FormFate, FormFateProps } from 'react-form-fate';
import { components } from './components';


function FormFateFactory({ formDefinition, onSubmit }: FormFateProps) {


    return (
        <React.Fragment>
            <FormFate
                components={components}
                formDefinition={formDefinition}
                onSubmit={onSubmit}
            />
        </React.Fragment>
    )
}

export default FormFateFactory;