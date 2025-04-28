import { FormFate } from "react-form-fate";
import useStore from "./store";

function App() {

  const { formSchema, addField } = useStore();


  return (
    <>
      <div className="text-center mx-auto mt-5">
        <div>
          {/* image /Logo-Proxym-2020-02.png */}
          <img src="/Logo-Proxym-2020-02.png" alt="Proxym" className="mx-auto mb-2 max-w-[200px]" />
        </div>
        <p className="font-bold text-xl p-1 text-orange-500">
          Form Fate Builder
        </p>
        <div className="container mx-auto border border-amber-600 rounded-lg shadow-lg p-4 mt-2 h-full bg-gradient-to-r from-green-100 to-pink-50">
          <p className="text-gray-800 text-lg">
            This is a simple form fate builder for Proxym.
          </p>
          <p className="text-gray-800 text-lg">
            You can create your own form and use it in your application.
          </p>
        </div>
        <div className="px-3">
          <div className="w-full border border-amber-600 rounded-lg shadow-lg p-4 mt-2 h-full bg-gradient-to-r from-blue-100 to-orange-200-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* first col */}
            <div className="col-span-1">
              <p className="text-gray-800 text-lg">
                This here is the configuration of the form.
              </p>
              <p className="text-gray-800 text-lg">
                You can add, edit and delete fields.
              </p>
            </div>
            {/* second col  merge 2 cols in case of lg */}
            <div className="col-span-1 lg:col-span-2">
              <p className="text-gray-800 text-lg">
                This is the form preview.
              </p>
              <p className="text-gray-800 text-lg">
                You can see how the form will look like.
              </p>
              <div className="p-2 mt-2">
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
    </>
  )
}

export default App