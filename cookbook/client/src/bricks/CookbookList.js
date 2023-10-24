import React from "react";
import Page from "./Page";

class CookbookList extends React.Component {
  render() {
    function getStudentList(cookbookList) {
      return cookbookList.map((page) => {
        return <Page key={page.id} page={page} />;
      });
    }

    return getStudentList(this.props.cookbookList);
  }
}

export default CookbookList;
