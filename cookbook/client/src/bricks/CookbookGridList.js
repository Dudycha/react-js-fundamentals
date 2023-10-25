import React from "react";
import Cookbook from "./Cookbook";

function CookbookGridList(props) {
  return props.cookbookList.map((cookbook) => {
    return <Cookbook key={cookbook.id} cookbook={cookbook} />;
  });
} 

export default CookbookGridList;