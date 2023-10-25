import React from "react";

function ShortCookbookList(props) {
  return (
    <ul>
      {props.cookbookList.map((cookbook) => (
        <li key={cookbook.id}>{cookbook.name}</li>
      ))}
    </ul>
  );
}

export default ShortCookbookList;