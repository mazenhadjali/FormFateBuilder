import { FormFate } from "react-form-fate";
import useStore from "./store";

function App() {
  const { formSchema, addField } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-pink-50 py-10 px-4">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <img
          src="/Logo-Proxym-2020-02.png"
          alt="Proxym"
          className="h-20 object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-4">
        Form Fate Builder
      </h1>

      {/* Intro Card */}
      <div className="container mx-auto max-w-4xl mb-8">
        <div className="rounded-2xl shadow-xl p-6 bg-white/60 backdrop-blur-md border border-amber-400">
          <p className="text-gray-800 text-lg mb-2">
            Welcome to the Form Fate Builder for Proxym.
          </p>
          <p className="text-gray-700 text-base">
            Create, customize, and preview your forms easily to integrate into your applications.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="rounded-2xl shadow-lg p-6 bg-white/70 backdrop-blur-md border border-amber-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Form Configuration</h2>
          <p className="text-gray-700 text-base mb-2">
            Add, edit, and delete fields to customize your form.
          </p>
          {/* You can place addField button or configuration controls here */}
        </div>

        {/* Form Preview */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl shadow-lg p-6 bg-white/80 backdrop-blur-md border border-amber-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Form Preview</h2>
            <p className="text-gray-700 text-base mb-4">
              Live preview of your form below.
            </p>
            <div className="border border-gray-300 rounded-xl p-6 bg-gray-50">
              <FormFate
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
  );
}

export default App;