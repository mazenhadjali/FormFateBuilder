import React from "react";
import Layout from "./Layout";
import { ModalProvider } from "./modal/context";


function App() {

  return (
    <React.Fragment>
      <ModalProvider>
        <Layout />
      </ModalProvider>
    </React.Fragment>
  );
}

export default App;