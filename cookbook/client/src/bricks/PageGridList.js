import React from "react";
import Page from "./Page";

function PageGridList(props) {
  return props.pageList.map((page) => {
    return <Page key={page.id} page={page} />;
  });
}

export default PageGridList;