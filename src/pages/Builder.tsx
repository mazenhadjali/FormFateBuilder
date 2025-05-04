import React from "react";
import { ModalProvider } from "../modal/Provider.modal";
import useStore from "../store";
import { FormFate } from "react-form-fate";
import CreateFieldButton from "../components/CreateFieldButton";
import FieldsUIMapper from "../components/FieldsUIMapper";
import SchemaPreviewButton from "../components/SchemaPreviewButton";

function Builder() {

  const { formSchema } = useStore();

  return (
    <React.Fragment>
      <ModalProvider>
        <div className="bg-gradient-to-br from-green-100 to-pink-50 py-3 px-1">

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center text-orange-500 mb-4">
            Form Fate Builder Tool
          </h1>

          {/* Intro Card */}
          <div className="container mx-auto mb-8">
            <div className="rounded-2xl shadow-xl p-6 bg-white/20 backdrop-blur-md border border-amber-400 text-center">
              <p className="text-gray-800 text-lg mb-2">
                Welcome to the Form Fate Builder Tool.
              </p>
              <p className="text-gray-700 text-base">
                Create, customize, and preview your forms easily to integrate into your applications.
              </p>
              <p className="text-gray-700 text-base ">
                <span className="font-semibold">Note:</span> This is a demo version. The final version will be available soon.
              </p>
              <div className="mt-2 text-gray-700 text-base">
                <span>To Start and use the Json Schema , install the </span>
                <a href="https://www.npmjs.com/package/react-form-fate" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  react-form-fate
                </a>
                <span> package.</span>
              </div>
            </div>
          </div>
          {/* Main Section */}
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="rounded-2xl shadow-lg p-3 bg-white/70 backdrop-blur-md border border-amber-300">
              <div className="flex justify-between items-center my-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Form Configuration</h2>
                <SchemaPreviewButton />

              </div>
              <p className="text-gray-700 text-base mb-2">
                Add, edit, and delete fields to customize your form.
              </p>
              {/* You can place addField button or configuration controls here */}

              <FieldsUIMapper schema={formSchema} />

              <CreateFieldButton blockIdentifierType="root" />

            </div>

            {/* Form Preview */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl shadow-lg p-2 bg-white/60 backdrop-blur-md border border-amber-300">
                <h2 className="text-2xl font-semibold text-gray-800 my-1">Form Preview</h2>
                <p className="text-gray-700 text-base mt-1 mb-3">
                  Live preview of your form below.
                </p>
                <div className="border border-gray-300 rounded-xl py-4 px-2 bg-gray-50">
                  <FormFate
                    key={'form' + Date.now()}
                    formDefinition={formSchema}
                    onSubmit={(formData) => {
                      console.log(formData);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalProvider>
    </React.Fragment>
  );
}

export default Builder; 