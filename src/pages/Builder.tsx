import React from "react";
import Layout from "../Layout";
import { ModalProvider } from "../modal/Provider.modal";


function Builder() {

  return (
    <React.Fragment>
      <ModalProvider>
        <Layout />
      </ModalProvider>
    </React.Fragment>
  );
}

export default Builder;